$(function () {


    $("body").on("click", "#burger", (event) => {
        let me = event.currentTarget;
        if ($(window).width() <= 992) {
            $(me).parents(".header").toggleClass("active");
            $("body").toggleClass("overflow-hid");
            $("#subMenu").fadeToggle(500);
        }

    });


    $("body").on("click", ".subMenu_content a", (event) => {
        let me = event.currentTarget;
        $(me).parents(".header").removeClass("active");
    });

    /* GoTop btn */
    $("body").on("click", "#goTop", (e) => {
        $("html,body").animate({ scrollTop: 0 }, "slow");
        return false;
    });





    function urljump(event) {
        /* 錨點轉跳 */
        var url = window.location.toString(),
            id = url.split('#')[1];

        const pagestabHeight = $(".pages_tab").outerHeight(),
            mergeTabHeader = ($(window).width() <= 768) ? pagestabHeight + 80 : 80,
            marginTop = ($(window).width() >= 992) ? 10 :
                (768 < $(window).width() && $(window).width() < 992) ? 20 :
                    parseInt($(".p_Info").css("marginTop"));


        if (id) {
            var t = $('#' + id).offset().top - marginTop - mergeTabHeader;
            $(window).scrollTop(t);
        }
    };

    urljump();

    $("body").on("click", ".navMenu a, .subMenu_content a", (event) => {

        let me = event.currentTarget;

        const hrefLink = $(me).attr("href"),
            getHash = window.location.hash,
            checkSplit = hrefLink.split("#"),
            setId = checkSplit.pop();


        if (checkSplit.length > 0 && getHash) {
            event.preventDefault();
            $("body .pages_tab a[href='#" + setId + "']").click();
        } else {
            return true;
        }
    });

    const headerHeight = $(".header").outerHeight();





    $(window).scroll(function () {

        $("#goTop").css(
            "opacity",
            $(this).scrollTop() > 400 ? 1 : 0
        );

        if ($('.pages_banner_bg').length <= 0 || $('.pages_tab_box').length <= 0) return;


        const pagesTab = $('.pages_tab_box').offset().top;

        if ($(window).width() <= 1120 && $(this).scrollTop() + headerHeight > pagesTab) {
            $(".pages_tab").addClass("box_shadow_show");
            $(".contralBodyTop").css("margin-top", 135);
        } else {
            $(".pages_tab").removeClass("box_shadow_show");
            $(".contralBodyTop").css("margin-top", 0);
        }
    });


    /* banner輪播 */
    $("#banner").flexslider({
        slideshowSpeed: 4000,
        animation: "silde",
        animationSpeed: 700,
        touch: true,
        prevText: "",
        nextText: "",
        slideshow: true,  //自動輪播
        pauseOnHover: true,
        pauseOnAction: true
    });


    /* recruit banner輪播 */
    $("#recruit-banner").flexslider({
        slideshowSpeed: 4000,
        animation: "silde",
        animationSpeed: 700,
        touch: true,
        prevText: "",
        nextText: "",
        slideshow: true,
        itemMargin: 0,
        maxItems: 1,
        slideToStart: 2,
        pauseOnHover: true,
        pauseOnAction: true
    });

    // lightBox 設定
    lightbox.option({
        'disableScrolling': true,
        'wrapAround': true,
        'imageFadeDuration': 0,
        'resizeDuration': 300,
        'albumLabel': "%1 / %2",
        'alwaysShowNavOnTouchDevices': true
    });



    $("body").on("click", ".pages_tab_box a", (e) => {
        e.preventDefault();

        let me = e.currentTarget;

        const hrefLink = $(me).attr("href"),
            tab = $(".pages_tab_box"),
            setSilbings = tab.find("a"),
            tabsHeight = tab.find(".pages_tab").outerHeight(),
            mobileTab = tab.find(".pages_tab"),
            // headerHeight = $(".header").outerHeight(),
            mergeTabAngHeaderHeight = ($(window).width() <= 1120) ? tabsHeight + headerHeight : headerHeight,
            marginTop = ($(window).width() >= 1120) ? 20 :
                (768 < $(window).width() && $(window).width() < 1120) ? 40 : parseInt($(hrefLink).css("marginTop")),
            hasActive = $(me).hasClass("active");

        if (!hasActive) {

            setSilbings.removeClass("active");

            $(me)
                .addClass(() => {

                    $('html, body').animate({
                        scrollTop: $(hrefLink).offset().top - marginTop - mergeTabAngHeaderHeight
                    }, 1000);
                    return 'active';
                });

        }
        // if ($(window).width() < 1120) {
        //     $(mobileTab).animate({
        //         scrollLeft: $(me).offset().left - 100
        //     }, 1000);
        // }
    });


    console.clear()

    var rtime,
        timeout = false,
        delta = 200,
        ta = $(".p_content > .p_Info"),
        taPosition = [],
        scrollPosition = 0;

    var handelTargetPosition = function () {
        ta.each(function () {
            var me = $(this);

            taPosition.push({
                "id": $(this).attr("id"),
                "top": $(this).position().top + $(me).height(),
                "box_height": $(me).height(),
                "box_top": $(this).position().top
            });
        })

    }



    var handelCheckTaIsOverScroll = function () {

        if ($('.pages_tab_box').length <= 0) return;

        var getTaId = taPosition.filter(res => {

            if (
                res.top >= scrollPosition &&
                scrollPosition <= res.top
            ) {

                $(".pages_tab_box ul a").removeClass("active");
                return res;
            }
        });
        const getTaIndex = $("#" + getTaId[0].id).index() + 1,
            mobileTab = $(".pages_tab_box .pages_tab"),
            getActiveTabPosition = $(".pages_tab_box ul li:nth-child(" + getTaIndex + ") a").offset().left;


        $(
            ".pages_tab_box ul li:nth-child(" + getTaIndex + ") a"
        ).addClass("active");


        // console.log('初始tab水平位置', $(".pages_tab_box ul li:nth-child(" + getTaIndex + ") a").offset().left, '選取物件', getActiveTabPosition,$(".pages_tab_box ul li:nth-child(" + getTaIndex + ") a"));

        if ($(window).width() <= 1120) {
            $(mobileTab).animate({
                scrollLeft: getActiveTabPosition
            }, 300);
        }

        scrollPosition = ($(window).width() >= 1120) ? $(window).scrollTop() : $(window).scrollTop() + parseInt($("#" + getTaId[0].id).css("marginTop"));
    }


    $(window).scroll(function () {
        const horizontalScrollBar = $(".pages_tab").scrollLeft();
        // console.log('水平滾動', horizontalScrollBar);
        handelCheckTaIsOverScroll();
    })

    function horizontal(){
        const mobileTab = $(".pages_tab_box").find(".pages_tab a");
        console.log('active',$(mobileTab).hasClass('active'),mobileTab);
    }
    horizontal()
    handelTargetPosition();
    handelCheckTaIsOverScroll();


    $(window).resize(function () {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta);
        }
    });

    function resizeend() {
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);

        } else {
            console.clear()

            timeout = false;
            handelTargetPosition();
            handelCheckTaIsOverScroll();

        }
    }






})




