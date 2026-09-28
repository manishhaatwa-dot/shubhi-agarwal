/* =========================================================
   SHUBHI AGARWAL — SCRIPT
   Mobile Menu + Scroll Animations + Current Year
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= MOBILE MENU ================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("active");

            const isOpen = mainNav.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.textContent = isOpen ? "?" : "?";
        });


        /* Close menu after clicking a link */

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.textContent = "?";
            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                mainNav.contains(event.target);

            const clickedButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedButton &&
                mainNav.classList.contains("active")
            ) {

                mainNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "?";
            }

        });

    }


    /* ================= SCROLL REVEAL ================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-content, " +
        ".profile-card, " +
        ".role-card, " +
        ".experience-item, " +
        ".skill-card, " +
        ".education-card, " +
        ".certification-card, " +
        ".award-item, " +
        ".strength-item, " +
        ".language-card, " +
        ".social-card, " +
        ".contact-box"
    );


    /*
       Profile photo is intentionally NOT included
       in scroll reveal.

       Award photos ARE included so they animate
       when they enter the screen.
    */

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.14,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        /* Fallback for older browsers */

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* ================= STAGGER CARD ANIMATION ================= */

    const cardGroups = [
        ".skills-grid .skill-card",
        ".education-grid .education-card",
        ".certification-grid .certification-card",
        ".strengths-grid .strength-item"
    ];

    cardGroups.forEach(selector => {

        const cards = document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 0.07}s`;

        });

    });


    /* ================= CURRENT YEAR ================= */

    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );

    const currentYear = new Date().getFullYear();

    yearElements.forEach(element => {
        element.textContent = currentYear;
    });


    /* ================= ACTIVE NAV LINK ================= */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navigationLinks =
        document.querySelectorAll(
            '.main-nav a[href^="#"]'
        );


    if (
        sections.length &&
        navigationLinks.length &&
        "IntersectionObserver" in window
    ) {

        const navObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            const id =
                                entry.target.getAttribute("id");

                            navigationLinks.forEach(link => {

                                link.classList.remove("active");

                                if (
                                    link.getAttribute("href") ===
                                    `#${id}`
                                ) {
                                    link.classList.add("active");
                                }

                            });

                        }

                    });

                },
                {
                    threshold: 0.25,
                    rootMargin: "-80px 0px -50% 0px"
                }
            );


        sections.forEach(section => {
            navObserver.observe(section);
        });

    }


    /* ================= IMAGE LOAD EFFECT ================= */

    const awardImages =
        document.querySelectorAll(".award-image");

    awardImages.forEach(image => {

        image.addEventListener("load", () => {

            image.classList.add("loaded");

        });

    });


    /* ================= EXTERNAL LINKS ================= */

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http"]'
        );

    externalLinks.forEach(link => {

        if (
            link.hostname &&
            link.hostname !== window.location.hostname
        ) {

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });

});