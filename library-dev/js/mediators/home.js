define(
    [
        'jquery',
        'moddef',
        'frosty'
    ],
    function(
        $,
        M,
        _f
    ) {

        'use strict';

        var err = function( arg ){
            window.console.error( arg );
        };

        /**
         * Page-level Mediator
         * @module Boilerplate
         * @implements {Stapes}
         */
        var Mediator = M({

            /**
             * Mediator Constructor
             * @return {void}
             */
            constructor : function(){

                var self = this;
                self.initEvents();

                $(function(){
                    self.resolve('domready');
                });

                self.after('domready').then(function(){
                    self.onDomReady();
                }).otherwise( err );
            },

            /**
             * Initialize events
             * @return {void}
             */
            initEvents : function(){

                var self = this;

                $(document).on('click', '[data-offcanvas="toggle"]', function(){
                    $('#wrap-outer').toggleClass('offcanvas-active');
                    $(this).toggleClass('on');
                    return false;
                });

                $(document).on('click', '#legend .tog', function(){
                    $('#legend').toggleClass('on');
                    return false;
                });
            },

            /**
             * DomReady Callback
             * @return {void}
             */
            onDomReady : function(){

                var self = this
                    ,$light
                    ;

                $('a[title], abbr[title]').frosty();

                // lightbulb
                $light = $($('#flicker-bulb').html()).appendTo('#site-nav .logo');
                $light.hide();

                function flicker(){
                    $light.css('margin-left', '0');

                    setTimeout(function(){
                        $light.css('margin-left', '');
                    }, 1400);

                    setTimeout(flicker, (((Math.random() * 6)|0) + 10) * 1000);
                }
                flicker();
                
            }

        }, ['events']);

        return new Mediator();
    }
);




