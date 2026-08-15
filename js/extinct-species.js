$(document).ready(function () {
  $(".endemic-species__item").click(function () {
    let id = $(this).data("id");

    $(".endemic-species__item").removeClass("active");
    $(this).addClass("active");

    $(".endemic-species__panel").removeClass("active");
    let $activePanel = $('.endemic-species__panel[data-id="' + id + '"]');
    $activePanel.addClass("active");

    $(".endemic-species__video").each(function () {
      this.pause();
      this.currentTime = 0;
    });

    let $video = $activePanel.find(".endemic-species__video");

    if ($video.length) {
      $video[0].play();
    }
  });
  ScrollTrigger.create({
    trigger: ".endemic-species__content",
    start: "top top",
    endTrigger: ".endemic-species-sec",
    end: "bottom bottom+=15%",
    pin: true,
  });
});
