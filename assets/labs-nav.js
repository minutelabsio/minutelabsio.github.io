---
section: hidden
---
(function(window, document, Lab, undefined){
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
            nextEl.setAttribute('title', "Next Lab: " + next.title);
        } else if ( nextEl ){
            nextEl.style.display = 'none';
        }

        if ( prevEl && prev ){
            prevEl.setAttribute('href', prev.url);
            prevEl.setAttribute('title', "Previous Lab: " + prev.title);
        } else if ( prevEl ){
            prevEl.style.display = 'none';
        }
    }

    if ( el ){
        el.addEventListener('click', function( e ){
            e.preventDefault();
            var wrap = document.getElementById('wrap-outer');
            toggleClass(wrap, 'offcanvas-active');
            toggleClass(el, 'on');
            return false;
        }, false);
    }

    if ( Lab ){

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

                updateNavUrls( labData[ i + 1 ], labData[ i - 1 ] );
                break;
            }
        }
    }

})(this, this.document, this.Lab);
