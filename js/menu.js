
$(document).ready(function () {

    $(document).on('click', '.header-menu ul li a', function (e) {
        e.preventDefault();
        return false;
    });

    $(document).on('mouseenter', '.header-menu ul li a', function () {

        $('.header-menu ul li a').removeClass('active');
        $(this).addClass('active');

        $('.sub-menu').removeClass('active');

        var target = $(this).data('target');
        var $target = $(target);

        $('.sub-menu-wrapper').removeClass('active');
        $target.addClass('active');

        var targetHeight = $target.outerHeight(true);
        $('.sub-menu-wrapper')
            .css('height', targetHeight)
            .addClass('active');

    });


    $(document).on('mouseleave', '.header', function () {
        $('.header-menu ul li a').removeClass('active');
        $('.sub-menu-wrapper').removeClass('active').css('height', '');
        $('.sub-menu').removeClass('active');
    });


    // $(document).on('mouseenter', '.sub-menu ul:not(\'index-control\') li a', function () {
    //     var $submenu = $(this).closest('.sub-menu');
    //     $submenu.find('ul li a').removeClass('active').addClass('inactive');
    //     $(this).addClass('active').removeClass('inactive');
    // });


    $(document).on('mouseenter', '.index-control a', function () {
        $('.index-menu').removeClass('active');
        $('.index-video').removeClass('active');

        var target = $(this).data('target');

        var $submenu = $(this).closest('.sub-menu');
        $submenu.find('ul li a').removeClass('active').addClass('inactive');
        $(this).addClass('active').removeClass('inactive');


        console.log('target:', target);
        if (target) {
            $(target).addClass('active');
        }
    });






    // Temporary show for debugging 
    // $('#menu-species').addClass('active');
    // $('.sub-menu-wrapper').addClass('active').css('height', $('#menu-species').outerHeight(true));

});