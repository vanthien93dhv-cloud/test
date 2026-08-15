jQuery(document).ready(function ($) {
  // FAQ - Start
  const firstFaqItem = $(".faq-item").first();
  firstFaqItem.addClass("active");
  firstFaqItem.find(".faq-content").show();
  firstFaqItem.find(".faq-toggle").text("[ CLOSE ]");
  $(".faq-header").click(function () {
    const item = $(this).closest(".faq-item");
    const content = item.find(".faq-content");
    const toggleBtn = item.find(".faq-toggle");

    $(".faq-item").not(item).removeClass("active");
    $(".faq-content").not(content).slideUp();
    $(".faq-toggle").not(toggleBtn).text("[ EXPAND ]");

    if (item.hasClass("active")) {
      item.removeClass("active");
      content.slideUp();
      toggleBtn.text("[ EXPAND ]");
    } else {
      item.addClass("active");
      content.slideDown();
      toggleBtn.text("[ CLOSE ]");
    }
  });
  // FAQ - End

  const swiperAdvisor = new Swiper(".advisor-swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: true,
    breakpoints: {
      0: {
        spaceBetween: 8,
      },
      768: {
        spaceBetween: 10,
      },
      1024: {
        spaceBetween: 20,
      },
    },
    pagination: {
      el: ".advisor-progress",
      type: "progressbar",
    },

    navigation: {
      nextEl: ".advisor-next",
      prevEl: ".advisor-prev",
    },

    on: {
      init: function () {
        updateFraction(this, ".advisor-counter");
      },
      slideChange: function () {
        updateFraction(this, ".advisor-counter");
      },
    },
  });

  function updateFraction(swiper, wrapperSelector) {
    const wrapper = document.querySelector(wrapperSelector);

    if (!wrapper) return;

    const current = wrapper.querySelector(".current");
    const total = wrapper.querySelector(".total");

    if (!current || !total) return;

    let realIndex = swiper.realIndex + 1;
    let totalSlides = swiper.slides.length - (swiper.loop ? 2 : 0);

    current.textContent = realIndex.toString().padStart(2, "0");
    total.textContent = totalSlides.toString().padStart(2, "0");
  }

  // Explore Key Slider - Start
  const keyItems = $(".explore-key-list .item");

  const exploreSwiper = new Swiper(".explore-key-swiper", {
    slidesPerView: "auto",
    spaceBetween: 40,
    loop: true,
    centeredSlides: true,
    breakpoints: {
      0: { spaceBetween: 12 },
      768: { spaceBetween: 20 },
      1024: { spaceBetween: 40 },
    },
    navigation: {
      nextEl: ".explore-key-next",
      prevEl: ".explore-key-prev",
    },
    on: {
      init: function () {
        const key = this.realIndex;
        keyItems
          .removeClass("active")
          .filter(`[data-key="${key}"]`)
          .addClass("active");
      },
      slideChange: function () {
        const key = this.realIndex;

        keyItems
          .removeClass("active")
          .filter(`[data-key="${key}"]`)
          .addClass("active");
      },
    },
  });
  keyItems.on("click", function () {
    const key = $(this).data("key");
    exploreSwiper.slideToLoop(key);
  });
  // Explore Key Slider - End

  const mammothEraSlider = new Swiper(".mammoth-era-slider", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".mammoth-era-next",
      prevEl: ".mammoth-era-prev",
    },
    on: {
      init: function () {
        updateCounter(this, ".mammoth-era-slider .slider-counter");
      },
      slideChange: function () {
        updateCounter(this, ".mammoth-era-slider .slider-counter");
      },
    },
  });

  // Clone marquee - Start
  $(".clsl-marquee-wrapper").each(function () {
    const $marquee = $(this).find(".clsl-marquee").first();

    for (let i = 0; i < 4; i++) {
      $marquee.clone().appendTo($(this));
    }
  });
  // Clone marquee - End

  // Slider Auto Smooth  - Start
  $(".cs-slider-smooth .slider-track").each(function () {
    const $track = $(this);
    const $items = $track.children();
    const itemCount = $items.length;

    $items.each(function () {
      $track.append($(this).clone());
    });

    const duration = itemCount * 4;

    $track.css("--marquee-duration", `${duration}s`);
  });
  // Slider Auto Smooth  - END

  const direwolfSlider = new Swiper(".dire-wolf-slider", {
    loop: true,
    centeredSlides: true,
    slidesPerView: 2.087,
    spaceBetween: 16,
    breakpoints: {
      0: {
        spaceBetween: 8,
      },
      768: {
        spaceBetween: 12,
      },
      1024: {
        spaceBetween: 16,
      },
    },

    navigation: {
      nextEl: ".dire-wolf-slider-next",
      prevEl: ".dire-wolf-slider-prev",
    },
    on: {
      init: function () {
        updateCounter(this, ".dire-wolf-slider-wrapper .slider-counter");
      },
      slideChange: function () {
        updateCounter(this, ".dire-wolf-slider-wrapper .slider-counter");
      },
    },
  });

  const labSlider = new Swiper(".lab-slider", {
    slidesPerView: "auto",
    spaceBetween: 20,
    breakpoints: {
      0: {
        spaceBetween: 8,
      },
      768: {
        spaceBetween: 10,
      },
      1024: {
        spaceBetween: 20,
      },
    },
    centeredSlides: false,
    navigation: {
      nextEl: ".lab-next",
      prevEl: ".lab-prev",
    },
    on: {
      init: function () {
        updateCounter(this, ".lab-slider-container .slider-counter");
      },
      slideChange: function () {
        updateCounter(this, ".lab-slider-container .slider-counter");
      },
    },
  });

  const labTourSlider = new Swiper(".lab-tour-slider", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".lab-tour-next",
      prevEl: ".lab-tour-prev",
    },
    on: {
      init: function () {
        updateCounter(this, ".lab-tour-slider-container .slider-counter");
      },
      slideChange: function () {
        updateCounter(this, ".lab-tour-slider-container .slider-counter");
      },
    },
  });
  const workplaceSlider = new Swiper(".workplace-slider", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".workplace-slider-next",
      prevEl: ".workplace-slider-prev",
    },
    on: {
      init: function () {
        updateCounter(this, ".workplace-slider-wrapper .slider-counter");
      },
      slideChange: function () {
        updateCounter(this, ".workplace-slider-wrapper .slider-counter");
      },
    },
  });
  const influenceSlider = new Swiper(".influence-slider", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".influence-slider-next",
      prevEl: ".influence-slider-prev",
    },
    on: {
      init: function () {
        updateCounter(this, ".influence-slider-wrapper .slider-counter");
      },
      slideChange: function () {
        updateCounter(this, ".influence-slider-wrapper .slider-counter");
      },
    },
  });
  function updateCounter(swiper, wrapperSelector) {
    const wrapper = document.querySelector(wrapperSelector);

    if (!wrapper) return;

    const current = wrapper.querySelector(".current");
    const total = wrapper.querySelector(".total");

    if (!current || !total) return;

    let realIndex = swiper.realIndex + 1;
    let totalSlides = swiper.slides.length - (swiper.loop ? 2 : 0);

    current.textContent = realIndex.toString().padStart(2, "0");
    total.textContent = totalSlides.toString().padStart(2, "0");
  }

  $(".species-colossal-content .co-content").hide();
  $(".species-colossal-content .co-content.active").show();

  const $wrapper = $(".species-colossal-list-wrapper");
  const $list = $(".species-colossal-list");
  const wrapperHeight = $wrapper.height();

  function centerActiveItem($item) {
    const itemTop = $item.position().top;
    const itemHeight = $item.outerHeight();
    const targetY = wrapperHeight / 2 - itemHeight / 2;

    const translateY = targetY - itemTop;

    $list.css({
      transform: `translateY(${translateY}px)`,
      transition: "0.4s ease",
    });
  }

  $(".species-colossal-list .item").on("click", function () {
    const $item = $(this);
    const target = $item.data("target");

    $(".species-colossal-list .item").removeClass("active");
    $item.addClass("active");

    centerActiveItem($item);

    $(".species-colossal-content .co-content").removeClass("active").hide();

    $(`.species-colossal-content .co-content[data-id="${target}"]`)
      .addClass("active")
      .fadeIn(200);
  });

  // centerActiveItem($(".species-colossal-list .item.active"));

  const colossalProjectSlider = new Swiper(".colossal-project-swiper", {
    slidesPerView: "auto",
    speed: 600,
    spaceBetween: 20,
    loop: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    initialSlide: 0,
    autoHeight: false,
    height: null,
    navigation: {
      nextEl: ".colossal-project-next",
      prevEl: ".colossal-project-prev",
    },
    on: {
      init: function () {
        handleVideo(this);
      },
      slideChange: function () {
        handleVideo(this);
      },
    },
  });

  function handleVideo(swiper) {
    $(".slide-video").each(function () {
      if (typeof this.pause === "function") {
        this.pause();
        this.currentTime = 0;
      }
    });

    const $activeSlide = $(swiper.slides).eq(swiper.activeIndex);

    if (!$activeSlide.length) return;

    const $video = $activeSlide.find(".slide-video");

    if (!$video.length) return;

    const videoEl = $video.get(0);

    if (videoEl && typeof videoEl.play === "function") {
      videoEl.play().catch(function () {});
    }
  }
  new Swiper(".conservation-partner-slider", {
    slidesPerView: "auto",
    spaceBetween: 20,
    breakpoints: {
      0: {
        spaceBetween: 8,
      },
      768: {
        spaceBetween: 10,
      },
      1024: {
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: ".partner-next",
      prevEl: ".partner-prev",
    },
  });

  new Swiper(".lab-universities-slider", {
    slidesPerView: "auto",
    spaceBetween: 20,
    centerInsufficientSlides: true,
    breakpoints: {
      0: {
        spaceBetween: 8,
      },
      768: {
        spaceBetween: 10,
      },
      1024: {
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: ".lab-universities-next",
      prevEl: ".lab-universities-prev",
    },
  });

  function initVideoController(sectionSelector) {
    $(sectionSelector).each(function () {
      const $section = $(this);
      const $video = $section.find("video");
      const video = $video.get(0);

      const $btnPlay = $section.find(".btn-play-video .play");
      const $btnPause = $section.find(".btn-play-video .pause");
      const $soundTxt = $section.find(".sound-status");

      $section.find(".btn-play-video").on("click", function () {
        if (video.paused) {
          video.play();
          video.muted = false;

          $btnPause.show();
          $btnPlay.hide();
          $soundTxt.text("Sound on");
        } else {
          video.pause();
          video.muted = true;

          $btnPause.hide();
          $btnPlay.show();
          $soundTxt.text("Sound off");
        }
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play();
              video.muted = false;

              $btnPause.show();
              $btnPlay.hide();
              $soundTxt.text("Sound on");
            } else {
              video.pause();
              video.muted = true;

              $btnPause.hide();
              $btnPlay.show();
              $soundTxt.text("Sound off");
            }
          });
        },
        {
          threshold: 0.5,
        },
      );

      observer.observe(video);
    });
  }

  initVideoController(".home-hero");
  initVideoController(".clsl-lab-video");
  initVideoController(".cultural-movement-video");
  initVideoController(".science-action-video-wrapper");

  $(".giant-moa-video").each(function () {
    const $wrapper = $(this);
    const video = $wrapper.find("video")[0];
    const $playBtn = $wrapper.find(".play-btn");
    const $overlay = $wrapper.find(".video-overlay");

    function playVideo() {
      video.play();
      video.controls = true;

      $playBtn.hide();
      $overlay.hide();
    }

    $playBtn.on("click", playVideo);
    $overlay.on("click", playVideo);

    video.addEventListener("pause", () => {
      video.controls = false;

      $playBtn.show();
      $overlay.show();
    });
  });
});
