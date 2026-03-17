import React, { useEffect, useRef, useState } from "react";

const NewsLetter = () => {
    const [email, setEmail] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("");
    const [showStatus, setShowStatus] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!showStatus) return;

        // Auto-hide after 4 seconds
        timeoutRef.current = window.setTimeout(() => setShowStatus(false), 4000);
        return () => window.clearTimeout(timeoutRef.current);
    }, [showStatus]);

    const showAlert = (message, type) => {
        setStatusMessage(message);
        setStatusType(type);
        setShowStatus(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmed = email.trim();
        if (!trimmed) {
            showAlert("Please enter a valid email address.", "error");
            return;
        }

        showAlert(
            "Thanks! We'll notify you as soon as the newsletter is ready.",
            "success"
        );

        try {
            const stored = JSON.parse(localStorage.getItem("newsletterEmails") || "[]");
            localStorage.setItem(
                "newsletterEmails",
                JSON.stringify([...stored, trimmed])
            );
        } catch (err) {
            // localStorage might be unavailable in some environments; ignore.
        }

        setEmail("");
    };

    return (
        <>
            {showStatus && (
                <div
                    className={`newsletter-toast newsletter-toast--${statusType}`}
                    role="status"
                    aria-live="polite"
                >
                    <div className="newsletter-toast__message">{statusMessage}</div>
                    <button
                        type="button"
                        className="newsletter-toast__close"
                        aria-label="Dismiss notification"
                        onClick={() => setShowStatus(false)}
                    >
                        ×
                    </button>
                </div>
            )}

            <section className="newsletter">
                <form onSubmit={handleSubmit}>
                    <h3>Subscribe for latest updates</h3>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="enter your email"
                        className="swiper-slide swiper-slide box"
                    />

                    <input type="submit" value="subscribe" className="btn" />
                </form>
            </section>
        </>
    );
};

export default NewsLetter;
