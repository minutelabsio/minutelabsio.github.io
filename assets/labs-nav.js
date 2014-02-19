---
section: hidden
---
;(function(window, document, Lab, undefined){

    function loadScript( url ){
        var prev = document.getElementsByTagName('script')[0];
        var scr = document.createElement('script');
        scr.src = url;
        scr.async = 1;
        prev.parentNode.insertBefore(scr, prev);
    }

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
            nextEl.style.display = 'inline-block';
        } else if ( nextEl ){
            nextEl.style.display = 'none';
        }

        if ( prevEl && prev ){
            prevEl.setAttribute('href', prev.url);
            prevEl.setAttribute('title', "Previous Lab: " + prev.title);
            prevEl.style.display = 'inline-block';
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

    window.post_callback = function post_callback( data ){
        if ( data.meta.status === 200 ){
            var labData = data.response.posts;
            var prev = labData[0];
            var next = labData[2];
            if ( Lab.first ){
                prev = false;
                next = labData[1];
            }
            updateNavUrls( next, prev );
        }
    };
    
    if ( Lab && Lab.prevLabOffset ){
        var last = Lab.prevLabOffset;
        var key = 'jLx9Jk6hvkW3P2cBVtLEi8syAHFXyuEy0epRFi2AT3Cg8f8Ji8';
        var url = 'http://api.tumblr.com/v2/blog/minutelabs.tumblr.com/posts/link?api_key='+key+'&offset='+last+'&limit=3&callback=post_callback';

        loadScript( url );
    }

})(this, this.document, this.Lab);

