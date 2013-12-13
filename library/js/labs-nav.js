(function(window, document, undefined){
    var el = document.getElementById('nav-toggle');

    function toggleClass( el, cls ){
        if ( !el ){
            return;
        }

        var str = el.className
            ,idx = str.indexOf(cls)
            ;
        if ( idx === -1 ) {
            str += ' ' + cls;
        } else {
            str = str.substr(0, idx) + str.substr(idx + cls.length);
        }

        el.className = str;
    }

    if ( el ){
        el.addEventListener('click', function(){
            var wrap = document.getElementById('wrap-outer');
            toggleClass(wrap, 'offcanvas-active');
            toggleClass(el, 'on');
            return false;
        }, false);
    }
})(this, this.document);