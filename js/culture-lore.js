jQuery(document).ready(function ($) {
  function cloneSlidesForLoop() {
    const $wrapper = $(".artifact-swiper .swiper-wrapper");
    const $slides = $wrapper.find(".swiper-slide");

    const minNeeded = 7;

    if ($slides.length < minNeeded) {
      const clonesNeeded =
        Math.ceil(minNeeded / $slides.length) * $slides.length;

      for (let i = 0; i < clonesNeeded; i++) {
        const $clone = $slides.eq(i % $slides.length).clone();

        $clone.addClass("swiper-slide-duplicate");

        $wrapper.append($clone);
      }
    }
  }

  cloneSlidesForLoop();

  function updateBottomContent(swiper) {
    const $activeSlide = $(swiper.slides[swiper.activeIndex]);

    const title = $activeSlide.attr("data-title");
    const desc = $activeSlide.attr("data-desc");

    if (title && desc) {
      $("#artifactSwiperTitle").text(title);
      $("#artifactSwiperDesc").text(desc);
    }
  }

  const artifactSlider = new Swiper(".artifact-swiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    speed: 900,

    navigation: {
      nextEl: ".artifact-next",
      prevEl: ".artifact-prev",
    },

    loopAdditionalSlides: 4,
    loopedSlides: 8,

    watchSlidesProgress: true,
    slideToClickedSlide: true,

    on: {
      init: function () {
        updateBottomContent(this);
      },

      slideChange: function () {
        updateBottomContent(this);
      },
    },
  });

  const swiper = new Swiper(".rst-bands-slider-img-swiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    spaceBetween: 60,
    speed: 600,
    autoHeight: true,
    navigation: {
      nextEl: ".swiper-button-next-bands",
      prevEl: ".swiper-button-prev-bands",
    },
    on: {
      init(swiper) {
        updateCustomClasses(swiper);
      },

      slideChangeTransitionStart(swiper) {
        updateCustomClasses(swiper);
      },
    },
  });

  function updateCustomClasses(swiper) {
    document.querySelectorAll(".swiper-slide").forEach((slide) => {
      slide.classList.remove(
        "swiper-slide-prev-prev",
        "swiper-slide-next-next",
      );
    });

    const prevPrev = swiper.slides[swiper.activeIndex - 2];

    const nextNext = swiper.slides[swiper.activeIndex + 2];

    if (prevPrev) {
      prevPrev.classList.add("swiper-slide-prev-prev");
    }

    if (nextNext) {
      nextNext.classList.add("swiper-slide-next-next");
    }
  }
  const swiper2 = new Swiper(".rst-slider-gear", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next-gear",
      prevEl: ".swiper-button-prev-gear",
    },
  });
});
