/**
 * Jiancheng Chi Academic Homepage
 * Premium Visual Enhancement
 */

(function () {
  "use strict";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isMobile = window.matchMedia(
    "(max-width: 768px)"
  ).matches;


  /* =======================================================
     1. Mouse-follow spotlight
     ======================================================= */

  if (!isMobile && !reducedMotion) {

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;

    let currentX = targetX;
    let currentY = targetY;

    document.addEventListener(
      "pointermove",
      function (event) {
        targetX = event.clientX;
        targetY = event.clientY;
      },
      { passive: true }
    );

    function animateSpotlight() {

      currentX += (targetX - currentX) * 0.10;
      currentY += (targetY - currentY) * 0.10;

      document.documentElement.style.setProperty(
        "--mouse-x",
        currentX + "px"
      );

      document.documentElement.style.setProperty(
        "--mouse-y",
        currentY + "px"
      );

      requestAnimationFrame(animateSpotlight);
    }

    animateSpotlight();
  }


  /* =======================================================
     2. Masthead scroll state
     ======================================================= */

  const masthead = document.querySelector(".masthead");

  function updateMasthead() {

    if (!masthead) return;

    if (window.scrollY > 16) {
      masthead.classList.add("premium-scrolled");
    } else {
      masthead.classList.remove("premium-scrolled");
    }
  }

  updateMasthead();

  window.addEventListener(
    "scroll",
    updateMasthead,
    { passive: true }
  );


  /* =======================================================
     3. Scroll reveal
     ======================================================= */

  const content = document.querySelector(".page__content");

  if (content) {

    /*
     * Automatically enhance existing content.
     * No changes to Markdown structure are required.
     */

    const revealCandidates =
      content.querySelectorAll(
        "h1, h2, .paper-box, p, ul, ol"
      );

    revealCandidates.forEach(function (element) {

      /*
       * Avoid excessive animation on tiny/embedded elements.
       */

      if (
        element.closest(".paper-box") &&
        !element.classList.contains("paper-box")
      ) {
        return;
      }

      element.classList.add("premium-reveal");
    });


    /* Headings get underline reveal */

    content
      .querySelectorAll("h1, h2")
      .forEach(function (heading) {
        heading.classList.add("premium-heading");
      });


    if (
      "IntersectionObserver" in window &&
      !reducedMotion
    ) {

      const observer =
        new IntersectionObserver(
          function (entries, observerInstance) {

            entries.forEach(function (entry) {

              if (entry.isIntersecting) {

                entry.target.classList.add(
                  "premium-visible"
                );

                observerInstance.unobserve(
                  entry.target
                );
              }

            });

          },
          {
            root: null,
            threshold: 0.08,
            rootMargin: "0px 0px -35px 0px"
          }
        );

      document
        .querySelectorAll(
          ".premium-reveal, .premium-heading"
        )
        .forEach(function (element) {
          observer.observe(element);
        });

    } else {

      document
        .querySelectorAll(
          ".premium-reveal, .premium-heading"
        )
        .forEach(function (element) {
          element.classList.add(
            "premium-visible"
          );
        });

    }

  }


  /* =======================================================
     4. Subtle avatar movement
     ======================================================= */

  if (!isMobile && !reducedMotion) {

    const avatar =
      document.querySelector(".author__avatar");

    if (avatar) {

      const avatarImage =
        avatar.querySelector("img");

      avatar.addEventListener(
        "pointermove",
        function (event) {

          if (!avatarImage) return;

          const rect =
            avatar.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) /
            rect.width - 0.5;

          const y =
            (event.clientY - rect.top) /
            rect.height - 0.5;

          avatarImage.style.transform =
            "perspective(700px) " +
            "rotateX(" + (-y * 2.2) + "deg) " +
            "rotateY(" + (x * 2.2) + "deg) " +
            "translateY(-2px) " +
            "scale(1.015)";
        }
      );

      avatar.addEventListener(
        "pointerleave",
        function () {

          if (!avatarImage) return;

          avatarImage.style.transform = "";
        }
      );

    }
  }


  /* =======================================================
     5. External links
     ======================================================= */

  document
    .querySelectorAll(
      ".page__content a[href^='http']"
    )
    .forEach(function (link) {

      link.addEventListener(
        "mouseenter",
        function () {
          link.style.opacity = "0.82";
        }
      );

      link.addEventListener(
        "mouseleave",
        function () {
          link.style.opacity = "";
        }
      );

    });


  /* =======================================================
     6. Loaded state
     ======================================================= */

  window.addEventListener(
    "load",
    function () {
      document.body.classList.add(
        "premium-loaded"
      );
    }
  );

})();
