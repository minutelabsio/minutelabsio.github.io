define(
    [
        'jquery',
        'moddef'
    ],
    function(
        $,
        M
    ) {

        'use strict';

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
                });
            },

            /**
             * Initialize events
             * @return {void}
             */
            initEvents : function(){

                var self = this;

                $(document).on('click', '[href="#details"]', function(){
                    $(document.body).toggleClass('offcanvas-active');
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

            }

        }, ['events']);

        return new Mediator();
    }
);




