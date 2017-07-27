import * as $ from 'jquery';

export class DomController {

    public static updateApp() {
    }


    public static updateContent() {
        const $this = this;
        $this.smallMenu();
        $this.sidebarPanel();
        $this.headerSearch();
        $this.quickLaunch();
        $this.scrollToTop();
        $this.smoothScroll();
        $this.activeState();
        $this.rippleEffect();
        $this.preloader();
        $this.apps();
    }

    public static updateReports() {
        const $this = this;
        $this.smallMenu();
        $this.sidebarPanel();
        $this.headerSearch();
        $this.quickLaunch();
        $this.scrollToTop();
        $this.smoothScroll();
        $this.activeState();
        $this.rippleEffect();
        $this.preloader();
        $this.apps();
    }

    public static updateTopNav() {
    }

    public static profileCardLoaded() {
        this.statusHover();
    }

    public static updateSideNav() {

    }

    public static updateLogin() {
    }

    public static updateRegister() {
    }

    private static containerHeight() {

    }

    public static scrollChatList() {
        $('.chat-scroll.scrollable').perfectScrollbar({
            wheelPropagation: true,
            suppressScrollX: true
        });
    }

    public static scrollChatContent() {
        $('.chat-conversation-content.scrollable').perfectScrollbar({
            wheelPropagation: true,
            suppressScrollX: true
        });
    }

    public static scrollChatContentBottom() {
        // $(".chat-conversation-content.scrollable").animate({ scrollTop: $(document).height() }, 1000);
        $(".chat-conversation-content.scrollable").animate({ scrollTop: 10000 }, 1000);
    }

    /* active state */
    private static activeState() {
        $('.toggle-active').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('active');
        });
    }

    /* Ripple efect */
    private static rippleEffect() {
        $('.ripple').on('click', function (e) {
            e.preventDefault();
            var $div = $('<div/>'),
                btnOffset = $(this).offset(),
                xPos = e.pageX - btnOffset.left,
                yPos = e.pageY - btnOffset.top;
            $div.addClass('ripple-effect');
            var $ripple = $('.ripple-effect');
            $ripple.css('height', $(this).height());
            $ripple.css('width', $(this).height());
            $div.css({
                top: yPos - $ripple.height() / 2,
                left: xPos - $ripple.width() / 2,
                background: $(this).data('ripple-color')
            }).appendTo($(this));
            window.setTimeout(function () {
                $div.remove();
            }, 1500);
        });
    }

    public static statusHover() {
        $('.profile-menu-a').hover(function() {
            $(this).parent().parent().find('.status').attr('aria-expanded', 'false');
            $(this).parent().parent().find('.status').parent().removeClass('open')
        }, function() {
            
        });
        $('.profile-menu .status').hover(function() {
            $(this).attr('aria-expanded', 'true');
            $(this).parent().addClass('open')
        }, function() {
            // $(this).attr('aria-expanded', 'false');
            // $(this).parent().removeClass('open');
        });
        $('.status-menu').hover(function() {
            $(this).prev().attr('aria-expanded', 'true');
            $(this).prev().parent().addClass('open')
        }, function() {
            
        });
    }

    /* Quick launch */
    private static quickLaunch() {
        $('[data-toggle=quick-launch]').on('click', function (e) {
            e.preventDefault();
            if ($('.quick-launch-apps').is(':visible')) {
                $('.quick-launch-apps').addClass('hide').next().removeClass('hide');
                $('.messages.card').show();
                $('.DashboardProfileCard').show();
            } else {
                $('.quick-launch-apps').removeClass('hide').next().addClass('hide');
                $('.messages.card').hide();
                $('.DashboardProfileCard').hide();
            }
        });
    }

    private static preloader() {
        $(window).on('load', function () {
            if ($('body > .pageload').length) {
                if ($('body').hasClass('page-loaded')) {
                    return;
                }
                $('body').addClass('page-loaded').removeClass('page-loading');
                $('body > .pageload').fadeOut();
            }
        });
    }

    private static scrollable() {
        $('..scrollable').perfectScrollbar({
            wheelPropagation: true,
            suppressScrollX: true
        });
    }

    private static apps() {
        const app = $('.app');
        $('.message-list .message-list-item a, .message-toolbar .icon-close').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            app.toggleClass('message-open');
        });
        $('.contacts-list li, .contact-toolbar .icon-close').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            app.toggleClass('contact-open');
        });
    }

    private static smallMenu() {
        const $this = this;
        const psTarg = $('.sidebar-panel');
        const app = $('.app');
        $('[data-toggle=layout-small-menu]').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            app.toggleClass('layout-small-menu');
            if (app.hasClass('layout-small-menu')) {
                $this.destroyScrollbars();
                if ($('.quick-launch-apps').is(':visible')) {
                    $('.quick-launch-apps').addClass('hide').next().removeClass('hide');
                }
            } else if (!psTarg.hasClass('ps-container')) {
                $this.initScrollbars();
            }
        });
    }
    private static destroyScrollbars() {
        const psTarg = $('.sidebar-panel');
        psTarg.perfectScrollbar('destroy').removeClass('ps-container ps-active-y ps-active-x');
    }

    private static initScrollbars() {
        const psTarg = $('.sidebar-panel');
        const app = $('.app');
        if (app.hasClass('layout-small-menu') || app.hasClass('layout-static-sidebar') || app.hasClass('layout-boxed')) {
            return;
        }
        psTarg.perfectScrollbar({
            wheelPropagation: true,
            suppressScrollX: true
        });
    }

    private static updateScrollbars() {
        const psTarg = $('.sidebar-panel');
        const app = $('.app');
        if (psTarg.hasClass('ps-container') && !app.hasClass('layout-small-menu')) {
            psTarg.perfectScrollbar('update');
        }
    }

    private static smartResize() {
        const $this = this;
        $(window).smartresize(function () {
            $this.updateScrollbars();
        });
    }

    private static sidebarPanel() {
        const $this = this;
        const app = $('.app');
        let offscreenDirectionClass;
        let rapidClickCheck = false;
        $('[data-toggle=offscreen]').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const offscreenDirection = $(this).data('move') ? $(this).data('move') : 'ltr';
            if (offscreenDirection === 'rtl') {
                offscreenDirectionClass = 'move-right';
            } else {
                offscreenDirectionClass = 'move-left';
            }
            if (rapidClickCheck) {
                return;
            }
            rapidClickCheck = true;
            $this.toggleMenu();
        });
        /* Sidebar sub-menus */
        $('.sidebar-panel nav a').on('click', function (e) {
            var $this = $(this),
                links = $this.parents('li'),
                parentLink = $this.closest('li'),
                otherLinks = $('.sidebar-panel nav li').not(links),
                subMenu = $this.next();
            if (!subMenu.hasClass('sub-menu')) {
                $this.toggleMenu();
                return;
            }
            if (app.hasClass('layout-small-menu') && parentLink.parent().hasClass('nav') && $(window).width() > 768) {
                return;
            }
            otherLinks.removeClass('open');
            if (subMenu.is('ul') && (subMenu.height() === 0)) {
                parentLink.addClass('open');
            } else if (subMenu.is('ul') && (subMenu.height() !== 0)) {
                parentLink.removeClass('open');
            }
            if ($this.attr('href') === '#') {
                e.preventDefault();
            }
            $this.updateScrollbars();
            if (subMenu.is('ul')) {
                return false;
            }
            e.stopPropagation();
            return true;
        });
        $('.sidebar-panel').find('> li > .sub-menu').each(function () {
            if ($(this).find('ul.sub-menu').length > 0) {
                $(this).addClass('multi-level');
            }
        });
        $('.sidebar-panel').find('.sub-menu').each(function () {
            $(this).parent('li').addClass('menu-accordion');
        });

    }

    private static toggleMenu() {
        const app = $('.app');;
        const $this = this;
        let isOffscreenOpen = false;
        let offscreenDirectionClass;
        if (isOffscreenOpen) {
            app.removeClass('move-left move-right');
            setTimeout(function () {
                app.removeClass('offscreen');
            }, 150);
        } else {
            app.addClass('offscreen ' + offscreenDirectionClass);
        }
        isOffscreenOpen = !isOffscreenOpen;
        $this.rapidClickFix();
    }

    private static rapidClickFix() {
        let rapidClickCheck = false;
        setTimeout(function () {
            rapidClickCheck = false;
        }, 150);
    }

    private static searchPredictToggle() {
        var val = $('.search-input').val();
        if (val.length > 0) {
            $('.search-predict').removeClass('hide');
        } else {
            $('.search-predict').addClass('hide');
        }
    }

    private static headerSearch() {
        const $this = this;
        let isSearchOpen = false;
        $('.search-input').focus(function () {
            $this.searchPredictToggle();
        });
        $('.search-input').keyup(function () {
            $this.searchPredictToggle();
        });
        $('.search-input').focusout(function () {
            $('.search-predict').addClass('hide');
        });
        $('[data-toggle=search]').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (isSearchOpen) {
                $('.main-panel > .header').removeClass('search-open');
                $('.search-form').addClass('hide');
                $('.search-close-icon').addClass('hide');
                $('.search-open-icon').removeClass('hide');
            } else {
                $('.main-panel > .header').addClass('search-open');
                $('.search-form').removeClass('hide').find('.search-input')[0].focus();
                $('.search-close-icon').removeClass('hide');
                $('.search-open-icon').addClass('hide');
            }
            isSearchOpen = !isSearchOpen;
        });
    }

    /* Scroll to top */
    private static scrollToTop() {
        $('.scroll-up').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('html,body').stop().animate({
                scrollTop: $('body').offset().top
            }, 1000);
            return false;
        });
    }

    /* Smooth scroll*/
    private static smoothScroll() {
        $('.smooth-scroll').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').stop().animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    }

}