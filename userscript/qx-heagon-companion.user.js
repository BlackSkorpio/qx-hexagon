/*! QX Hexagon Companion qx-hexagon-companion.user.js
 *  @copyright  (c) 2018 Bjarne Varoystrand - bjarne ○ kokensupport • com
 *  @license GPL
 *  @author Bjarne Varoystrand (@black_skorpio)
 *  @version 1.0
 *  @description Fixes that goes hand in hand with the QX Hexagon userstyle
 *  @url http://varoystrand.se | http://kokensupport.com
**/
// ==UserScript==
// @name         QX Hexagon companion
// @version      1.0
// @description  Fixes that goes hand in hand with the QX Hexagon userstyle
// @icon         https://github.com/BlackSkorpio/qx-hexagon/raw/master/screens/hexagon-logo.jpg
// @author       Bjarne Varöystrand
// @homepageURL  https://varoystrand.se
// @homepageURL  https://github.com/BlackSkorpio/qx-hexagon
// @downloadURL  https://github.com/BlackSkorpio/qx-hexagon/raw/master/js/qx-hexagon-companion.user.js
// @updateURL    https://github.com/BlackSkorpio/qx-hexagon/raw/master/js/qx-hexagon-companion.user.js
// @include https://qruiser.com/*
// @include https://www.qruiser.com/*
// @include https://beta.qruiser.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// ==/UserScript==
(function(window, document, $, undefined) {
	// NOTE Be A Real Pain In The Ass!
	"use strict";
	// NOTE Define our "working space"
	window.HexaGon = {};
	// NOTE Store our functions so we can run them on window.ready
	HexaGon.init = function() {
		HexaGon.cacheSelectors();
		HexaGon.setBody();
		HexaGon.ClassCleanHTML();
		HexaGon.reSize();
	};
	// NOTE Cache all our selectors
	HexaGon.cacheSelectors = function() {
		HexaGon.pathName		= window.location.pathname;
		HexaGon.hrefLoc			= window.location.href;
		// NOTE Selectors
		HexaGon.HtmlBody		= $('html, body');
		HexaGon.Body			= $(document.body);
		HexaGon.topContent		= "#top";
		HexaGon.mainContent		= ".main-content";
		HexaGon.colRight		= $("#column_right.column-right");
		HexaGon.TeaserDiv 		= $(".blog-and-news");
		HexaGon.allColumns		= $('[id^="column_"], .odd, .even');
		HexaGon.inlineCleaning	= $('.movies-listing .even div, .movies-listing .odd div, .movies-listing > div:nth-of-type(3), .video-thumb img[src$="star.png"], .video-thumb span, .attachedicon, span.homelink, div[style*="font-size: 10px;"], .block[style*="font-size: 11px;"], .icons li, .line .header span, #search form, #largeediticon, a[style*="text-decoration"], i.icon, .emptymembericon, .noticetext');
		HexaGon.removeEmpty		= $('#column_center .even:empty, .thinlineup, .homepageblock div[style="float:left;width:140px"]:first-child, .block img[src$="blank.gif"]:not([style*="/photothumbnails/"]), .homepageblock div[style="float:left;width:70px"], li div[style="width: 10px; height: 9px"]:empty,div[style="width: 10px; height: 10px"]:empty');
		HexaGon.Sticky			= $("#whole #qmenu, #column_left.column-left .container:first-of-type, .container--chat-list, .container--personal, .container--your-search, .container.logged-in");
		HexaGon.MakeList		= $('.movies-listing > div:nth-of-type(3), .column-content .line + div:not(#homepageinfo):not(#map_canvas):not(.list):not([id^="album_"]):not(.odd):not(.even):not(.gallery)');
		HexaGon.MemberPres		= $(".homepage div[style='display: block; min-height:150px;']:first-of-type, .homepage #buff_block + div");
		// NOTE Elements
		HexaGon.spanText		= '<span class="q-text" />';
		// NOTE QX URLs */
		HexaGon.bodyURL			= HexaGon.pathName.match(/^\/?(\w+)\b/);
		HexaGon.nudgeSent		= HexaGon.hrefLoc.indexOf('/buffs.php?type=sent');
		HexaGon.msgSent			= HexaGon.hrefLoc.indexOf('/messages.php?mailbox=out');
		HexaGon.onlyloggedin	= HexaGon.hrefLoc.indexOf("?onlyloggedin");
		HexaGon.msgSend			= HexaGon.hrefLoc.indexOf("/messagebox.php");
		HexaGon.satellite		= HexaGon.hrefLoc.indexOf("/satellite.php");
		HexaGon.Active			= HexaGon.hrefLoc.indexOf("/active/");
		HexaGon.All				= HexaGon.hrefLoc.indexOf("/all/");
		HexaGon.Biggest			= HexaGon.hrefLoc.indexOf("/biggest/");
		HexaGon.Birthday		= HexaGon.hrefLoc.indexOf("/birthday/");
		HexaGon.BlogCom			= HexaGon.hrefLoc.indexOf("/blogcommented/");
		HexaGon.BlogPop			= HexaGon.hrefLoc.indexOf("/blogvisited/");
		HexaGon.ChatList		= HexaGon.hrefLoc.indexOf("/chat_list/");
		HexaGon.CreateClub		= HexaGon.hrefLoc.indexOf("/createclub/");
		HexaGon.DiaryNew		= HexaGon.hrefLoc.indexOf("/diarynew/");
		HexaGon.Digged			= HexaGon.hrefLoc.indexOf("digged");
		HexaGon.Discussions		= HexaGon.hrefLoc.indexOf("discuss");
		HexaGon.InBox			= HexaGon.hrefLoc.indexOf("/conversations/");
		HexaGon.nearBy			= HexaGon.hrefLoc.indexOf("/close_to_you/");
		HexaGon.New				= HexaGon.hrefLoc.indexOf("new");
		HexaGon.OnLine			= HexaGon.hrefLoc.indexOf("/online/");
		HexaGon.Scribble		= HexaGon.hrefLoc.indexOf("scribble");
		HexaGon.Search			= HexaGon.hrefLoc.indexOf("/search/");
		HexaGon.PicFaces		= HexaGon.hrefLoc.indexOf("/faceimages/");
		HexaGon.PicHome			= HexaGon.hrefLoc.indexOf("/homepageimages/");
		HexaGon.Polls			= HexaGon.hrefLoc.indexOf("poll");
		HexaGon.Popular			= HexaGon.hrefLoc.indexOf("/viewed/");
		HexaGon.pageXXX			= HexaGon.hrefLoc.indexOf('xxx');
		HexaGon.Updated			= HexaGon.hrefLoc.indexOf('updated');
		HexaGon.InfoPolicy		= HexaGon.hrefLoc.indexOf("/policy/");
		HexaGon.InfoContact		= HexaGon.hrefLoc.indexOf("/contact/");
		HexaGon.InfoTechnical	= HexaGon.hrefLoc.indexOf("/technical/");
		HexaGon.InfoStatistics	= HexaGon.hrefLoc.indexOf("/statistics/");
		HexaGon.InfoAdvertise	= HexaGon.hrefLoc.indexOf("/ad/");
		HexaGon.InfoGdpr		= HexaGon.hrefLoc.indexOf("/about_cookies/");
		HexaGon.InfoFaq			= HexaGon.hrefLoc.indexOf("/faq/")

		// NOTE HexaGon Classes
		HexaGon.Prefix				= 'q-';
		HexaGon.Source				= HexaGon.Prefix+'source-'
		HexaGon.Template			= HexaGon.Prefix+'template-';
		HexaGon.ClassMain			= 'hexagon';
		HexaGon.ClassClean			= HexaGon.Prefix+'clean';
		HexaGon.ClassStickyWidget	= HexaGon.Prefix+'widget--sticky';
		HexaGon.ClassMakeList		= 'list';
		// NOTE Put together the Body Source & Template classes
		HexaGon.ClassXXX			= HexaGon.Template+HexaGon.bodyURL[1]+'-xxx';
		HexaGon.ClassActive			= HexaGon.Template+HexaGon.bodyURL[1]+'-active';
		HexaGon.ClassAll			= HexaGon.Template+HexaGon.bodyURL[1]+'-all';
		HexaGon.ClassBiggest		= HexaGon.Template+HexaGon.bodyURL[1]+'-biggest';
		HexaGon.ClassBirthday		= HexaGon.Template+HexaGon.bodyURL[1]+'-birthday';
		HexaGon.ClassBlogCom		= HexaGon.Template+HexaGon.bodyURL[1]+'-most-commented';
		HexaGon.ClassBlogPop		= HexaGon.Template+HexaGon.bodyURL[1]+'-most-visited';
		HexaGon.ClassChatList		= HexaGon.Template+HexaGon.bodyURL[1]+'-list';
		HexaGon.ClassCreate			= HexaGon.Template+HexaGon.bodyURL[1]+'-create';
		HexaGon.ClassDiaryNew		= HexaGon.Template+HexaGon.bodyURL[1]+'-new-diary';
		HexaGon.ClassDigged			= HexaGon.Template+HexaGon.bodyURL[1]+'-digged';
		HexaGon.ClassDiscussions	= HexaGon.Template+HexaGon.bodyURL[1]+'-discussions';
		HexaGon.ClassPicFaces		= HexaGon.Template+HexaGon.bodyURL[1]+'-faces';
		HexaGon.ClassPicHome		= HexaGon.Template+HexaGon.bodyURL[1]+'-homepage';
		HexaGon.ClassPopular		= HexaGon.Template+HexaGon.bodyURL[1]+'-popular';
		HexaGon.ClassPolls			= HexaGon.Template+HexaGon.bodyURL[1]+'-polls';
		HexaGon.ClassInBox			= HexaGon.Template+HexaGon.bodyURL[1]+'-conversations';
		HexaGon.ClassNearBy			= HexaGon.Template+HexaGon.bodyURL[1]+'-near-by';
		HexaGon.ClassNew			= HexaGon.Template+HexaGon.bodyURL[1]+'-new';
		HexaGon.ClassNudgeSent		= HexaGon.Template+HexaGon.bodyURL[1]+'-sent';
		HexaGon.ClassOnLine			= HexaGon.Template+HexaGon.bodyURL[1]+'-online';
		HexaGon.ClassSearch			= HexaGon.Template+HexaGon.bodyURL[1]+'-search';
		HexaGon.ClassScribble		= HexaGon.Template+HexaGon.bodyURL[1]+'-scribble';
		HexaGon.ClassSendmsg		= HexaGon.Template+HexaGon.bodyURL[1]+'-send';
		HexaGon.ClassUpdated		= HexaGon.Template+HexaGon.bodyURL[1]+'-updated';
		HexaGon.ClassInfoPolicy		= HexaGon.Template+HexaGon.bodyURL[1]+'-policy';
		HexaGon.ClassInfoContact	= HexaGon.Template+HexaGon.bodyURL[1]+'-contact';
		HexaGon.ClassInfoTechnical	= HexaGon.Template+HexaGon.bodyURL[1]+'-technical';
		HexaGon.ClassInfoStatistics	= HexaGon.Template+HexaGon.bodyURL[1]+'-statistics';
		HexaGon.ClassInfoAdvertise	= HexaGon.Template+HexaGon.bodyURL[1]+'-advertise';
		HexaGon.ClassInfoGdpr		= HexaGon.Template+HexaGon.bodyURL[1]+'-about-cookies';
		HexaGon.ClassInfoFaq		= HexaGon.Template+HexaGon.bodyURL[1]+'-faq';
	};
	// NOTE Hexagon Console message
	//   https://github.com/stml/welcomejs
	HexaGon.consoleMSG = function() {
		var i = 0;
		if (!i) {
			setTimeout(function () {
				console.info("%cWelcome!", "font: 3em sans-serif; color: orange; ");
				console.info("%cHello, and welcome to the Hexagon console. If this is your first time here, make yourself at home. (If not, disregard this message!)", "font: 1.5em sans-serif; color: white;");
				console.info("%cThank you for choosing Hexagon as your prefered userstyle for your Qruiser experiense!", "font: 1.5em sans-serif; color: orange;");
				console.info("%cWhat you can find down here is what lies underneath Qruiser and Hexagon: its code. You can read, write, rewrite, and manipulate this code to make the web your own.", "font: 1.5em sans-serif; color: black;");
				console.info("%cYou can find out more about using the console from these sites:", "font: 1.25 sans-serif; color: black;");
				console.info("%c - Firefox: https://developer.mozilla.org/en-US/docs/Tools/Web_Console", "font: 1.25 sans-serif; color: black;");
				console.info("%c - Chrome: https://developers.google.com/web/tools/chrome-devtools/console/", "font: 1.25 sans-serif; color: black;");
				console.info("%c - Safari: https://developer.apple.com/library/content/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/Console/Console.html", "font: 1.25 sans-serif; color: black;");
				console.info("%c - Or just use any search engine to look up 'developer console'", "font: 1.25 sans-serif; color: black;");
				console.info("%cFor help with learning to code, try https://www.codecademy.com/", "font: 1.25 sans-serif; color: black;");
				console.info("%c[This text generated by Black_Skorpio https://qruiser.com/?id=469474]", "font: 1 sans-serif; color: grey;");
				console.info("%c      o__ __o        o__ __o       o         o   __o__     o__ __o      o__ __o__/_   o__ __o", "font: 1 sans-serif; color: red;");
				console.info("%c     /v     v\\      <|     v\\     <|>       <|>    |      /v     v\\    <|    v       <|     v\\ ", "font: 1 sans-serif; color: red;");
				console.info("%c    />       <\\     / \\     <\\    / \\       / \\   / \\    />       <\\   < >           / \\     <\\ ", "font: 1 sans-serif; color: orange;");
				console.info("%c  o/           \\o   \\o/     o/    \\o/       \\o/   \\o/   _\\o____         |            \\o/     o/", "font: 1 sans-serif; color: yellow;");
				console.info("%c <|             |>   |__  _<|      |         |     |         \\_\\__o__   o__/_         |__  _<|", "font: 1 sans-serif; color: yellow;");
				console.info("%c  \\\\           //    |       \\    < >       < >   < >              \\    |             |       \\ ", "font: 1 sans-serif; color: green;");
				console.info("%c    \\       \\o/     <o>       \\o   \\         /     |     \\         /   <o>           <o>       \\o ", "font: 1 sans-serif; color: blue;");
				console.info("%c     o       |       |         v\\   o       o      o      o       o     |             |         v\\ ", "font: 1 sans-serif; color: blue;");
				console.info("%c     <\\__   / \\     / \\         <\\  <\\__ __/>    __|>_    <\\__ __/>    / \\  _\\o__/_  / \\         <\\ ", "font: 1 sans-serif; color: purple;");
			}, 1);
			i = 1;
		};
	},HexaGon.consoleMSG();
	// NOTE SetUp the body with classes and ID's
	HexaGon.setBody = function() {
		// NOTE To make sure we are running Hexagon
		HexaGon.HtmlBody.addClass(HexaGon.ClassMain);
		// NOTE Rearranger things in the body and make it predictable
		HexaGon.reArangeBody = function() {
			// Make sure that the right column realy is where it should be!
			HexaGon.colRight.appendTo(HexaGon.mainContent);
			//blog-and-news
			HexaGon.TeaserDiv.appendTo(HexaGon.topContent);
			$("#subnavbar [class*='button']").wrapAll('<div class="q-subnav-grid" />');
			HexaGon.MemberPres.addClass('q-member-presentation');
		};
		HexaGon.SetClubs = function() {
			var ClubURL		= HexaGon.hrefLoc.indexOf("?club=");
			var ThredURL	= HexaGon.hrefLoc.indexOf("&view=");
			var Thread_Id	= HexaGon.hrefLoc.split("&view=");
			var Club_Id		= HexaGon.hrefLoc.split("?club=");
			var ThreadId	= "q_thread_"+Thread_Id[1];
			var ScribbleId	= "q_club_"+Club_Id[1]+"_scribble"
			var ClubClass	= HexaGon.Prefix+'club-'+Club_Id[1];
			if ( HexaGon.Discussions || HexaGon.Scribble > -1 ) {
				if ( HexaGon.Discussions > -1 ) {
					if( ThredURL > -1 ) HexaGon.Body.attr( "id", ThreadId );
					else if( ClubURL > -1 ) HexaGon.Body.addClass( ClubClass );
				}
				if ( HexaGon.Scribble > -1 ) HexaGon.Body.attr( "id", ScribbleId );
			}
		};
		HexaGon.reArangeBody();
		HexaGon.SetClubs();
		// NOTE The Source class
		if(HexaGon.bodyURL) HexaGon.Body.addClass(HexaGon.Source+HexaGon.bodyURL[1].toLowerCase());
		// NOTE Add Template classes
		if(HexaGon.pageXXX 			> -1) HexaGon.Body.addClass(HexaGon.ClassXXX);
		if(HexaGon.Active 			> -1) HexaGon.Body.addClass(HexaGon.ClassActive);
		if(HexaGon.All 				> -1) HexaGon.Body.addClass(HexaGon.ClassAll);
		if(HexaGon.Biggest 			> -1) HexaGon.Body.addClass(HexaGon.ClassBiggest);
		if(HexaGon.Birthday 		> -1) HexaGon.Body.addClass(HexaGon.ClassBirthday);
		if(HexaGon.BlogCom			> -1) HexaGon.Body.addClass(HexaGon.ClassBlogCom);
		if(HexaGon.BlogPop			> -1) HexaGon.Body.addClass(HexaGon.ClassBlogPop);
		if(HexaGon.CreateClub 		> -1) HexaGon.Body.addClass(HexaGon.ClassCreate);
		if(HexaGon.ChatList			> -1) HexaGon.Body.addClass(HexaGon.ClassChatList);
		if(HexaGon.DiaryNew			> -1) HexaGon.Body.addClass(HexaGon.ClassDiaryNew);
		if(HexaGon.Digged			> -1) HexaGon.Body.addClass(HexaGon.ClassDigged);
		if(HexaGon.Discussions 		> -1) HexaGon.Body.addClass(HexaGon.ClassDiscussions);
		if(HexaGon.PicFaces			> -1) HexaGon.Body.addClass(HexaGon.ClassPicFaces);
		if(HexaGon.PicHome			> -1) HexaGon.Body.addClass(HexaGon.ClassPicHome);
		if(HexaGon.Popular			> -1) HexaGon.Body.addClass(HexaGon.ClassPopular);
		if(HexaGon.Polls			> -1) HexaGon.Body.addClass(HexaGon.ClassPolls);
		if(HexaGon.InBox			> -1) HexaGon.Body.addClass(HexaGon.ClassInBox);
		if(HexaGon.nearBy 			> -1) HexaGon.Body.addClass(HexaGon.ClassNearBy);
		if(HexaGon.New 				> -1) HexaGon.Body.addClass(HexaGon.ClassNew);
		if(HexaGon.nudgeSent		> -1) HexaGon.Body.addClass(HexaGon.ClassNudgeSent);
		if(HexaGon.OnLine 			> -1) HexaGon.Body.addClass(HexaGon.ClassOnLine);
		if(HexaGon.Search 			> -1) HexaGon.Body.addClass(HexaGon.ClassSearch);
		if(HexaGon.Scribble			> -1) HexaGon.Body.addClass(HexaGon.ClassScribble);
		if(HexaGon.msgSent 			> -1) HexaGon.Body.addClass(HexaGon.ClassSendmsg);
		if(HexaGon.Updated 			> -1) HexaGon.Body.addClass(HexaGon.ClassUpdated);
		if(HexaGon.InfoPolicy		> -1) HexaGon.Body.addClass(HexaGon.ClassInfoPolicy);
		if(HexaGon.InfoContact		> -1) HexaGon.Body.addClass(HexaGon.ClassInfoContact);
		if(HexaGon.InfoTechnical	> -1) HexaGon.Body.addClass(HexaGon.ClassInfoTechnical);
		if(HexaGon.InfoStatistics	> -1) HexaGon.Body.addClass(HexaGon.ClassInfoStatistics);
		if(HexaGon.InfoAdvertise	> -1) HexaGon.Body.addClass(HexaGon.ClassInfoAdvertise);
		if(HexaGon.InfoGdpr			> -1) HexaGon.Body.addClass(HexaGon.ClassInfoGdpr);
		if(HexaGon.InfoFaq			> -1) HexaGon.Body.addClass(HexaGon.ClassInfoFaq);
		HexaGon.Sticky.addClass(HexaGon.ClassStickyWidget);
		HexaGon.MakeList.addClass(HexaGon.ClassMakeList);
	};
	// NOTE Clean out unwanted stuff
	HexaGon.ClassCleanHTML = function() {
		// NOTE Delete empty nodes
		HexaGon.removeEmpty.remove();
		// NOTE Clean up inline styles
		HexaGon.inlineCleaning.removeAttr("style").addClass(HexaGon.ClassClean);
		// NOTE Wrap all text nodes inside a span.text
		HexaGon.allColumns.contents().filter(function() {
			return this.nodeType == 3 && $.trim(this.nodeValue).length;
		}).wrap(HexaGon.spanText);
	};
	// NOTE Resize popups
	HexaGon.reSize = function() {
		// NOTE Our Send msg window
		if(HexaGon.msgSend	> -1) window.resizeTo('450', '800');
		// NOTE The satellite
		if(HexaGon.satellite > -1) window.resizeTo('320', '500');
	};
	// NOTE Dirty HACK to be able to keep functionality on member profiles!
	if(window.location.href.indexOf("/?id=") > -1) {
		var h_url			= window.location.href.split("?id=");
		var h_HtmlBody		= $('html, body');
		var h_DocBody		= $(document.body);
		var h_AllColumns	= $('[id^="column_"]');
		var h_columnRight	= $("#column_right.column-right");
		var h_teaserTop		= $(".blog-and-news");
		var h_makeSticky	= $("#whole #qmenu, #column_left.column-left .container:first-of-type, .container--chat-list, .container--personal, .container--your-search, .container.logged-in");
		var h_cleanInline	= $('.video-thumb img[src$="star.png"], .video-thumb span, .attachedicon, div[style*="font-size: 10px;"], .block[style*="font-size: 11px;"], .icons li, .line .header span, #search form, #largeediticon, a[style*="text-decoration"], i.icon, .emptymembericon, .noticetext');
		var h_removeEmpty	= $('#column_center .even:empty, .thinlineup, .homepageblock div[style="float:left;width:140px"]:first-child, .block img[src$="blank.gif"]:not([style*="/photothumbnails/"]), .homepageblock div[style="float:left;width:70px"], li div[style="width: 10px; height: 9px"]:empty,div[style="width: 10px; height: 10px"]:empty');
		var h_makeList		= $('.column-content .line + div:not(#homepageinfo):not(#map_canvas):not(.list):not([id^="album_"]):not(.odd):not(.even):not(.gallery)');
		var h_memberPres	= $(".homepage div[style='display: block; min-height:150px;']:first-of-type, .homepage #buff_block + div");
		console.info("%cMemberID: "+h_url[1], "font: 3em sans-serif; color: orange; ");
		console.info("Qruiser: We have a renegade template"),
		h_HtmlBody.addClass('hexagon'),
		h_DocBody.addClass('q-source-profile q-template-profile-member').attr("id", "q_member_"+h_url[1]),
		h_teaserTop.appendTo("#top"),
		h_columnRight.appendTo(".main-content"),
		h_removeEmpty.remove(),
		h_makeSticky.addClass('q-widget--sticky'),
		h_cleanInline.removeAttr("style").addClass('q-clean'),
		h_makeList.addClass('list'),
		h_memberPres.addClass('q-member-presentation'),
		h_AllColumns.contents().filter(function() {
			return this.nodeType == 3 && $.trim(this.nodeValue).length;
		}).wrap('<span class="q-text" />');
	}
	// NOTE Don't Look Back, Just Get it Done!
	$(document).on("ready",HexaGon.init);
})(window, document, jQuery);
