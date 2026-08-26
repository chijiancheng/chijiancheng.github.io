/**
 * Jiancheng Chi Academic Homepage
 * Premium Visual Enhancement
 *
 * Features:
 * - Mouse-follow spotlight
 * - Interactive particle background
 * - Particle connections
 * - Mouse particle interaction
 * - Sticky navigation enhancement
 * - Scroll reveal
 */

(function () {
  "use strict";


  /* =======================================================
     Environment
     ======================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  const isMobile =
    window.matchMedia(
      "(max-width: 768px)"
    ).matches;


  /* =======================================================
     1. Mouse-follow spotlight
     ======================================================= */

  if (!isMobile && !reducedMotion) {

    let targetX =
      window.innerWidth / 2;

    let targetY =
      window.innerHeight / 3;

    let currentX =
      targetX;

    let currentY =
      targetY;


    document.addEventListener(
      "pointermove",

      function (event) {

        targetX =
          event.clientX;

        targetY =
          event.clientY;

      },

      {
        passive: true
      }
    );


    function animateSpotlight() {

      currentX +=
        (targetX - currentX) *
        0.10;

      currentY +=
        (targetY - currentY) *
        0.10;


      document.documentElement
        .style
        .setProperty(
          "--mouse-x",
          currentX + "px"
        );


      document.documentElement
        .style
        .setProperty(
          "--mouse-y",
          currentY + "px"
        );


      requestAnimationFrame(
        animateSpotlight
      );

    }


    animateSpotlight();

  }


  /* =======================================================
     2. Interactive particle background
     ======================================================= */

  if (!isMobile && !reducedMotion) {

    const canvas =
      document.getElementById(
        "premium-particles"
      );


    if (canvas) {

      const ctx =
        canvas.getContext("2d");


      let width = 0;
      let height = 0;

      let dpr =
        Math.min(
          window.devicePixelRatio || 1,
          2
        );


      /*
       * Mouse position.
       */

      const mouse = {

        x: -1000,

        y: -1000,

        active: false

      };


      /*
       * Particle configuration.
       *
       * Keep values deliberately conservative.
       */

      const CONFIG = {

        density: 21000,

        minParticles: 28,

        maxParticles: 72,

        minRadius: 0.8,

        maxRadius: 1.8,

        speed: 0.15,

        connectionDistance: 115,

        mouseRadius: 150,

        mouseForce: 0.018

      };


      let particles = [];


      /* ---------------------------------------------------
         Resize canvas
         --------------------------------------------------- */

      function resizeCanvas() {

        width =
          window.innerWidth;

        height =
          window.innerHeight;


        dpr =
          Math.min(
            window.devicePixelRatio || 1,
            2
          );


        canvas.width =
          Math.floor(width * dpr);

        canvas.height =
          Math.floor(height * dpr);


        canvas.style.width =
          width + "px";

        canvas.style.height =
          height + "px";


        ctx.setTransform(
          dpr,
          0,
          0,
          dpr,
          0,
          0
        );


        createParticles();

      }


      /* ---------------------------------------------------
         Particle object
         --------------------------------------------------- */

      function createParticle() {

        const angle =
          Math.random() *
          Math.PI *
          2;


        const velocity =
          CONFIG.speed *
          (
            0.45 +
            Math.random() *
            0.75
          );


        return {

          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          vx:
            Math.cos(angle) *
            velocity,

          vy:
            Math.sin(angle) *
            velocity,

          radius:
            CONFIG.minRadius +
            Math.random() *
            (
              CONFIG.maxRadius -
              CONFIG.minRadius
            ),

          alpha:
            0.25 +
            Math.random() *
            0.45

        };

      }


      /* ---------------------------------------------------
         Create particle field
         --------------------------------------------------- */

      function createParticles() {

        const calculatedCount =
          Math.floor(
            (
              width *
              height
            ) /
            CONFIG.density
          );


        const particleCount =
          Math.max(
            CONFIG.minParticles,

            Math.min(
              CONFIG.maxParticles,
              calculatedCount
            )
          );


        particles = [];


        for (
          let i = 0;
          i < particleCount;
          i++
        ) {

          particles.push(
            createParticle()
          );

        }

      }


      /* ---------------------------------------------------
         Mouse interaction
         --------------------------------------------------- */

      document.addEventListener(
        "pointermove",

        function (event) {

          mouse.x =
            event.clientX;

          mouse.y =
            event.clientY;

          mouse.active =
            true;

        },

        {
          passive: true
        }
      );


      document.addEventListener(
        "pointerleave",

        function () {

          mouse.active =
            false;

          mouse.x =
            -1000;

          mouse.y =
            -1000;

        }
      );


      /* ---------------------------------------------------
         Update particle movement
         --------------------------------------------------- */

      function updateParticle(
        particle
      ) {

        /*
         * Natural movement.
         */

        particle.x +=
          particle.vx;

        particle.y +=
          particle.vy;


        /*
         * Wrap around viewport edges.
         */

        if (
          particle.x <
          -10
        ) {

          particle.x =
            width + 10;

        }

        if (
          particle.x >
          width + 10
        ) {

          particle.x =
            -10;

        }

        if (
          particle.y <
          -10
        ) {

          particle.y =
            height + 10;

        }

        if (
          particle.y >
          height + 10
        ) {

          particle.y =
            -10;

        }


        /*
         * Mouse interaction.
         *
         * Particles gently move away from cursor.
         */

        if (mouse.active) {

          const dx =
            particle.x -
            mouse.x;

          const dy =
            particle.y -
            mouse.y;


          const distanceSquared =
            dx * dx +
            dy * dy;


          const mouseRadiusSquared =
            CONFIG.mouseRadius *
            CONFIG.mouseRadius;


          if (
            distanceSquared <
              mouseRadiusSquared &&
            distanceSquared >
              0.01
          ) {

            const distance =
              Math.sqrt(
                distanceSquared
              );


            const force =
              (
                1 -
                distance /
                  CONFIG.mouseRadius
              ) *
              CONFIG.mouseForce;


            particle.x +=
              (
                dx /
                distance
              ) *
              force *
              26;


            particle.y +=
              (
                dy /
                distance
              ) *
              force *
              26;

          }

        }

      }


      /* ---------------------------------------------------
         Draw particle
         --------------------------------------------------- */

      function drawParticle(
        particle
      ) {

        ctx.beginPath();


        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );


        ctx.fillStyle =
          "rgba(59, 130, 246, " +
          particle.alpha +
          ")";


        ctx.fill();

      }


      /* ---------------------------------------------------
         Draw connections
         --------------------------------------------------- */

      function drawConnections() {

        const maxDistance =
          CONFIG.connectionDistance;


        const maxDistanceSquared =
          maxDistance *
          maxDistance;


        for (
          let i = 0;
          i < particles.length;
          i++
        ) {

          const a =
            particles[i];


          for (
            let j = i + 1;
            j < particles.length;
            j++
          ) {

            const b =
              particles[j];


            const dx =
              a.x -
              b.x;

            const dy =
              a.y -
              b.y;


            const distanceSquared =
              dx * dx +
              dy * dy;


            if (
              distanceSquared <
              maxDistanceSquared
            ) {

              const distance =
                Math.sqrt(
                  distanceSquared
                );


              const opacity =
                (
                  1 -
                  distance /
                    maxDistance
                ) *
                0.12;


              ctx.beginPath();


              ctx.moveTo(
                a.x,
                a.y
              );


              ctx.lineTo(
                b.x,
                b.y
              );


              ctx.strokeStyle =
                "rgba(59, 130, 246, " +
                opacity +
                ")";


              ctx.lineWidth =
                0.7;


              ctx.stroke();

            }

          }

        }

      }


      /* ---------------------------------------------------
         Mouse halo particle connections
         --------------------------------------------------- */

      function drawMouseConnections() {

        if (!mouse.active) {
          return;
        }


        particles.forEach(
          function (particle) {

            const dx =
              particle.x -
              mouse.x;

            const dy =
              particle.y -
              mouse.y;


            const distance =
              Math.sqrt(
                dx * dx +
                dy * dy
              );


            if (
              distance <
              CONFIG.mouseRadius
            ) {

              const opacity =
                (
                  1 -
                  distance /
                    CONFIG.mouseRadius
                ) *
                0.18;


              ctx.beginPath();


              ctx.moveTo(
                particle.x,
                particle.y
              );


              ctx.lineTo(
                mouse.x,
                mouse.y
              );


              ctx.strokeStyle =
                "rgba(56, 189, 248, " +
                opacity +
                ")";


              ctx.lineWidth =
                0.8;


              ctx.stroke();

            }

          }
        );

      }


      /* ---------------------------------------------------
         Animation loop
         --------------------------------------------------- */

      function animateParticles() {

        ctx.clearRect(
          0,
          0,
          width,
          height
        );


        particles.forEach(
          function (particle) {

            updateParticle(
              particle
            );

            drawParticle(
              particle
            );

          }
        );


        drawConnections();

        drawMouseConnections();


        requestAnimationFrame(
          animateParticles
        );

      }


      /*
       * Initialise.
       */

      resizeCanvas();

      animateParticles();


      let resizeTimer;


      window.addEventListener(
        "resize",

        function () {

          clearTimeout(
            resizeTimer
          );


          resizeTimer =
            setTimeout(
              resizeCanvas,
              160
            );

        },

        {
          passive: true
        }
      );

    }

  }


  /* =======================================================
     3. Masthead scroll state
     ======================================================= */

  const masthead =
    document.querySelector(
      ".masthead"
    );


  function updateMasthead() {

    if (!masthead) {
      return;
    }


    if (
      window.scrollY >
      16
    ) {

      masthead.classList.add(
        "premium-scrolled"
      );

    } else {

      masthead.classList.remove(
        "premium-scrolled"
      );

    }

  }


  updateMasthead();


  window.addEventListener(
    "scroll",

    updateMasthead,

    {
      passive: true
    }
  );


  /* =======================================================
     4. Scroll reveal
     ======================================================= */

  const content =
    document.querySelector(
      ".page__content"
    );


  if (content) {

    const revealCandidates =
      content.querySelectorAll(
        "h1, h2, .paper-box, p, ul, ol"
      );


    revealCandidates.forEach(
      function (element) {

        if (
          element.closest(
            ".paper-box"
          ) &&
          !element.classList.contains(
            "paper-box"
          )
        ) {

          return;

        }


        element.classList.add(
          "premium-reveal"
        );

      }
    );


    content
      .querySelectorAll(
        "h1, h2"
      )
      .forEach(
        function (heading) {

          heading.classList.add(
            "premium-heading"
          );

        }
      );


    if (
      "IntersectionObserver" in window &&
      !reducedMotion
    ) {

      const observer =
        new IntersectionObserver(

          function (
            entries,
            observerInstance
          ) {

            entries.forEach(
              function (entry) {

                if (
                  entry.isIntersecting
                ) {

                  entry.target
                    .classList
                    .add(
                      "premium-visible"
                    );


                  observerInstance
                    .unobserve(
                      entry.target
                    );

                }

              }
            );

          },

          {
            root: null,

            threshold:
              0.08,

            rootMargin:
              "0px 0px -35px 0px"
          }

        );


      document
        .querySelectorAll(
          ".premium-reveal, .premium-heading"
        )
        .forEach(
          function (element) {

            observer.observe(
              element
            );

          }
        );

    } else {

      document
        .querySelectorAll(
          ".premium-reveal, .premium-heading"
        )
        .forEach(
          function (element) {

            element.classList.add(
              "premium-visible"
            );

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
    .forEach(
      function (link) {

        link.addEventListener(
          "mouseenter",

          function () {

            link.style.opacity =
              "0.82";

          }
        );


        link.addEventListener(
          "mouseleave",

          function () {

            link.style.opacity =
              "";

          }
        );

      }
    );


  /* =======================================================
     6. Loaded state
     ======================================================= */

  window.addEventListener(
    "load",

    function () {

      document.body
        .classList
        .add(
          "premium-loaded"
        );

    }
  );

})();
