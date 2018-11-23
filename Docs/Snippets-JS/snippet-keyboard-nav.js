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
		var hq_LinkMembers	= $('#qmenu_members > a');
		var hq_LinkClubs	= $('#qmenu_clubs > a');
		var hq_LinkPics		= $('#qmenu_pics > a');
		var hq_LinkMovies	= $('#qmenu_movies > a');
		var hq_LinkBlogs	= $('#qmenu_texts > a');
		var hq_LinkForum	= $('#qmenu_forum > a');
		var hq_LinkChat		= $('#qmenu_chat > a');
		var hq_LinkInfo		= $('#qmenu_info > a');
		//var hq_LinkLogOut		= $('#qmenu_logut > a');
		var hq_LinkHome		= $('#column_left .leftcolumn-membericon > .insertmember > .link > a');
		var hq_LinkVisitors	= $('.container--latest-visitors .container-header > a');
		var hq_FormElements	= event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'textarea';
		var hq_KeyMembers	= event.which == 49 || event.which == 97;  /* 1 */
		var hq_KeyClubs		= event.which == 50 || event.which == 98;  /* 2 */
		var hq_KeyPics		= event.which == 51 || event.which == 99;  /* 3 */
		var hq_KeyMovies	= event.which == 52 || event.which == 100; /* 4 */
		var hq_KeyBlogs		= event.which == 53 || event.which == 101; /* 5 */
		var hq_KeyForum		= event.which == 54 || event.which == 102; /* 6 */
		var hq_KeyChat		= event.which == 55 || event.which == 103; /* 7 */
		var hq_KeyInfo		= event.which == 56 || event.which == 104; /* 8 */
		//var hq_KeyLogOut	= event.which == 57 || event.which == 105; /* 9 */
		var hq_KeyHome		= event.which == 72; /* H */
		var hq_KeyVisitors	= event.which == 86; /* V */
		//var preventDefault	= event.preventDefault();
		//var stopPropagation	= event.stopPropagation();
		/*var hq_Keys = {
			Home: 'event.which == 72';
		}*/

		if ( hq_FormElements && hq_KeyMembers ) {
			window.location = hq_LinkMembers.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( hq_FormElements && hq_KeyClubs ) {
			window.location = hq_LinkClubs.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( hq_FormElements && hq_KeyPics ) {
			window.location = hq_LinkPics.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( hq_FormElements && hq_KeyMovies ) {
			window.location = hq_LinkMovies.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( hq_FormElements && hq_KeyBlogs ) {
			window.location = hq_LinkBlogs.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( hq_FormElements && hq_KeyForum ) {
			window.location = hq_LinkForum.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( hq_FormElements && hq_KeyChat ) {
			window.location = hq_LinkChat.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		if ( hq_FormElements && hq_KeyInfo ) {
			window.location = hq_LinkInfo.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		/*if ( hq_FormElements && hq_KeyLogOut ) {
			window.location = hq_LinkLogOut.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};*/
		if ( hq_FormElements && hq_KeyHome ) {
			window.location = hq_LinkHome.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
			event.preventDefault();
			event.stopPropagation();
		};
		if ( hq_FormElements && hq_KeyVisitors ) {
			window.location = hq_LinkVisitors.attr('href');
			event.preventDefault();
			event.stopPropagation();
		};
		//console.log(event.which);
	})
};
keyNav();
