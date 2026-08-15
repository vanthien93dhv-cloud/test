console.log("test");

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

  // if (!isAndroid()) {
  const smoother = ScrollSmoother.create({
    wrapper: "#wrap",
    content: ".smooth-content",
    smooth: 1,
    smoothTouch: 0,
    effects: true,
  });
  // }

  // Scroll To Section Smooth
  $(".smooth-link a").on("click", function (e) {
    e.preventDefault();

    const target = $(this).attr("href");

    smoother.scrollTo(target, true, "top top");
  });
  // Animate elements with .animate-in-x class as they scroll into view
  gsap.utils.toArray(".animate-in-x").forEach((element) => {
    gsap.to(element, {
      x: "-3%",
      opacity: 1,
      scrollTrigger: {
        trigger: element,
        start: "bottom bottom+=200",
        end: "top top-=200",
        scrub: 1,
        markers: false,
      },
    });
  });

  // Split text animation on scroll
  gsap.utils.toArray(".split-text").forEach((element) => {
    const split = new SplitText(element, { type: "words" });

    const duration =
      parseFloat(element.getAttribute("data-split-duration")) || 1;
    const delay = parseFloat(element.getAttribute("data-split-delay")) || 0;
    const stagger =
      parseFloat(element.getAttribute("data-split-stagger")) || 0.03;

    console.log(duration, delay);

    gsap.from(split.words, {
      delay: delay,
      duration: duration,
      opacity: 0,
      y: 10,
      stagger: stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "bottom bottom-=10",
        end: "bottom center",
        toggleActions: "play none none none",
        markers: false,
      },
    });
  });

  // Fade in and slide up animation
  gsap.utils.toArray(".fade-in-up").forEach((element) => {
    const delay = parseFloat(element.getAttribute("data-delay")) || 0;

    gsap.from(element, {
      delay: delay,
      duration: 1.2,
      opacity: 0,
      // y: 100,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "bottom bottom-=100",
        end: "bottom center",
        toggleActions: "play none none none",
        markers: false,
      },
    });
  });

  // Fade in and slide from left animation
  gsap.utils.toArray(".fade-in-left").forEach((element) => {
    const delay = parseFloat(element.getAttribute("data-delay")) || 0;

    gsap.from(element, {
      delay: delay,
      duration: 0.8,
      opacity: 0,
      x: -50,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "bottom bottom+=100",
        end: "bottom center",
        toggleActions: "play none none none",
        markers: false,
      },
    });
  });

  // Split text animation on scroll
  gsap.utils.toArray(".glitch-text").forEach((element) => {
    const split = new SplitText(element, { type: "chars" });

    const duration = parseFloat(element.getAttribute("data-duration")) || 1;
    const delay = parseFloat(element.getAttribute("data-delay")) || 0;
    const stagger = parseFloat(element.getAttribute("data-stagger")) || 0.05;

    console.log(duration, delay);

    gsap.from(split.chars, {
      delay: delay,
      duration: 0.2,
      opacity: 0,
      // y: 10,
      stagger: stagger,
      ease: "steps(6)",
      scrollTrigger: {
        trigger: element,
        start: "bottom bottom-=10",
        end: "bottom center",
        toggleActions: "play none none none",
        markers: false,
        onEnter: () =>
          setTimeout(() => element.classList.add("glitch-in"), delay * 1000),
      },
    });
  });

  gsap.utils.toArray(".glitch-square").forEach((element) => {
    const duration = parseFloat(element.getAttribute("data-duration")) || 1;
    const delay = parseFloat(element.getAttribute("data-delay")) || 0;

    gsap.from(element, {
      delay: delay,
      duration: 0.7,
      opacity: 0,
      ease: "steps(5)",
      scrollTrigger: {
        trigger: element,
        start: "bottom bottom-=10",
        end: "bottom center",
        toggleActions: "play none none none",
        markers: false,
        onEnter: () =>
          setTimeout(() => element.classList.add("glitch-in"), delay * 1000),
      },
    });
  });

  const el = document.querySelector(".lab-universities-heading");

  if (el) {
    ScrollTrigger.create({
      trigger: el,
      start: "top 40%",
      end: "bottom 0%",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress * -20;
        const pWhite = self.progress * 10;

        const whiteStop = gsap.utils.interpolate(16.62, 0, pWhite);
        const purpleStop = gsap.utils.interpolate(96.47, 100, p);

        el.style.backgroundImage = `linear-gradient(180deg, #FFFFFF ${whiteStop}%, #9940DD ${purpleStop + 50}%)`;
      },
    });
  }
});
