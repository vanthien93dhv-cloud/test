jQuery(document).ready(function ($) {
  const $advisoryTeam = $(".advisory-team");
  const $advisoryNext = $(".advisory-next");
  const $advisoryPrev = $(".advisory-prev");

  const $currentAdvisory = $(".advisory-counter .current");
  const $totalElAdvisory = $(".advisory-counter .total");

  const totalAdvisoryTeam = $advisoryTeam.length;
  $totalElAdvisory.text(String(totalAdvisoryTeam).padStart(2, "0"));

  const centerPosAdvisory = Math.ceil(totalAdvisoryTeam / 2);

  let currentPos = centerPosAdvisory;

  const positionMap = {};

  $advisoryTeam.each(function () {
    const $el = $(this);
    const pos = parseInt($el.data("pos"));

    positionMap[pos] = {
      x: parseFloat($el.data("x")),
      y: parseFloat($el.data("y")),
    };
  });

  const contentPositionMap = {};

  $advisoryTeam.each(function () {
    const $el = $(this);
    const pos = parseInt($el.data("pos"));
    const $content = $el.find(".advisory-team__content");

    if ($content.length) {
      contentPositionMap[pos] = {
        x: parseFloat($content.data("x")),
        y: parseFloat($content.data("y")),
      };
    }
  });

  function updateCarousel() {
    const half = Math.floor(totalAdvisoryTeam / 2);

    $advisoryTeam.each(function () {
      const $el = $(this);
      const itemPos = parseInt($el.data("pos"));

      let offset = itemPos - currentPos;

      if (offset < -half) offset += totalAdvisoryTeam;
      if (offset > half) offset -= totalAdvisoryTeam;

      let posIndex = offset + centerPosAdvisory;

      if (posIndex < 1) posIndex += totalAdvisoryTeam;
      if (posIndex > totalAdvisoryTeam) posIndex -= totalAdvisoryTeam;

      const pos = positionMap[posIndex];

      if (pos) {
        $el.css({
          left: pos.x + "%",
          top: pos.y + "%",
        });
      }

      const distance = Math.abs(offset);
      $el.css("z-index", totalAdvisoryTeam - distance);

      $el.removeClass("left right active");

      if (posIndex === centerPosAdvisory) {
        $el.addClass("active");
      } else if (posIndex < centerPosAdvisory) {
        $el.addClass("left");
      } else {
        $el.addClass("right");
      }

      const $content = $el.find(".advisory-team__content");

      if ($content.length) {
        const contentPos = contentPositionMap[posIndex];

        if (contentPos) {
          $content.css({
            left: contentPos.x + "%",
            top: contentPos.y + "%",
          });
        }

        $content.css(
          "transform",
          posIndex === centerPosAdvisory ? "translateX(-50%)" : "none",
        );
      }
    });

    $currentAdvisory.text(String(currentPos).padStart(2, "0"));
  }

  $advisoryNext.on("click", function () {
    currentPos++;
    if (currentPos > totalAdvisoryTeam) currentPos = 1;
    updateCarousel();
  });

  $advisoryPrev.on("click", function () {
    currentPos--;
    if (currentPos < 1) currentPos = totalAdvisoryTeam;
    updateCarousel();
  });

  $advisoryTeam.on("click", function () {
    currentPos = parseInt($(this).data("pos"));
    updateCarousel();
  });

  updateCarousel();
});
