---
section: hidden
---
;(function(window, document, Lab, undefined){

    var apikey = 'jLx9Jk6hvkW3P2cBVtLEi8syAHFXyuEy0epRFi2AT3Cg8f8Ji8';
    var tumblrUrl = 'http://api.tumblr.com/v2/blog/minutelabs.tumblr.com/posts/link?api_key='+apikey;
    var cbid = 1;
    var store;

    function loadScript( url ){
        var prev = document.getElementsByTagName('script')[0];
        var scr = document.createElement('script');
        scr.src = url;
        scr.async = 1;
        prev.parentNode.insertBefore(scr, prev);
    }

    if ( window.localStorage ){
        store = function( key, val ){
            
            if ( val !== undefined ){
                try {

                    window.localStorage[ key ] = JSON.stringify( val );
                    return;

                } catch ( e ){
                    return undefined;
                }
            }

            try {
                return JSON.parse(window.localStorage[ key ]);
            } catch ( e ){
                return undefined;
            }
        };
    } else {
        store = function(){ return undefined; };
    }
    
    function jsonp( url, callback ){
        if (!url || !callback){
            return;
        }

        var name = 'jsonp_callback_' + (cbid++);

        window[ name ] = function( data ){
            window[ name ] = undefined;
            callback( data, {
                url: url
            });
        };

        loadScript( url + '&callback=' + name );
    }

    function aggregate( posts ){
        var ret = [], p;
        
        if ( !posts ){
            return ret;
        }
        
        for ( var i = 0, l = posts.length; i < l; ++i ){
            
            p = posts[ i ];
            // only push if published
            if ( p.state === 'published' ){
                ret.push({
                    id: p.id,
                    url: p.url,
                    title: p.title,
                    timestamp: p.timestamp
                });
            }
        }

        return ret;
    }

    function getTumblrData( done ){

        var lastId = store('tumblr_last_id');
        var storedData = store('tumblr_posts');
        var lastRefresh = store('tumblr_last_refresh');
        var now = (new Date()).getTime();
        var updateDelay = 1000 * 60 * 60;
        var stop = false;
        var next;

        if ( !storedData ){
            storedData = [];
        }

        next = function( offset ){

            offset = offset|0;

            jsonp( tumblrUrl + '&limit=20&offset=' + offset, function( data ){

                var posts;

                if ( data.meta.status === 200 ){
                    posts = aggregate(data.response.posts);
                    // if we're updating we trim data we don't need
                    if ( lastId ){
                        for ( var i = 0, l = posts.length; i < l; ++i ){
                            if ( lastId === posts[ i ].id ){
                                stop = true;
                                posts.splice( i );
                                break;
                            }
                        }
                    }

                    if ( !posts.length ){
                        stop = true;
                    }

                    storedData = posts.concat( storedData );
                } else {
                    stop = true;
                }

                if ( stop ){

                    store('tumblr_posts', storedData);
                    store('tumblr_last_id', storedData[0].id);
                    store('tumblr_last_refresh', now);
                    done( storedData );

                } else {
                    next( offset + 20 );
                }
            });
        };

        if ( !storedData.length || lastRefresh < (now - updateDelay) ){
            next( 0 );
        } else {
            done( storedData );
        }
    };

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
        function toggleNav( e ){
            e.preventDefault();
            var wrap = document.getElementById('wrap-outer');
            toggleClass(wrap, 'offcanvas-active');
            toggleClass(el, 'on');
            return false;
        }

        el.addEventListener('click', toggleNav, false);
        el.addEventListener('touchstart', toggleNav, false);
    }
    
    if ( Lab && Lab.id ){
        
        getTumblrData(function( posts ){

            var id = parseInt(Lab.id);

            for ( var i = 0, l = posts.length; i < l; ++i ){
                
                if (posts[ i ].id === id){

                    updateNavUrls( posts[ i + 1 ], posts[ i - 1 ] );
                    break;
                }
            }
        });
    }

})(this, this.document, this.Lab);

