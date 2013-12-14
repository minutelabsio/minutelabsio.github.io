---
---
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

    function updateNavUrls( prev, next ){

        var nextEl = document.getElementById('lab-nav-next')
            ,prevEl = document.getElementById('lab-nav-prev')
            ;

        if ( nextEl && next ){
            nextEl.setAttribute('href', next.url);
        }

        if ( prevEl && prev ){
            prevEl.setAttribute('href', prev.url);
        }
    }

    if ( el ){
        el.addEventListener('click', function(){
            var wrap = document.getElementById('wrap-outer');
            toggleClass(wrap, 'offcanvas-active');
            toggleClass(el, 'on');
            return false;
        }, false);
    }

    var labData = {% include labs_list.json %};
    var curr
        ,i
        ,l
        ,title = window.Lab.title
        ,id = window.Lab.id
        ;

    for ( i = 0, l = labData.length; i < l; i++ ){
        curr = labData[ i ];
        if ( id === curr.id || title === curr.title ){

            updateNavUrls( labData[ i - 1 ], labData[ i + 1 ] );
            break;
        }
    }

})(this, this.document);
