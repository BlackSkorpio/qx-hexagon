// ==UserScript==
// @name     QX KeyNav
// @version  		0
// @icon				 https://blog.xenproject.org/wp-content/uploads/2014/10/Testing.jpg
// @icon				http://www.sctest.org/content/themes/sctest/assets/i/sctest-logo-icon.svg
// @grant       none
// @namespace		https://github.com/BlackSkorpio/
// @include *oxygen.local*
// @include *qruiser.com*
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// ==/UserScript==

function keyNav() {
	$(window).keydown(function (event) {
		var LinkMembers		= $('#qmenu_members > a');
		var LinkClubs		= $('#qmenu_clubs > a');
		var LinkPics		= $('#qmenu_pics > a');
		var LinkMovies		= $('#qmenu_movies > a');
		var LinkBlogs		= $('#qmenu_texts > a');
		var LinkForum		= $('#qmenu_forum > a');
		var LinkChat		= $('#qmenu_chat > a');
		var LinkInfo		= $('#qmenu_info > a');
		//var LinkLogOut		= $('#qmenu_logut > a');
		var LinkHome		= $('#column_left .leftcolumn-membericon > .insertmember > .link > a');
		var LinkVisitors	= $('.container--latest-visitors .container-header > a');
		var FormElements	= event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'textarea';
		var KeyMembers		= event.which == 49 || event.which == 97;  /* 1 */
		var KeyClubs		= event.which == 50 || event.which == 98;  /* 2 */
		var KeyPics			= event.which == 51 || event.which == 99;  /* 3 */
		var KeyMovies		= event.which == 52 || event.which == 100; /* 4 */
		var KeyBlogs		= event.which == 53 || event.which == 101; /* 5 */
		var KeyForum		= event.which == 54 || event.which == 102; /* 6 */
		var KeyChat			= event.which == 55 || event.which == 103; /* 7 */
		var KeyInfo			= event.which == 56 || event.which == 104; /* 8 */
		//var KeyLogOut		= event.which == 57 || 105; /* 9 */
		var KeyHome			= event.which == 72; /* H */
		var KeyVisitors		= event.which == 86; /* V */
		//var preventDefault	= event.preventDefault();
		//var stopPropagation	= event.stopPropagation();
		/*var Keys = {
			Home: 'event.which == 72';
		}*/

		if ( FormElements && KeyMembers ) {
			window.location = LinkMembers.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( FormElements && KeyClubs ) {
			window.location = LinkClubs.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( FormElements && KeyPics ) {
			window.location = LinkPics.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( FormElements && KeyMovies ) {
			window.location = LinkMovies.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( FormElements && KeyBlogs ) {
			window.location = LinkBlogs.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( FormElements && KeyForum ) {
			window.location = LinkForum.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( FormElements && KeyChat ) {
			window.location = LinkChat.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( FormElements && KeyInfo ) {
			window.location = LinkInfo.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		/*if ( FormElements && KeyLogOut ) {
			window.location = LinkLogOut.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};*/
		if ( FormElements && KeyHome ) {
			window.location = LinkHome.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( FormElements && KeyVisitors ) {
			window.location = LinkVisitors.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		//console.log(event.which);
	})
};
keyNav();
