var LM = LM || {};
LM.Twitterfeed = LM.Twitterfeed || {};

LM.Twitterfeed = (function($) {
	var module = {};

	//Twitter Parsers
	// http://www.cypressnorth.com/blog/web-programming-and-development/how-to-easily-display-a-twitter-feed-using-javascript/
	String.prototype.parseURL = function() {
		return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
			return url.link(url);
		});
	};
	String.prototype.parseUsername = function() {
		return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
			var username = u.replace("@","");
			return u.link("http://twitter.com/"+username);
		});
	};
	String.prototype.parseHashtag = function() {
		return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
			var tag = t.replace("#","%23");
			return t.link("http://search.twitter.com/search?q="+tag);
		});
	};
	var parseDate = function(str) {
		var v=str.split(' ');
		return new Date(Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC"));
	};

	function _init(){
		var numTweets = 5;
		var _url = 'https://api.twitter.com/1/statuses/user_timeline/livmadsen.json?callback=?&count='+numTweets+'&include_rts=1';
		$.getJSON(_url,function(data){
		for(var i = 0; i< data.length; i++){
				var tweet = data[i].text;
				var created = parseDate(data[i].created_at);
				var createdDate = created.getDate()+'-'+(created.getMonth()+1)+'-'+created.getFullYear()+' | '+created.getHours()+':'+created.getMinutes();
				var tweetmeta = '<span class="twitter-feed-tweet-meta"><a href="https://twitter.com/#!/livmadsen/status/'+data[i].id_str+'" class="twitter-feed-tweet-meta-date">'+createdDate+'</a></span>';
				tweet = tweet.parseURL().parseUsername().parseHashtag();
				$(".js-twitter-feed-container").append('<li class="twitter-feed-tweet">'+tweetmeta+tweet+'</li>');
			}
		});
	}
	module.init = _init;
	return module;
}(Zepto));