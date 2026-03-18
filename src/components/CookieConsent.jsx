import React, { useEffect, useMemo, useState } from "react";
import {
  COOKIE_CATEGORIES,
  DEFAULT_CONSENT,
  createConsentPreset,
  saveConsent,
} from "../lib/cookieConsent";

function CategoryToggle({ category, checked, onChange }) {
  return (
    <div className="cookie-modal__category">
      <div className="cookie-modal__category-copy">
        <h3>{category.title}</h3>
        <p>{category.description}</p>
      </div>

      <label className="cookie-switch">
        <input
          type="checkbox"
          checked={checked}
          disabled={category.required}
          onChange={(event) => onChange(category.key, event.target.checked)}
        />
        <span className="cookie-switch__slider" aria-hidden="true" />
        <span className="cookie-switch__label">
          {category.required ? "Always on" : checked ? "On" : "Off"}
        </span>
      </label>
    </div>
  );
}

export default function CookieConsent({
  consentState,
  isModalOpen,
  onConsentSaved,
  onOpenModal,
  onCloseModal,
}) {
  // `draftConsent` is the temporary working copy used inside the settings
  // modal. We keep it separate from the saved state so users can toggle values
  // freely before deciding whether to save or close the dialog.
  const [draftConsent, setDraftConsent] = useState(DEFAULT_CONSENT);

  const activeConsent = useMemo(
    () => consentState?.consent || DEFAULT_CONSENT,
    [consentState]
  );

  useEffect(() => {
    // Whenever the saved consent changes, or whenever the modal opens again,
    // reset the draft back to the latest saved values. This prevents stale
    // unsaved toggles from carrying over between sessions.
    setDraftConsent(activeConsent);
  }, [activeConsent, isModalOpen]);

  // The banner is only meant for first-time visitors or users who have not yet
  // made a choice. Once we have a saved consent payload, settings are managed
  // from the footer button instead.
  const hasSavedChoice = Boolean(consentState);

  const handleToggle = (key, value) => {
    setDraftConsent((current) => ({
      ...current,
      // The UI may render a disabled toggle for necessary cookies, but we also
      // protect the value in state so it can never be turned off programmatically.
      [key]: key === "necessary" ? true : value,
    }));
  };

  const handleSave = (nextConsent) => {
    // Persist once here so every action button follows the same path:
    // accept all, reject optional, and save custom choices all end in the same
    // storage/update flow.
    const savedState = saveConsent(nextConsent);

    if (savedState) {
      // Tell the parent app about the new consent immediately so the banner can
      // disappear and the rest of the app can react without reloading the page.
      onConsentSaved(savedState);
    }

    // The modal should always close after a deliberate save action. Reopening
    // it later will repopulate the draft from the newly saved state.
    onCloseModal();
  };

  return (
    <>
      {!hasSavedChoice && (
        <aside
          className="cookie-banner"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="cookie-banner__copy">
            <span className="cookie-banner__eyebrow">Cookie choices</span>
            <h2>We use cookies to run the site.</h2>
            <p>
              You can accept optional cookies now or manage them any time from
              the footer.
            </p>
          </div>

          <div className="cookie-banner__actions">
            {/* Reject optional keeps only the necessary category enabled. */}
            <button
              type="button"
              className="cookie-button cookie-button--ghost"
              onClick={() => handleSave(createConsentPreset("essential"))}
            >
              Reject optional
            </button>
            <button
              type="button"
              className="cookie-button cookie-button--ghost"
              // Opening settings does not change consent. It simply lets users
              // choose category-by-category before saving.
              onClick={onOpenModal}
            >
              Manage cookies
            </button>
            <button
              type="button"
              className="cookie-button cookie-button--primary"
              onClick={() => handleSave(createConsentPreset("all"))}
            >
              Accept all
            </button>
          </div>
        </aside>
      )}

      {isModalOpen && (
        <div
          className="cookie-modal-overlay"
          role="presentation"
          // Clicking the dimmed backdrop behaves like closing a normal dialog:
          // it dismisses the modal but does not save or alter consent.
          onClick={onCloseModal}
        >
          <section
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            // Stop the overlay click handler from firing when the user clicks
            // inside the actual dialog content.
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cookie-modal__header">
              <div>
                <span className="cookie-modal__eyebrow">Cookie settings</span>
                <h2 id="cookie-modal-title">Choose cookies</h2>
                <p className="cookie-modal__intro">
                  Necessary cookies stay on. Everything else is up to you.
                </p>
              </div>

              <button
                type="button"
                className="cookie-modal__close"
                aria-label="Close cookie settings"
                onClick={onCloseModal}
              >
                x
              </button>
            </div>

            <div className="cookie-modal__categories">
              {/* Each row is driven from the shared category config so labels,
                  descriptions, and required/optional behavior stay in sync
                  with the persistence layer. */}
              {COOKIE_CATEGORIES.map((category) => (
                <CategoryToggle
                  key={category.key}
                  category={category}
                  checked={draftConsent[category.key]}
                  onChange={handleToggle}
                />
              ))}
            </div>

            <div className="cookie-modal__actions">
              <button
                type="button"
                className="cookie-button cookie-button--subtle"
                onClick={() => handleSave(createConsentPreset("essential"))}
              >
                Reject optional
              </button>
              <button
                type="button"
                className="cookie-button cookie-button--secondary"
                onClick={() => handleSave(draftConsent)}
              >
                Save choices
              </button>
              <button
                type="button"
                className="cookie-button cookie-button--primary"
                onClick={() => handleSave(createConsentPreset("all"))}
              >
                Accept all
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
