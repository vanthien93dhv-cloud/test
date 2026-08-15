jQuery(function ($) {
  // Play Video - Start
  $(".woolly-mouse-banner__video .play-btn").on("click", function () {
    const wrapper = $(this).closest(".woolly-mouse-banner__video .video-box");
    const video = wrapper.find(".video-player").get(0);

    video.setAttribute("controls", "");

    video.play();

    wrapper.addClass("playing");
  });

  $(".woolly-mouse-banner__video .video-player").on("ended", function () {
    const wrapper = $(this).closest(".video-box");

    this.removeAttribute("controls");

    wrapper.removeClass("playing");
  });
  $(".woolly-mouse-banner__video .video-player").on("pause", function () {
    if (this.seeking) return;

    if (!this.ended) {
      $(this).closest(".video-box").removeClass("playing");
    }
  });
  // Play Video - End

  gsap.registerPlugin(ScrollTrigger);

  const header = document.querySelector("header.header");
  const section = document.querySelector(".phase-section");

  const cards = gsap.utils.toArray(".phase-card-wrapper");
  const navItems = gsap.utils.toArray(".phase-nav li");
  const nav = document.querySelector(".phase-nav");

  const phaseCounters = document.querySelectorAll(".current-phase");
  const phaseTotals = document.querySelectorAll(".phase-total");

  const totalPhases = cards.length;

  const badge = document.querySelector(".phase-status");
  const statusText = document.querySelector(".status-text");

  function formatNumber(number) {
    return String(number).padStart(2, "0");
  }

  function getHeaderHeight() {
    return header ? header.offsetHeight : 0;
  }

  function getTopbarOffset() {
    return getHeaderHeight() + 20;
  }

  function updateHeaderHeight() {
    document.documentElement.style.setProperty(
      "--header-height",
      `${getHeaderHeight()}px`,
    );
  }

  function updatePhaseTotal() {
    phaseTotals.forEach((item) => {
      item.textContent = formatNumber(totalPhases);
    });
  }

  function updateStatus(status) {
    badge.classList.remove("complete", "in-progress", "pending");
    badge.classList.add(status);

    switch (status) {
      case "complete":
        statusText.textContent = "COMPLETE";
        break;

      case "in-progress":
        statusText.textContent = "IN PROGRESS";
        break;

      case "pending":
        statusText.textContent = "PENDING";
        break;

      default:
        statusText.textContent = "";
    }
  }

  function updatePhase(index) {
    if (!cards[index]) {
      console.warn(`Card at index ${index} does not exist.`);
      return;
    }

    const phaseNumber = formatNumber(index + 1);

    phaseCounters.forEach((counter) => {
      counter.textContent = phaseNumber;
    });

    updateStatus(cards[index].dataset.status);

    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    if (navItems[index]) {
      navItems[index].classList.add("active");
    }

    if (!navItems.length) return;

    const styles = getComputedStyle(navItems[0]);
    const itemGap = parseFloat(styles.marginBottom) || 0;
    const itemHeight = navItems[0].offsetHeight + itemGap;

    gsap.to(nav, {
      y: -(index * itemHeight),
      duration: 0.6,
      ease: "power2.out",
      overwrite: true,
    });
  }

  updateHeaderHeight();
  updatePhaseTotal();

  ScrollTrigger.create({
    trigger: section,
    pin: ".phase-topbar",
    start: () => `top top+=${getTopbarOffset()}`,
    end: "bottom bottom",
    pinSpacing: false,
    invalidateOnRefresh: true,
  });

  ScrollTrigger.create({
    trigger: section,
    pin: ".phase-sidebar",
    start: () => `top top+=${getHeaderHeight() + 40}`,
    end: "bottom bottom",
    pinSpacing: false,
    invalidateOnRefresh: true,
  });

  cards.forEach((card, index) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top center",
      end: "bottom center",

      onEnter() {
        updatePhase(index);
      },

      onEnterBack() {
        updatePhase(index);
      },
    });
  });

  ScrollTrigger.addEventListener("refreshInit", updateHeaderHeight);

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      updateHeaderHeight();
      ScrollTrigger.refresh();
    }, 150);
  });

  updatePhase(0);

  ScrollTrigger.refresh();

  function updateCounter(swiper) {
    const container = swiper.el.closest(".swiper-wrapper-box");

    if (!container) return;

    const current = container.querySelector(".swiper-pagination-current");
    const total = container.querySelector(".swiper-pagination-total");

    if (current) {
      current.textContent = String(swiper.activeIndex + 1).padStart(2, "0");
    }

    if (total) {
      total.textContent = String(swiper.slides.length).padStart(2, "0");
    }
  }

  const mightiestMouseSlider = new Swiper(".mightiestmouse-slider", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".mightiestmouse-btn-next",
      prevEl: ".mightiestmouse-btn-prev",
    },
    on: {
      init(swiper) {
        updateCounter(swiper);
      },
      slideChange(swiper) {
        updateCounter(swiper);
      },
    },
  });

  const teamSwiper = new Swiper(".xh-team-swiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
      nextEl: ".xh-btn-next",
      prevEl: ".xh-btn-prev",
    },
    on: {
      init(swiper) {
        updateCounter(swiper);
      },
      slideChange(swiper) {
        updateCounter(swiper);
      },
    },
  });
  document.querySelectorAll(".xh-research .list .item").forEach(function (item) {
    item.addEventListener("click", function (e) {
      if (e.target.closest("[data-bs-toggle='collapse']")) return;

      const trigger = this.querySelector("[data-bs-toggle='collapse']");
      if (trigger) {
        trigger.click();
      }
    });
  });

  document.querySelectorAll(".xh-research .list .panel").forEach(function (panel) {
    const item = panel.previousElementSibling;

    panel.addEventListener("shown.bs.collapse", function () {
      item.classList.add("active");

      const trigger = item.querySelector("[data-bs-toggle='collapse']");
      if (trigger) {
        trigger.textContent = "[ CLOSE ]";
      }
    });

    panel.addEventListener("hidden.bs.collapse", function () {
      item.classList.remove("active");

      const trigger = item.querySelector("[data-bs-toggle='collapse']");
      if (trigger) {
        trigger.textContent = "[ EXPAND ]";
      }
    });
  });
});
