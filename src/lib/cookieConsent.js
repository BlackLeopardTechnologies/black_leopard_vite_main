// We persist consent in both localStorage and a first-party cookie:
// - localStorage is convenient for the React app to read quickly on load
// - the cookie gives us a browser-visible record that can also be inspected
//   outside the app if needed
export const COOKIE_CONSENT_STORAGE_KEY = "black_leopard_cookie_consent";
export const COOKIE_CONSENT_COOKIE_NAME = "bl_cookie_consent";

// Each category maps directly to a toggle in the settings modal.
// The `required` flag is used to keep necessary cookies permanently enabled.
export const COOKIE_CATEGORIES = [
  {
    key: "necessary",
    title: "Necessary",
    description: "Keeps the site secure and remembers your consent choice.",
    required: true,
  },
  {
    key: "preferences",
    title: "Preferences",
    description: "Remembers helpful site preferences.",
    required: false,
  },
  {
    key: "analytics",
    title: "Analytics",
    description: "Shows how visitors use the site.",
    required: false,
  },
  {
    key: "marketing",
    title: "Marketing",
    description: "Supports ads and campaign tracking.",
    required: false,
  },
];

export const DEFAULT_CONSENT = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

// Versioning gives us room to migrate consent format later without guessing
// what an older stored payload means.
const CONSENT_VERSION = 1;
const COOKIE_MAX_AGE_DAYS = 180;

function normalizeConsent(input = {}) {
  // Any persisted or incoming consent is normalized through the category list
  // so the shape always stays predictable. This also guarantees necessary
  // cookies can never be switched off by accident.
  return COOKIE_CATEGORIES.reduce((accumulator, category) => {
    accumulator[category.key] = category.required
      ? true
      : Boolean(input[category.key]);
    return accumulator;
  }, {});
}

function safeParse(value) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

function readConsentCookie() {
  if (typeof document === "undefined") {
    return null;
  }

  // Consent is stored as one JSON payload inside a single cookie rather than
  // scattering separate cookies per category. That keeps reads/writes simple.
  const cookiePair = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${COOKIE_CONSENT_COOKIE_NAME}=`));

  if (!cookiePair) {
    return null;
  }

  const cookieValue = cookiePair.substring(
    `${COOKIE_CONSENT_COOKIE_NAME}=`.length
  );

  try {
    return JSON.parse(decodeURIComponent(cookieValue));
  } catch (error) {
    return null;
  }
}

function writeConsentCookie(payload) {
  if (typeof document === "undefined") {
    return;
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + COOKIE_MAX_AGE_DAYS);

  const serialized = encodeURIComponent(JSON.stringify(payload));
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${serialized}; expires=${expiresAt.toUTCString()}; path=/; SameSite=Lax`;
}

function broadcastConsent(consent) {
  if (typeof window === "undefined") {
    return;
  }

  // Optional third-party scripts should listen for this event before loading.
  // Example: analytics code can wait until `detail.analytics === true`.
  window.dispatchEvent(
    new CustomEvent("cookie-consent-updated", {
      detail: consent,
    })
  );
}

export function getStoredConsent() {
  if (typeof window === "undefined") {
    return null;
  }

  // Prefer localStorage because it is the app's primary source of truth, but
  // fall back to the cookie so we can still recover consent if localStorage was
  // cleared separately.
  const localValue = safeParse(
    window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
  );
  const cookieValue = readConsentCookie();
  const storedValue = localValue || cookieValue;

  if (!storedValue?.consent) {
    return null;
  }

  return {
    version: storedValue.version || CONSENT_VERSION,
    consent: normalizeConsent(storedValue.consent),
    updatedAt: storedValue.updatedAt || null,
  };
}

export function saveConsent(consent) {
  if (typeof window === "undefined") {
    return null;
  }

  // Saving always produces a fully normalized payload so the UI, cookie, and
  // any future integrations all work from the exact same data shape.
  const normalizedConsent = normalizeConsent(consent);
  const payload = {
    version: CONSENT_VERSION,
    consent: normalizedConsent,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    COOKIE_CONSENT_STORAGE_KEY,
    JSON.stringify(payload)
  );
  writeConsentCookie(payload);
  broadcastConsent(normalizedConsent);

  return payload;
}

export function createConsentPreset(type) {
  // Presets keep the component code readable for the common "accept all" and
  // "reject optional" actions shown in the banner and modal.
  switch (type) {
    case "all":
      return {
        necessary: true,
        preferences: true,
        analytics: true,
        marketing: true,
      };
    case "essential":
    default:
      return { ...DEFAULT_CONSENT };
  }
}
