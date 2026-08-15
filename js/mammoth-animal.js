jQuery(document).ready(function ($) {
  $(".marquee-custom").each(function () {
    const $track = $(this).find(".marquee-custom__track");
    const $content = $track.find(".marquee-custom__content").first();

    for (let i = 0; i < 3; i++) {
      $track.append($content.clone());
    }

    const contentWidth = $content.outerWidth(true);

    const speed = 50;

    const duration = contentWidth / speed;

    $track.css("animation-duration", duration + "s");
  });

  // Species Profile - Start
  const $species_profile_items = $("#partList li");
  const $species_profile_groups = $(".hotspot-group");
  const $species_profile_contents = $(".content-item");

  let currentIndex = 0;

  function activate(target) {
    const $group = $('.hotspot-group[data-target="' + target + '"]');

    if (!$group.length) return;

    $species_profile_items.removeClass("active");
    $species_profile_items
      .filter('[data-target="' + target + '"]')
      .addClass("active");

    $species_profile_groups.removeClass("active");
    $group.addClass("active");

    $species_profile_contents.removeClass("active");
    $("#" + target).addClass("active");

    currentIndex = $species_profile_items.index(
      $species_profile_items.filter('[data-target="' + target + '"]'),
    );
  }

  $species_profile_items.on("click", function () {
    activate($(this).data("target"));
  });

  $(".hotspot-ui").on("click", function () {
    const target = $(this).closest(".hotspot-group").data("target");
    activate(target);
  });

  $(".species-profile-nav #nextBtn").on("click", function () {
    let next = currentIndex + 1;
    if (next >= $species_profile_items.length) next = 0;
    activate($species_profile_items.eq(next).data("target"));
  });

  $(".species-profile-nav  #prevBtn").on("click", function () {
    let prev = currentIndex - 1;
    if (prev < 0) prev = $species_profile_items.length - 1;
    activate($species_profile_items.eq(prev).data("target"));
  });

  activate("part-1");
  // Species Profile - End

  // Fun Facts Mammoth - Start
  const mammothSwipers = [];

  $(".funfact-mammoth-swiper").each(function (index) {
    const $this = $(this);

    const swiper = new Swiper(this, {
      navigation: {
        nextEl: $this.find(".funfact-mammoth-next")[0],
        prevEl: $this.find(".funfact-mammoth-prev")[0],
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });

    mammothSwipers.push(swiper);
  });

  $(".funfact-tab-item").on("click", function () {
    const $this = $(this);
    const target = $this.data("mammoth");

    $(".funfact-tab-item").removeClass("is-active");
    $this.addClass("is-active");

    $(".funfact-pane").removeClass("is-active");
    $("#" + target).addClass("is-active");

    const index = $this.index();
    if (mammothSwipers[index]) {
      mammothSwipers[index].slideTo(0);
    }
  });
  // Fun Facts Mammoth - End
});
