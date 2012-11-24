var LM = LM || {};
LM.Instafeed = LM.Instafeed || {};

LM.Instafeed = (function($) {
	var module = {};

	var	insta_container,
		insta_next_url,
		last_count = 0,
		current_count = 0,
		count_to_get = 0,
		resize_timer_watch;

	var _init = function(){
		insta_container = $(".js-instagram-feed-container");
		current_count = Math.ceil(window.innerWidth/150);
		last_count = count_to_get = current_count;
		// console.log( last_count, 'current_count', current_count, 'get', count_to_get );

		insta_container.instagram({
			userId: '3948222',
			accessToken: '3948222.f59def8.0f6edcb41c6f46248bf4adcdc4f754d1',
			show: count_to_get,
			onComplete : function (photos, data) {
				insta_next_url = data.pagination.next_url;
			}
		});

		$(window).resize(function() {
			clearTimeout(resize_timer_watch);
			resize_timer_watch = setTimeout(function() {
				_updateInstafeedFeed();
			}, 200);
		});
	};

	function _updateInstafeedFeed(){
		current_count = Math.ceil(window.innerWidth/150);

		if(current_count>last_count){
			count_to_get = current_count - last_count;
			// console.log( current_count, 'get', count_to_get );
			last_count = Math.ceil(window.innerWidth/150);

			insta_container.instagram({
				next_url : insta_next_url,
				show : count_to_get,
				onComplete : function(photos, data) {
					insta_next_url = data.pagination.next_url
				}
			})

		}
	}

	module.init = _init;
	return module;
}(Zepto));