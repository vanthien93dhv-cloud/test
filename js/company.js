jQuery(function ($) {
  $(".click-play").on("click", function (e) {
    e.preventDefault();

    var $video = $(this).siblings("video");
    var video = $video.get(0);

    $video.attr("controls", true);
    video.play();

    $(this).hide();
  });

  const unlimitedSwiper = new Swiper(".ht-unlimited-slider", {
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: true,
    navigation: {
      nextEl: ".ht-unlimited-next",
      prevEl: ".ht-unlimited-prev",
    },
  });
});
