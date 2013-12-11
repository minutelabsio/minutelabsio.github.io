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
            console.error( arg );
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
            },

            /**
             * DomReady Callback
             * @return {void}
             */
            onDomReady : function(){

                var self = this;

                $('a[title], abbr[title]').frosty();
            }

        }, ['events']);

        return new Mediator();
    }
);




