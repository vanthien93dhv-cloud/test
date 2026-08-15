jQuery(document).ready(function ($) {
  let originalSlideCount = 0;

  function handleSliderVideos(swiper) {
    const videos = swiper.el.querySelectorAll("video");

    videos.forEach((video) => {
      video.pause();
    });

    const activeSlide = swiper.slides[swiper.activeIndex];
    const activeVideo = activeSlide?.querySelector("video");

    if (activeVideo) {
      activeVideo.play().catch(() => {});
    }
  }
  function updateCounter(swiper, wrapperSelector) {
    const wrapper = document.querySelector(wrapperSelector);

    if (!wrapper) return;

    const current = wrapper.querySelector(".current");
    const total = wrapper.querySelector(".total");

    if (!current || !total) return;

    const realIndex = (swiper.realIndex % originalSlideCount) + 1;

    current.textContent = realIndex.toString().padStart(2, "0");
    total.textContent = originalSlideCount.toString().padStart(2, "0");
  }

  const modernMammothSliderEL = document.querySelector(
    ".modern-mammoth-slider",
  );

  if (modernMammothSliderEL) {
    const wrapper = modernMammothSliderEL.querySelector(".swiper-wrapper");
    const originalSlides = [...wrapper.querySelectorAll(".swiper-slide")];

    originalSlideCount = originalSlides.length;

    if (originalSlides.length < 4) {
      const targetSlides = 8;

      while (wrapper.children.length < targetSlides) {
        originalSlides.forEach((slide) => {
          if (wrapper.children.length < targetSlides) {
            const clone = slide.cloneNode(true);
            clone.classList.add("swiper-slide-clone-custom");
            wrapper.appendChild(clone);
          }
        });
      }
    }
  }
  const modernMammothSlider = new Swiper(".modern-mammoth-slider", {
    slidesPerView: 2.087,
    centeredSlides: true,
    spaceBetween: 16,
    loop: true,
    navigation: {
      nextEl: ".modern-mammoth-next",
      prevEl: ".modern-mammoth-prev",
    },
    on: {
      init: function () {
        updateCounter(this, ".modern-mammoth .slider-counter");
        handleSliderVideos(this);
      },
      slideChange: function () {
        updateCounter(this, ".modern-mammoth .slider-counter");
        handleSliderVideos(this);
      },
    },
  });

  let currentIndexPartners = 0;
  const $tabPartners = $(".elephant-partners .partner-item");

  $(".partners-sidebar-counter .total").text(
    String($tabPartners.length).padStart(2, "0"),
  );

  function showTabPartners(index) {
    const tabId = $tabPartners.eq(index).data("tab");

    $tabPartners.removeClass("active");
    $tabPartners.eq(index).addClass("active");

    $(".elephant-partners .partner-content").removeClass("active");
    $('.elephant-partners .partner-content[data-tab="' + tabId + '"]').addClass(
      "active",
    );

    $(".partners-sidebar-counter .current").text(
      String(index + 1).padStart(2, "0"),
    );

    currentIndexPartners = index;
  }

  showTabPartners(currentIndexPartners);

  $(".elephant-partners .partner-item").on("click", function () {
    const index = $tabPartners.index(this);
    showTabPartners(index);
  });

  $(".elephant-partners .partner-next").on("click", function () {
    let next = currentIndexPartners + 1;

    if (next >= $tabPartners.length) {
      next = 0;
    }

    showTabPartners(next);
  });

  $(".elephant-partners .partner-prev").on("click", function () {
    let prev = currentIndexPartners - 1;

    if (prev < 0) {
      prev = $tabPartners.length - 1;
    }

    showTabPartners(prev);
  });
});
