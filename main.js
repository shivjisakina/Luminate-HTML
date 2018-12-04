(function() {

    /* Configure URLs for Ajax Requests, or Page URLs to JSON API */
    var Routes = {
        getAddress: '/get-address'
    };

    /* expose as global variable */
    window.Routes = Routes;


})();

(function() {



})();

(function() {

// order matters: for the same url, put more specific request matchers first
    var mockResponses = [

        {
            url: Routes.getAddress,
            type: "GET",
            data: {
                state: "MO"
            },
            proxy: 'assets/json/success-response.json'
        },

        {
            url: Routes.getAddress,
            status: 404
        }];

    var defaults = {
        responseTime: 200,
        status: 200
    };

    function initMockResponse(i, mockConfig) {
        var config = $.extend({}, defaults, mockConfig);

        $.mockjax(config);
    }

    $.each(mockResponses, initMockResponse);


})();

(function() {



})();

(function() {

    var Accordion = (function() {
        var $accordions = $('[data-toggler]');


        // find target accordion, reveal it
        var doClickThing = function(target) {
            var $target = target;

            $target.siblings('[data-toggler-content]')
                .removeClass('js-active')
                .slideUp(300)
                .end()
                .prev('[data-toggler-title]')
                .siblings('[data-toggler-title]')
                .removeClass('js-active')
                .end().end()
                .prev('[data-toggler-title]')
                .toggleClass('js-active')
                .end()
                .toggleClass('js-active')
                .slideToggle(300);
        }

        var init = function() {

            $.each($accordions, function(i, el){
                var $hashTarget = $(el).find('[data-toggler-content]:target');

                if ($hashTarget.length) {
                    doClickThing($hashTarget);
                } else {
                    if ($(el).hasClass('o-stepper') || $(el).hasClass('o-switch')) {
                        var target = $(el).children().first().next();
                        doClickThing(target);
                        console.log('switch or stepper');
                    }
                }
            });

            $accordions.find('[data-toggler-title] a').click(function(e){
                if ($(this).parent('[data-toggler-title]').hasClass('js-active')) {
                    e.preventDefault();
                }
                var $target = $(this).parent('[data-toggler-title]').next('[data-toggler-content]');
                doClickThing($target);
            });
        }

        return {
            init: init
        };
    })();

    $(document).ready(function(){
        Accordion.init();
    });


})();

(function() {



})();

(function() {

    var Header = (function() {

        var isShowing = false;

        // This event fires immediately when the show instance method is called.
        var onNavbarShow = function(){
            isShowing = true;
            $('html, main').addClass('menu-open');
            $('.navbar-collapse').not(this).collapse('hide');
        }

        // This event is fired when a collapse element has been made visible
        // to the user (will wait for CSS transitions to complete).
        var onNavbarShown = function(){
            isShowing = false;
            // $('html, main').addClass('menu-open');
        }

        // This event is fired immediately when the hide method has been called.
        var onNavbarHide = function(){
            if (!isShowing) {
                $('html, main').removeClass('menu-open');
            }
        }

        var init = function() {
            $('.navbar-collapse').on('show.bs.collapse', onNavbarShow);
            $('.navbar-collapse').on('shown.bs.collapse', onNavbarShown);
            $('.navbar-collapse').on('hide.bs.collapse', onNavbarHide);
        }

        return {
            init: init
        };
    })();

    $(document).ready(function(){
        Header.init();
    });


})();

(function() {


// require('Footer');
// require('bootstrap-datepicker.min');

})();

(function() {

// Enable form submission if invalid by default (will still validate)
    $.fn.validator.Constructor.DEFAULTS.disable = false;

// Example of custom validator
// usage: <input type="text" data-equals="foo">
    $.fn.validator.Constructor.DEFAULTS.custom.equals = function($el) {
        var matchValue = $el.data("equals") // foo
        if ($el.val() !== matchValue) {
            return "Hey, that's not valid! It's gotta be " + matchValue
        }
    }

// Initiate form validation for all forms


})();

(function() {



})();

(function() {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })


})();

(function() {



})();

(function() {

    $(function () {
        $('[data-toggle="popover"]').popover({
            html: true
        })
    })


})();

(function() {



})();

(function() {

    $(document).ready(function() {
        $('[data-toggle="password"]').on("mousedown", function(e) {

            var $toggle  = $(this),
                showText = $toggle.data('show'),
                hideText = $toggle.data('hide'),
                $input   = $toggle.siblings('input'),
                value    = $input.val();

            if ($toggle.text() == showText) {
                $toggle.text(hideText);
                $input.prop('type', 'text');
            } else {
                $toggle.text(showText);
                $input.prop('type', 'password');
            }

            setTimeout(function(){ $input.focus().val('').val(value); }, 200);
        });
    });


})();

(function() {



})();

(function() {

    /* ========================================================================
     * Bootstrap: spinner.js v3.1.1
     * http://github.com/indigojs
     * ========================================================================
     * Copyright 2014 MÃ¡rk SÃ¡gi-KazÃ¡r
     * Licensed under MIT (https://github.com/indigojs/bootstrap-spinner/blob/master/LICENSE)
     * ======================================================================== */

    +function ($) {
        'use strict';

        // SPINNER CLASS DEFINITION
        // =========================

        var Spinner = function (element, options) {
            var $this = this;
            this.$element = $(element)
            this.options  = $.extend({}, Spinner.DEFAULTS, this.$element.data(), options)

            // Check for insane values
            var value = new Number(this.$element.val())
            if (isNaN(value)) this.$element.val(this.options.min)

            // Strict check entered value
            if (this.options.strict == true) {
                this.$element.on('keypress', function (e) {
                    var prevent = false

                    if (e.which == 45 || e.keyCode == 40) {
                        $this.decrease()
                        return false
                    } else if (e.which == 43 || e.keyCode == 38) {
                        $this.increase()
                        return false
                    }

                    // Allow: backspace, delete, tab, escape, enter, home, end, left, right
                    // Allow: Ctrl+A
                    // Allow: home, end, left, right
                    // Allow . if precision is gt 0
                    if ($.inArray(e.keyCode, [8, 46, 9, 27, 13, 36, 35, 37, 39]) !== -1 ||
                        (e.which == 65 && e.ctrlKey === true) ||
                        ($this.options.precision > 0 && $this.$element.val().indexOf('.') == -1 && e.which == 46)) {
                        return
                    }

                    // Ensure that it is a number and stop the keypress
                    if (e.which < 48 || e.which > 57) return false
                });

                // Validate after focus lost
                this.$element.on('blur', function (e) {
                    $this.change($this.$element.val())
                })
            }
        }

        Spinner.DEFAULTS = {
            step: 1,
            min: 0,
            max: Infinity,
            precision: 0,
            strict: true
        }

        Spinner.prototype.increase = function() {
            this.step(this.options.step)
        }

        Spinner.prototype.decrease = function() {
            this.step(-this.options.step)
        }

        Spinner.prototype.step = function (value) {
            if (typeof value !== 'number') value = new Number(value)
            if (isNaN(value)) return

            var current = new Number(this.$element.val())
            if (isNaN(current)) current = this.options.min

            this.change(current + value)
        }

        Spinner.prototype.change = function(value) {
            if (typeof value !== 'number') value = new Number(value)
            if (isNaN(value)) value = this.options.min

            if (value <= this.options.min) {
                value = this.options.min;
                this.$element.prev('.btn').prop('disabled', true);
            } else {
                this.$element.prev('.btn').prop('disabled', false);
            }

            if (value >= this.options.max) {
                value = this.options.max;
                this.$element.next('.btn').prop('disabled', true);
            } else {
                this.$element.next('.btn').prop('disabled', false);
            }

            var e = $.Event('change.bs.spinner', { value: value })
            this.$element.trigger(e)

            e = $.Event('changed.bs.spinner')

            this.$element.val(value.toFixed(this.options.precision)).change().trigger(e)
        }

        Spinner.prototype.setOptions = function(options) {
            if (typeof options == 'object') this.options = $.extend({}, this.options, options)
        }

        // SPINNER PLUGIN DEFINITION
        // =========================

        var old = $.fn.spinner

        $.fn.spinner = function (option, arg) {
            return this.each(function () {
                var $this   = $(this)
                var data    = $this.data('bs.spinner')
                var isNew   = (typeof data == 'object')
                var options = typeof option == 'object' && option

                if (!data) $this.data('bs.spinner', (data = new Spinner(this, options)))

                if (typeof option == 'object' && isNew == false) data.setOptions(option)
                else if (typeof option == 'number') data.step(option)
                else if (typeof option == 'string') data[option](arg)
            })
        }

        $.fn.spinner.Constructor = Spinner

        // SPINNER NO CONFLICT
        // ===================

        var trigger = function (event) {
            var $this   = $(this)
            var href    = $this.attr('href')
            var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
            var value   = $this.data('value')

            if ($this.is('a')) event.preventDefault()

            $target.spinner(value)
        }

        $.fn.spinner.noConflict = function () {
            $.fn.spinner = old
            return this
        }

        // SPINNER DATA-API
        // ================

        $(document)
            .on('click.bs.spinner.data-api', '[data-toggle="spinner"][data-on!="mousehold"]', trigger)
            .on('mousehold.bs.spinner.data-api', '[data-toggle="spinner"]', trigger)

        $(window).on('load', function () {
            $('[data-ride="spinner"]').each(function () {
                $(this).spinner()
            })
        })

    }(jQuery);


})();

(function() {



})();

(function() {

    $('.js-show-code-snippet').on('click', function() {
        $(this).parent().next().removeClass('u-hidden');
        $(this).addClass('u-hidden').next().removeClass('u-hidden');
    });

    $('.js-hide-code-snippet').on('click', function() {
        $(this).parent().next().addClass('u-hidden');
        $(this).addClass('u-hidden').prev().removeClass('u-hidden');
    });

    $('.rendered-component').each(function() {
        var a = $(this).html();
        var b = $(this).siblings('.js-code-snippet').find('code');
        $(b).text(a);
        // $(this).remove();
    });

    new ClipboardJS('.btn-clipboard', {
//    text: function(trigger) {
//        return trigger.parentElement.nextElementSibling.innerText.toLowerCase();
//    }
        target: function(trigger) {
            return trigger.parentElement.nextElementSibling;
        }
    });

//prism normalize whitespace plugin
    (function() {

        if (typeof self === 'undefined' || !self.Prism || !self.document) {
            return;
        }

        var assign = Object.assign || function (obj1, obj2) {
            for (var name in obj2) {
                if (obj2.hasOwnProperty(name))
                    obj1[name] = obj2[name];
            }
            return obj1;
        }

        function NormalizeWhitespace(defaults) {
            this.defaults = assign({}, defaults);
        }

        function toCamelCase(value) {
            return value.replace(/-(\w)/g, function(match, firstChar) {
                return firstChar.toUpperCase();
            });
        }

        function tabLen(str) {
            var res = 0;
            for (var i = 0; i < str.length; ++i) {
                if (str.charCodeAt(i) == '\t'.charCodeAt(0))
                    res += 3;
            }
            return str.length + res;
        }

        NormalizeWhitespace.prototype = {
            setDefaults: function (defaults) {
                this.defaults = assign(this.defaults, defaults);
            },
            normalize: function (input, settings) {
                settings = assign(this.defaults, settings);

                for (var name in settings) {
                    var methodName = toCamelCase(name);
                    if (name !== "normalize" && methodName !== 'setDefaults' &&
                        settings[name] && this[methodName]) {
                        input = this[methodName].call(this, input, settings[name]);
                    }
                }

                return input;
            },

            /*
             * Normalization methods
             */
            leftTrim: function (input) {
                return input.replace(/^\s+/, '');
            },
            rightTrim: function (input) {
                return input.replace(/\s+$/, '');
            },
            tabsToSpaces: function (input, spaces) {
                spaces = spaces|0 || 4;
                return input.replace(/\t/g, new Array(++spaces).join(' '));
            },
            spacesToTabs: function (input, spaces) {
                spaces = spaces|0 || 4;
                return input.replace(new RegExp(' {' + spaces + '}', 'g'), '\t');
            },
            removeTrailing: function (input) {
                return input.replace(/\s*?$/gm, '');
            },
            // Support for deprecated plugin remove-initial-line-feed
            removeInitialLineFeed: function (input) {
                return input.replace(/^(?:\r?\n|\r)/, '');
            },
            removeIndent: function (input) {
                var indents = input.match(/^[^\S\n\r]*(?=\S)/gm);

                if (!indents || !indents[0].length)
                    return input;

                indents.sort(function(a, b){return a.length - b.length; });

                if (!indents[0].length)
                    return input;

                return input.replace(new RegExp('^' + indents[0], 'gm'), '');
            },
            indent: function (input, tabs) {
                return input.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++tabs).join('\t') + '$&');
            },
            breakLines: function (input, characters) {
                characters = (characters === true) ? 80 : characters|0 || 80;

                var lines = input.split('\n');
                for (var i = 0; i < lines.length; ++i) {
                    if (tabLen(lines[i]) <= characters)
                        continue;

                    var line = lines[i].split(/(\s+)/g),
                        len = 0;

                    for (var j = 0; j < line.length; ++j) {
                        var tl = tabLen(line[j]);
                        len += tl;
                        if (len > characters) {
                            line[j] = '\n' + line[j];
                            len = tl;
                        }
                    }
                    lines[i] = line.join('');
                }
                return lines.join('\n');
            }
        };

        Prism.plugins.NormalizeWhitespace = new NormalizeWhitespace({
            'remove-trailing': true,
            'remove-indent': true,
            'left-trim': true,
            'right-trim': true,
            /*'break-lines': 80,
            'indent': 2,
            'remove-initial-line-feed': false,
            'tabs-to-spaces': 4,
            'spaces-to-tabs': 4*/
        });

        Prism.hooks.add('before-highlight', function (env) {
            var pre = env.element.parentNode;
            if (!env.code || !pre || pre.nodeName.toLowerCase() !== 'pre' ||
                (env.settings && env.settings['whitespace-normalization'] === false))
                return;

            var children = pre.childNodes,
                before = '',
                after = '',
                codeFound = false,
                Normalizer = Prism.plugins.NormalizeWhitespace;

            // Move surrounding whitespace from the <pre> tag into the <code> tag
            for (var i = 0; i < children.length; ++i) {
                var node = children[i];

                if (node == env.element) {
                    codeFound = true;
                } else if (node.nodeName === "#text") {
                    if (codeFound) {
                        after += node.nodeValue;
                    } else {
                        before += node.nodeValue;
                    }

                    pre.removeChild(node);
                    --i;
                }
            }

            if (!env.element.children.length || !Prism.plugins.KeepMarkup) {
                env.code = before + env.code + after;
                env.code = Normalizer.normalize(env.code, env.settings);
            } else {
                // Preserve markup for keep-markup plugin
                var html = before + env.element.innerHTML + after;
                env.element.innerHTML = Normalizer.normalize(html, env.settings);
                env.code = env.element.textContent;
            }
        });

    }());

//prism normalize whitespace config
    Prism.plugins.NormalizeWhitespace.setDefaults({
        'remove-trailing': true,
        'remove-indent': true,
        'left-trim': true,
        'right-trim': true,
        'break-lines': 0,
        'indent': 0,
        'remove-initial-line-feed': true,
        'tabs-to-spaces': 0,
        'spaces-to-tabs': 0
    })


})();

(function() {



})();

(function() {

    var PromoCarousels = (function() {

        var optionsDefault = {
            dots: true,
            arrows: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            accessibility: false,
            prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><svg viewBox="0 0 24 24"><polyline points="10.5 4.5 17.66 11.99 10.5 19.5"/></svg></button>',
            nextArrow: '<button type="button" class="slick-next" aria-label="Next"><svg viewBox="0 0 24 24"><polyline points="10.5 4.5 17.66 11.99 10.5 19.5"/></svg></button>'
        };

        var init = function() {

            var $promoCarousels = $('.c-promo-carousel');

            $promoCarousels.each(function(i, carousel) {
                $(carousel).slick(optionsDefault);
                $(carousel).on('setPosition', function () {
                    $(this).find('.slick-slide').height('auto');
                    var slickTrack = $(this).find('.slick-track');
                    var slickTrackHeight = $(slickTrack).height();
                    $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
                });
            });

        }

        return {
            init: init
        };
    })();

    $(document).ready(function(){
        PromoCarousels.init();
    });


})();

(function() {



})();

(function() {

    var Utility = (function() {

        var equalHeight = function(container) {

            var currentTallest = 0,
                currentRowStart = 0,
                rowDivs = new Array(),
                $el,
                topPosition = 0;

            $(container).each(function() {

                $el = $(this);
                $($el).height('auto')
                topPostion = $el.position().top;

                if (currentRowStart != topPostion) {
                    for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                        rowDivs[currentDiv].height(currentTallest);
                    }
                    rowDivs.length = 0; // empty the array
                    currentRowStart = topPostion;
                    currentTallest = $el.height();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
                }

                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
            });
        }

        return {
            equalHeight: equalHeight
        };
    })();

    $(document).ready(function(){
        Utility.equalHeight('[data-height="equal"]');

        $(window).resize(function(){
            Utility.equalHeight('[data-height="equal"]');
        });
    });


})();

(function() {



})();

(function() {

    var Tabs = (function() {

        var getInitialItemsWidth = function(el) {
            var totalItemsWidth = 0;

            $.each($(el).children('li'), function(i, li){
                totalItemsWidth += $(li).width();
            });

            $(el).data('total-items-width', Math.ceil(totalItemsWidth) + 2);
        }

        var checkTabs = function(el) {
            var containerWidth = $(el).width();

            if ($(el).data('total-items-width') < containerWidth && !$(el).hasClass('nav-tabs--justified')) {
                $(el).addClass('nav-tabs--justified');
            } else if ($(el).data('total-items-width') >= containerWidth && $(el).hasClass('nav-tabs--justified')) {
                $(el).removeClass('nav-tabs--justified');
            }
        }

        var init = function() {
            var $tabs = $('.nav-tabs');

            $tabs.each(function(i){
                getInitialItemsWidth(this);
                checkTabs(this);
            });

            $(window).resize(function(){
                $tabs.each(function(i){
                    checkTabs(this);
                });
            });

            $tabs.on('shown.bs.tab', function (e) { $(e.target).blur() });
        }

        return {
            init: init
        };
    })();

    $(document).ready(function(){
        Tabs.init();
    });


})();

(function() {



// $('.input-group.date').datepicker({
//   showOnFocus: false,
//   container: '.input-group',
//   orientation: 'bottom'
// });

    $(function () {
        $('.input-group.date').datetimepicker({ format: 'L' });
        $('.input-group.time').datetimepicker({ format: 'LT' });
    });

})();