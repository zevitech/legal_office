jQuery(document).ready(function($) {
  switchDiv();

  $("li:first-child").addClass("first");
  $("li:last-child").addClass("last");

  $('[href="#"]').attr("href", "javascript:;");

  $(".menu-Bar").click(function () {
    $(this).toggleClass("open");
    $(".menuWrap").toggleClass("open");
    $("body").toggleClass("ovr-hiddn");
  });

  $(".loginUp").click(function () {
    $(".LoginPopup").fadeIn();
    $(".overlay").fadeIn();
  });

  $(".signUp").click(function () {
    $(".signUpPop").fadeIn();
    $(".overlay").fadeIn();
  });

  $(".closePop,.overlay").click(function () {
    $(".popupMain").fadeOut();
    $(".overlay").fadeOut();
  });

    $(".popBtn").click(function() {
        $(".popuptm").fadeIn();
        $(".black-layout").fadeToggle();
    });

    $(".closePop,.black-layout").click(function() {
        $(".popupform").fadeOut();
        $(".black-layout").fadeToggle();
    });
    
    $('.sec3 .packBtn').on('click', function() {
        $(".black-layout").fadeToggle();
        $('.popupPack').fadeIn();
        var packtitle = $(this).closest('.col-md-4, .col-md-6').find(".boxed-wrap h4").html();
        var packprice = $(this).closest('.col-md-4, .col-md-6').find(".boxed-wrap h3").html();
        //var thisrel = $(this).attr('rel');
       // $('#popupform input#popuppackage').val(thisrel);
       //alert(packtitle);
        $(".popup-content .titles").html(packtitle);
        $(".popup-content .pricetitle").html("In Just <span>" + packprice + "</span>");
    });
    

  $(".menu .menu-item-has-children").addClass("dropdown-nav ");
  $(".menu .menu-item-has-children ul.sub-menu").addClass("dropdown");

  /* Tabbing Function */
  $("[data-targetit]").on("click", function (e) {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    var target = $(this).data("targetit");
    $("." + target)
      .siblings('[class^="box-"]')
      .hide();
    $("." + target).fadeIn();
    $(".tabViewList").slick("setPosition", 0);
  });

  // Accordian
  $(".acc_title").on("click", function () {
    $(this).parents().find("li").removeClass("active");
    $(this).parents().find(".acc_desc").slideUp();
    $(this).parent("li").addClass("active");
    !$(this).next(".acc_desc").is(":visible")
      ? $(this).next(".acc_desc").slideDown()
      : $(this).parents().find("li").removeClass("active");
  });

  // Accordian
  $(".accordian h4").click(function () {
    $(".accordian li").removeClass("active");
    $(this).parent("li").addClass("active");
    $(".accordian li div").slideUp();
    $(this).parent("li").find("div").slideDown();
  });

  $("li.dropdown-nav").hover(function () {
    $(this).children("ul").stop(true, false, true).slideToggle(300);
  });

  $(".searchBtn").click(function () {
    $(".searchWrap").addClass("active");
    $(".overlay").fadeIn("active");
    $(".searchWrap input").focus();
    $(".searchWrap input").focusout(function (e) {
      $(this).parents().removeClass("active");
      $(".overlay").fadeOut("active");
      $("body").removeClass("ovr-hiddn");
    });
  });

  // $(".index-slider").slick({
  //   dots: false,
  //   infinite: true,
  //   speed: 300,
  //   slidesToShow: 1,
  //   // prevArrow: $('.prev'),
  //   // nextArrow: $('.next')
  // });

  //     Slider For
  // $('.slider-for').slick({
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     dots: false,
  //     arrows: false,
  //     fade: true,
  //     asNavFor: '.slider-nav'
  // });
  // $('.slider-nav').slick({
  //     slidesToShow: 4,
  //     slidesToScroll: 1,
  //     asNavFor: '.slider-for',
  //     dots: false,
  //     focusOnSelect: true
  // });

  /* Top Scroll */
  // $('body').on('click', '.scrolldown-fl', function() {
  //     goToScroll('awardSec');
  // });
});

// $(window).on("scroll touchmove", function() {
//     $("header").toggleClass("stickyOpen", $(document).scrollTop() > 200);
// });


jQuery(window).on("load", function () {
  var currentUrl = window.location.href.substr(
    window.location.href.lastIndexOf("/") + 1
  );
  jQuery("ul.menu li a").each(function () {
    var hrefVal = $(this).attr("href");
    if (hrefVal == currentUrl) {
      $(this).removeClass("active");
      $(this).closest("li").addClass("active");
      $("ul.menu li.first").removeClass("active");
    }
  });
});

/* RESPONSIVE JS */


if (jQuery(window).width() < 824) {
}

function switchDiv() {
  var $window = jQuery(window).outerWidth();
  if ($window <= 768) {
    jQuery(".topAppendTxt").each(function () {
      var getdtd = jQuery(this).find(".cloneDiv").clone(true);
      jQuery(this).find(".cloneDiv").remove();
      jQuery(this).append(getdtd);
    });
  }
}

function goToScroll(e) {
  jQuery("html, body").animate(
    {
      scrollTop: jQuery("." + e).offset().top,
    },
    1000
  );
}

