import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import NewsLetter from "./components/NewsLetter";
// import Review from "./components/Reviews";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Services from "./components/Services";
import CookieConsent from "./components/CookieConsent";
import { getStoredConsent } from "./lib/cookieConsent";

// import { CartProvider } from "./components/CartContext ";

function App() {
  // `consentState` holds the last saved consent payload so the banner, footer,
  // and any future integrations can all work from one shared source of truth.
  const [consentState, setConsentState] = useState(null);

  // The settings dialog only opens when the user explicitly asks for it from
  // the banner or footer. We do not auto-open it on page refresh.
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  useEffect(() => {
    // On first app load, hydrate consent from storage so returning visitors do
    // not see the first-time banner again unless their saved choice is cleared.
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      setConsentState(storedConsent);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Services />
              <NewsLetter />
              <Projects />
              {/* <Review /> */}
              <Footer onOpenCookieSettings={() => setIsCookieModalOpen(true)} />
            </>
          }
        />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        {/* <Route path="/Reviews" element={<Review />} /> */}
        
      </Routes>

      <CookieConsent
        consentState={consentState}
        isModalOpen={isCookieModalOpen}
        // Saving inside the modal or banner updates parent state immediately so
        // the UI responds without needing a full page reload.
        onConsentSaved={setConsentState}
        onOpenModal={() => setIsCookieModalOpen(true)}
        onCloseModal={() => setIsCookieModalOpen(false)}
      />
    </div>
  );
}

export default App;
