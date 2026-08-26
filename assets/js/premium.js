/**
 * Jiancheng Chi Academic Homepage
 * Premium Visual Enhancement
 *
 * Features:
 * 1. Interactive particle field
 * 2. Particle connections
 * 3. Mouse repulsion
 * 4. Mouse particle connections
 * 5. Mouse spotlight
 * 6. Mouse pulse
 * 7. Soft click water ripple
 * 8. Subtle click sparks
 * 9. Scroll reveal
 * 10. Sticky navigation enhancement
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
     Shared mouse state
     ======================================================= */

  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 3,
    active: false
  };


  document.addEventListener(
    "pointermove",
    function (event) {

      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;

    },
    {
      passive: true
    }
  );


  document.addEventListener(
    "pointerleave",
    function () {

      mouse.active = false;

    },
    {
      passive: true
    }
  );


  /* =======================================================
     1. Mouse spotlight
     ======================================================= */

  if (!isMobile && !reducedMotion) {

    let targetX =
      mouse.x;

    let targetY =
      mouse.y;

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
        (targetX - currentX) * 0.11;

      currentY +=
        (targetY - currentY) * 0.11;


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
     2. Particle System
     ======================================================= */

  if (!isMobile && !reducedMotion) {

    const canvas =
      document.getElementById(
        "premium-particles"
      );


    if (canvas) {

      const ctx =
        canvas.getContext(
          "2d",
          {
            alpha: true
          }
        );


      let width = 0;
      let height = 0;

      let dpr = 1;

      let particles = [];

      let animationFrame = null;

      let lastTime = 0;


      const CONFIG = {

        density: 17500,

        minParticles: 40,

        maxParticles: 95,

        minRadius: 0.9,

        maxRadius: 1.9,

        baseSpeed: 0.13,

        connectionDistance: 125,

        mouseRadius: 175,

        mouseForce: 0.55,

        mouseConnectionOpacity: 0.24,

        normalConnectionOpacity: 0.15

      };


      /* ===================================================
         Resize
         =================================================== */

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
          Math.round(
            width * dpr
          );

        canvas.height =
          Math.round(
            height * dpr
          );


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


        createParticleField();

      }


      /* ===================================================
         Particle factory
         =================================================== */

      function createParticle() {

        const angle =
          Math.random() *
          Math.PI *
          2;


        const speed =
          CONFIG.baseSpeed *
          (
            0.50 +
            Math.random() *
            0.90
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
            speed,

          vy:
            Math.sin(angle) *
            speed,

          radius:
            CONFIG.minRadius +
            Math.random() *
            (
              CONFIG.maxRadius -
              CONFIG.minRadius
            ),

          alpha:
            0.30 +
            Math.random() *
            0.42

        };

      }


      /* ===================================================
         Create field
         =================================================== */

      function createParticleField() {

        const count =
          Math.max(

            CONFIG.minParticles,

            Math.min(

              CONFIG.maxParticles,

              Math.floor(
                (
                  width *
                  height
                ) /
                CONFIG.density
              )

            )

          );


        particles = [];


        for (
          let i = 0;
          i < count;
          i++
        ) {

          particles.push(
            createParticle()
          );

        }

      }


      /* ===================================================
         Update particle
         =================================================== */

      function updateParticle(
        particle,
        deltaScale
      ) {

        particle.x +=
          particle.vx *
          deltaScale;

        particle.y +=
          particle.vy *
          deltaScale;


        if (
          particle.x < -10
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
          particle.y < -10
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


          const radiusSquared =
            CONFIG.mouseRadius *
            CONFIG.mouseRadius;


          if (
            distanceSquared <
              radiusSquared &&
            distanceSquared >
              1
          ) {

            const distance =
              Math.sqrt(
                distanceSquared
              );


            const strength =
              1 -
              distance /
              CONFIG.mouseRadius;


            const force =
              strength *
              strength *
              CONFIG.mouseForce;


            particle.x +=
              (
                dx /
                distance
              ) *
              force *
              1.8;


            particle.y +=
              (
                dy /
                distance
              ) *
              force *
              1.8;

          }

        }

      }


      /* ===================================================
         Draw particles
         =================================================== */

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
          "rgba(37, 99, 235, " +
          particle.alpha +
          ")";


        ctx.fill();

      }


      /* ===================================================
         Particle connections
         =================================================== */

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

          const particleA =
            particles[i];


          for (
            let j = i + 1;
            j < particles.length;
            j++
          ) {

            const particleB =
              particles[j];


            const dx =
              particleA.x -
              particleB.x;

            const dy =
              particleA.y -
              particleB.y;


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


              const alpha =
                (
                  1 -
                  distance /
                  maxDistance
                ) *
                CONFIG.normalConnectionOpacity;


              ctx.beginPath();


              ctx.moveTo(
                particleA.x,
                particleA.y
              );


              ctx.lineTo(
                particleB.x,
                particleB.y
              );


              ctx.strokeStyle =
                "rgba(59, 130, 246, " +
                alpha +
                ")";


              ctx.lineWidth =
                0.65;


              ctx.stroke();

            }

          }

        }

      }


      /* ===================================================
         Mouse connections
         =================================================== */

      function drawMouseConnections() {

        if (!mouse.active) {
          return;
        }


        for (
          let i = 0;
          i < particles.length;
          i++
        ) {

          const particle =
            particles[i];


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

            const alpha =
              (
                1 -
                distance /
                CONFIG.mouseRadius
              ) *
              CONFIG.mouseConnectionOpacity;


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
              alpha +
              ")";


            ctx.lineWidth =
              0.85;


            ctx.stroke();

          }

        }

      }


      /* ===================================================
         Mouse pulse
         =================================================== */

      function drawMousePulse(
        time
      ) {

        if (!mouse.active) {
          return;
        }


        const cycle =
          (
            Math.sin(
              time * 0.002
            ) +
            1
          ) /
          2;


        const radius =
          11 +
          cycle * 8;


        const alpha =
          0.08 +
          cycle * 0.05;


        const gradient =
          ctx.createRadialGradient(

            mouse.x,
            mouse.y,
            0,

            mouse.x,
            mouse.y,
            radius

          );


        gradient.addColorStop(
          0,
          "rgba(56, 189, 248, " +
          alpha +
          ")"
        );


        gradient.addColorStop(
          1,
          "rgba(56, 189, 248, 0)"
        );


        ctx.beginPath();


        ctx.arc(
          mouse.x,
          mouse.y,
          radius,
          0,
          Math.PI * 2
        );


        ctx.fillStyle =
          gradient;


        ctx.fill();

      }


      /* ===================================================
         Animation
         =================================================== */

      function animate(
        time
      ) {

        animationFrame =
          requestAnimationFrame(
            animate
          );


        const delta =
          lastTime
            ? time - lastTime
            : 16.67;


        lastTime =
          time;


        const deltaScale =
          Math.min(
            delta / 16.67,
            2
          );


        ctx.clearRect(
          0,
          0,
          width,
          height
        );


        for (
          let i = 0;
          i < particles.length;
          i++
        ) {

          updateParticle(
            particles[i],
            deltaScale
          );

        }


        drawConnections();


        for (
          let i = 0;
          i < particles.length;
          i++
        ) {

          drawParticle(
            particles[i]
          );

        }


        drawMouseConnections();

        drawMousePulse(
          time
        );

      }


      /* ===================================================
         Visibility optimisation
         =================================================== */

      document.addEventListener(
        "visibilitychange",
        function () {

          if (
            document.hidden
          ) {

            if (
              animationFrame
            ) {

              cancelAnimationFrame(
                animationFrame
              );

              animationFrame =
                null;

            }

          } else {

            lastTime = 0;


            if (
              !animationFrame
            ) {

              animationFrame =
                requestAnimationFrame(
                  animate
                );

            }

          }

        }
      );


      /* ===================================================
         Window resize
         =================================================== */

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
              180
            );

        },
        {
          passive: true
        }
      );


      /* ===================================================
         Initialise
         =================================================== */

      resizeCanvas();


      animationFrame =
        requestAnimationFrame(
          animate
        );

    }

  }


  /* =======================================================
     3. Soft click ripple + subtle sparks
     ======================================================= */

  if (!reducedMotion) {

    document.addEventListener(
      "pointerdown",

      function (event) {

        /*
         * Only primary click / touch.
         */

        if (
          event.button !== undefined &&
          event.button !== 0
        ) {
          return;
        }


        const target =
          event.target;


        /*
         * Avoid interference with form controls.
         */

        if (
          target.closest(
            "input, textarea, select"
          )
        ) {
          return;
        }


        /* -----------------------------------------------
           Main soft ripple
           ----------------------------------------------- */

        const ripple =
          document.createElement(
            "span"
          );


        ripple.className =
          "premium-click-ripple";


        ripple.style.left =
          event.clientX + "px";


        ripple.style.top =
          event.clientY + "px";


        document.body.appendChild(
          ripple
        );


        ripple.addEventListener(
          "animationend",

          function () {
            ripple.remove();
          },

          {
            once: true
          }
        );


        /* -----------------------------------------------
           Very subtle spark particles
           ----------------------------------------------- */

        const sparkCount = 5;


        for (
          let i = 0;
          i < sparkCount;
          i++
        ) {

          const spark =
            document.createElement(
              "span"
            );


          spark.className =
            "premium-click-spark";


          spark.style.left =
            event.clientX + "px";


          spark.style.top =
            event.clientY + "px";


          const angle =
            (
              Math.PI *
              2 *
              i
            ) /
            sparkCount +
            Math.random() *
            0.30;


          const distance =
            14 +
            Math.random() *
            16;


          spark.style.setProperty(
            "--spark-x",
            Math.cos(angle) *
              distance +
              "px"
          );


          spark.style.setProperty(
            "--spark-y",
            Math.sin(angle) *
              distance +
              "px"
          );


          document.body.appendChild(
            spark
          );


          spark.addEventListener(
            "animationend",

            function () {
              spark.remove();
            },

            {
              once: true
            }
          );

        }

      },

      {
        passive: true
      }
    );

  }


  /* =======================================================
     4. Masthead
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
     5. Scroll Reveal
     ======================================================= */

  const content =
    document.querySelector(
      ".page__content"
    );


  if (content) {

    const elements =
      content.querySelectorAll(
        "h1, h2, .paper-box, p, ul, ol"
      );


    elements.forEach(
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
            threshold: 0.07,

            rootMargin:
              "0px 0px -30px 0px"
          }

        );


      document
        .querySelectorAll(
          ".premium-reveal, .page__content h1, .page__content h2"
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
          ".premium-reveal, .page__content h1, .page__content h2"
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
     6. Loaded State
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
