/*! QX Hexagon Companion qx-hexagon-companion.user.js
 *	@copyright	(c) 2018 Bjarne Varoystrand - bjarne ○ kokensupport • com
 *	@license GPL
 *	@author Bjarne Varoystrand (@black_skorpio)
 *	@version 1.0
 *	@description Fixes that goes hand in hand with the QX Hexagon userstyle
 *	@url http://varoystrand.se | http://kokensupport.com
**/
// ==UserScript==
// @name				 QX Hexagon companion
// @version			1.0
// @description	Fixes that goes hand in hand with the QX Hexagon userstyle
// @icon				 https://github.com/BlackSkorpio/qx-hexagon/raw/master/screens/hexagon-logo.jpg
// @author			 Bjarne Varöystrand
// @homepageURL	https://varoystrand.se
// @homepageURL	https://github.com/BlackSkorpio/qx-hexagon
// @downloadURL	https://github.com/BlackSkorpio/qx-hexagon/raw/master/js/qx-hexagon-companion.user.js
// @updateURL		https://github.com/BlackSkorpio/qx-hexagon/raw/master/js/qx-hexagon-companion.user.js
// @include https://beta.qruiser.com/*
// @include https://www.qruiser.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// ==/UserScript==

// NOTE HexaGon Loading
function onReady(callback) {
	var hq_ClassPrefix		= 'qxh-';
	var hq_ClassLoader		= hq_ClassPrefix+'loader';
	var ReadyBody			= $(document.body);
	var ReadyLoadingClass	= hq_ClassPrefix+'loading';
	var ReadyLoader			= '<div id="qxh_loading"><div class="'+hq_ClassLoader+'"><div><div><div><div><div><div><div><div><div><div></div></div></div></div></div></div></div></div></div></div></div></div>';

	var intervalId = window.setInterval(function() {
		if (document.getElementsByTagName('body')[0] !== undefined) {
			window.clearInterval(intervalId);
			callback.call(this);
		}
	}, 1000);
	ReadyBody.addClass(ReadyLoadingClass).prepend(ReadyLoader);
}
function setVisible(selector, visible) {
	document.querySelector(selector).style.display = visible ? 'block' : 'none';
}
onReady(function() {/* TODO Remove #whole when beta period is over */
	setVisible('.page-container,#whole', true),
	setVisible('#qxh_loading', false),
	$(document.body).removeClass('qxh-loading');
});
(function(window, document, $, undefined) {
	// NOTE Be A Real Pain In The Ass!
	"use strict";
	// NOTE Define our "working space"
	window.HexaGon = {};
	// NOTE Store our functions so we can run them on window.ready
	HexaGon.init = function() {
		HexaGon.cacheSelectors();
		HexaGon.setBody();
		HexaGon.SetUpMemberSearch();
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
		HexaGon.formSearchGeo	= $('a[href^="javascript:selectgeo"], a[href^="javascript:reset"]');
		HexaGon.MakeClubsGrid	= $(".column-content > div:nth-of-type(2) > .list:nth-of-type(4) > .qxh-flex-item, .column-content > div[class ^='club']:not([class*='hidden']) .list:nth-of-type(4) > .qxh-flex-item, .column-content form[name='sort'] + .list > .qxh-flex-item");
		//HexaGon.MakeClubsGrid	= $(".column-content > div:nth-of-type(2) > .list:nth-of-type(5) > .odd, .column-content > div:nth-of-type(2) > .list:nth-of-type(5) > .even, .column-content > div[class ^='club']:not([class*='hidden']) .list:nth-of-type(5) > .odd, .column-content > div[class ^='club']:not([class*='hidden']) .list:nth-of-type(5) > .even, .column-content form[name='sort'] + .list > .odd, .column-content form[name='sort'] + .list > .even");
		HexaGon.RemoveWhiteSpace = $('.column-content p + h2 + p[style*="margin-top: 0.5em;"]');
		//HexaGon.WarningImg		= $('img[src$="warning_icon.png"].banner_icon');// NOTE HACK
		// NOTE Search Member Forms
		HexaGon.sMemUrlClose	= HexaGon.hrefLoc.indexOf("/members/close_to_you/");
		HexaGon.sMemUrlTheRest	= HexaGon.hrefLoc.indexOf("/members/online/" || "/members/new/" || "/members/updated/" || "/members/birthday/" || "/members/all/");
		HexaGon.sMembFormName	= 'form.clearfix[name="listform"]';
		HexaGon.sMembForm		= $(HexaGon.sMembFormName);
		HexaGon.sMemIClean		= $(HexaGon.sMembFormName+' [class="floatleft"]');
		HexaGon.sMemCleanWrap	= '<span class="qxh-formtext" />';
		HexaGon.sMemLang		= $(HexaGon.sMembFormName+' p:first-of-type > a');
		HexaGon.sMemFsOne		= $('select[name="sex"], input[name="lowerage"], input[name="lowerage"] + span.qxh-formtext, input[name="upperage"], input[name="upperage"] + span.qxh-formtext');
		HexaGon.sMemFsTwo		= $('input[name="faceimage"][type="hidden"], input#faceimage, label[for="faceimage"], input[name="verified"][type="hidden"], input#verified, label[for="verified"], input[name="active"][type="hidden"], input#active, label[for="active"]');
		HexaGon.sMemFsThree		= $('input#savesettings, label[for="savesettings"], label + a[href="/goldmember.php?gore=9"]');
		//HexaGon.sMemFsOneCleanUp	= $(HexaGon.sMembFormName+' fieldset');
		//HexaGon.sMemFsTwoCleanUp = $(HexaGon.sMembFormName+' fieldset.qxh-set--specify');
		//HexaGon.sMemFsThreeCleanUp = $(HexaGon.sMembFormName+' fieldset.qxh-set--savesettings');
		HexaGon.sMemObsoleteClean = $( HexaGon.sMembFormName+' .floatleft,'+HexaGon.sMembFormName+' .input-spacing');
		// NOTE QX URLs */
		HexaGon.bodyURL			= HexaGon.pathName.match(/^\/?(\w+)\b/);
		HexaGon.nudgeSent		= HexaGon.hrefLoc.indexOf('/buffs.php?type=sent');
		HexaGon.msgOld			= HexaGon.hrefLoc.indexOf('/messages.php');// NOTE HACK
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
		HexaGon.InfoFaq			= HexaGon.hrefLoc.indexOf("/faq/");
		HexaGon.ClubMain		= HexaGon.hrefLoc.indexOf("club.php?id=");
		HexaGon.ClubURL			= HexaGon.hrefLoc.indexOf("?club=");
		HexaGon.ThredURL		= HexaGon.hrefLoc.indexOf("&view=");
		HexaGon.CatURL			= HexaGon.hrefLoc.indexOf("/?category=");
		HexaGon.ClubMembers		= HexaGon.hrefLoc.indexOf("clubmembers.php");
		HexaGon.Thread_Id		= HexaGon.hrefLoc.split("&view=");
		HexaGon.Categori_Id		= HexaGon.hrefLoc.split("?category=");
		HexaGon.Club_Id			= HexaGon.hrefLoc.split("?club=");
		HexaGon.ClubMain_Id		= HexaGon.hrefLoc.split("?id=");

		// NOTE Fragments
		HexaGon.ClassPrefix			= 'qxh-';
		HexaGon.IdPrefix			= 'qxh_';
		HexaGon.Source				= HexaGon.ClassPrefix+'source-'
		HexaGon.Template			= HexaGon.ClassPrefix+'template-';
		HexaGon.FragmentSpan		= '<span class="'+HexaGon.ClassPrefix;
		HexaGon.FragmentDiv			= '<div class="'+HexaGon.ClassPrefix;
		HexaGon.FragmentFset		= '<fieldset class="'+HexaGon.ClassPrefix+'field-set';
		HexaGon.FragmentFsetSubClass = HexaGon.FragmentFset+' '+HexaGon.ClassPrefix;
		HexaGon.FragmentSuffix		= '" />';
		// NOTE Stitch together the Elements
		HexaGon.formText		= HexaGon.FragmentSpan+'formtext'+HexaGon.FragmentSuffix;
		HexaGon.formRangeOne	= HexaGon.FragmentSpan+'range-1'+HexaGon.FragmentSuffix;
		HexaGon.formRangeTwo	= HexaGon.FragmentSpan+'range-2'+HexaGon.FragmentSuffix;
		HexaGon.formRangeGeo	= HexaGon.FragmentSpan+'geo'+HexaGon.FragmentSuffix;
		HexaGon.formFieldSet	= HexaGon.FragmentFset+HexaGon.FragmentSuffix;
		HexaGon.sMemLangWrap	= HexaGon.FragmentFsetSubClass+'set--language'+HexaGon.FragmentSuffix;
		HexaGon.sMemFsOneWrap	= HexaGon.FragmentFsetSubClass+'set--sex'+HexaGon.FragmentSuffix;
		HexaGon.sMemFsTwoWrap	= HexaGon.FragmentFsetSubClass+'set--specify'+HexaGon.FragmentSuffix;
		HexaGon.sMemFsThreeWrap	= HexaGon.FragmentFsetSubClass+'set--savesettings'+HexaGon.FragmentSuffix;

		// NOTE HexaGon Classes
		HexaGon.ClassMakeClubsGrid	= HexaGon.ClassPrefix+'grid-container';
		HexaGon.ClassForm			= HexaGon.ClassPrefix+'form';
		HexaGon.ClassSearch			= HexaGon.ClassForm+'-search';
		HexaGon.ClassMemSearchNear	= HexaGon.ClassSearch+'--near-by';
		// NOTE Stitch together the Body Source & Template classes
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
		HexaGon.ClassClubMembers	= HexaGon.Template+HexaGon.bodyURL[1]+'-members';
		HexaGon.ClassClub			= HexaGon.ClassPrefix+'club-'+HexaGon.Club_Id[1];
		HexaGon.ClassClubMain		= HexaGon.ClassPrefix+'club-'+HexaGon.ClubMain_Id[1];
		HexaGon.ThreadId			= HexaGon.IdPrefix+"thread_"+HexaGon.Thread_Id[1];
		HexaGon.CatId				= HexaGon.IdPrefix+"category_"+HexaGon.Categori_Id[1];
		HexaGon.ScribbleId			= HexaGon.IdPrefix+"club_"+HexaGon.Club_Id[1]+"_scribble"
	};
	// NOTE SetUp the body with classes and ID's
	HexaGon.setBody = function() {
		// NOTE Set som uniqe body ID's and classes for clubs
		HexaGon.SetClubs = function() {
			if ( HexaGon.Discussions || HexaGon.Scribble > -1 ) {
				if ( HexaGon.Discussions > -1 ) {
					if( HexaGon.ThredURL > -1 ) HexaGon.Body.attr( "id", HexaGon.ThreadId );
					if( HexaGon.CatURL > -1 ) HexaGon.Body.attr( "id", HexaGon.CatId );
					else if( HexaGon.ClubURL > -1 ) HexaGon.Body.addClass( HexaGon.ClassClub ), HexaGon.MakeClubsGrid.addClass( HexaGon.ClassMakeClubsGrid );
				}
				if ( HexaGon.Scribble > -1 ) HexaGon.Body.attr( "id", HexaGon.ScribbleId );
			}
			if ( HexaGon.ClubMain || HexaGon.ClubMembers > -1 ) {
				if( HexaGon.ClubMain > -1 ) HexaGon.Body.addClass( HexaGon.ClassClubMain ), HexaGon.MakeClubsGrid.addClass( HexaGon.ClassMakeClubsGrid );
				if ( HexaGon.ClubMembers > -1 ) HexaGon.Body.addClass( HexaGon.ClassClub );
			};
		};
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
		if(HexaGon.ClubMembers		> -1) HexaGon.Body.addClass(HexaGon.ClassClubMembers);
		if(HexaGon.msgSent 			> -1) HexaGon.Body.addClass(HexaGon.ClassSendmsg);
		if(HexaGon.Updated 			> -1) HexaGon.Body.addClass(HexaGon.ClassUpdated);
		if(HexaGon.InfoPolicy		> -1) HexaGon.Body.addClass(HexaGon.ClassInfoPolicy);
		if(HexaGon.InfoContact		> -1) HexaGon.Body.addClass(HexaGon.ClassInfoContact);
		if(HexaGon.InfoTechnical	> -1) HexaGon.Body.addClass(HexaGon.ClassInfoTechnical);
		if(HexaGon.InfoStatistics	> -1) HexaGon.Body.addClass(HexaGon.ClassInfoStatistics);
		if(HexaGon.InfoAdvertise	> -1) HexaGon.Body.addClass(HexaGon.ClassInfoAdvertise);
		if(HexaGon.InfoGdpr			> -1) HexaGon.Body.addClass(HexaGon.ClassInfoGdpr);
		if(HexaGon.InfoFaq			> -1) HexaGon.Body.addClass(HexaGon.ClassInfoFaq);
	};
	// NOTE Clean out unwanted stuff
	HexaGon.ClassCleanHTML = function() {
		// NOTE HACK to fix the warning icon not displaying
		/*if(HexaGon.msgOld > -1) {
			var delay = 3000;
			setTimeout(function() {
			HexaGon.WarningImg
				.removeAttr('hidden')
				.removeAttr('style')
				.addClass('qxh-warning');
			}, delay);
		};*/
		// NOTE Deletes the whitespace text only nodes
		// https://stackoverflow.com/a/11633703/6820262
		HexaGon.DeleteWhiteSpace = function() {
			HexaGon.RemoveWhiteSpace.contents().filter(function() {
				return this.nodeType == 3;
			}).remove();
		};
		// NOTE Run the above
		HexaGon.DeleteWhiteSpace();
	};
	// NOTE Fix the search forms
	HexaGon.SetUpMemberSearch = function() {
		if ( HexaGon.sMemUrlClose > -1 ) {
			var WrapInlineText = function() {
				var WrapText = $.Deferred();

				HexaGon.sMemIClean.contents().filter(function() {
					return this.nodeType == 3 && $.trim(this.nodeValue).length;
				}).wrap( HexaGon.sMemCleanWrap );
				console.log('We are done with text nodes, jump over to the fields');

				return WrapText;
			};
			var WrapFormFields = function() {
				var sMemFsOne = $('select[name="sex"], input[name="lowerage"], input[name="lowerage"] + span.qxh-formtext, input[name="upperage"], input[name="upperage"] + span.qxh-formtext');
				var WrapFields = $.Deferred();

				HexaGon.sMemLang.wrapAll( HexaGon.sMemLangWrap ),
				sMemFsOne.wrapAll( HexaGon.sMemFsOneWrap ),
				//HexaGon.sMemFsOne.wrapAll( HexaGon.sMemFsOneWrap ),
				HexaGon.sMemFsTwo.wrapAll( HexaGon.sMemFsTwoWrap ),
				HexaGon.sMemFsThree.wrapAll( HexaGon.sMemFsThreeWrap );
				console.log('Stitching fields and text together is done, so lets get the broom');

				return WrapFields;
			};
			var CleanUp = function() {
				var qFieldSet = $('fieldset');
				var sMemFsTwoCleanUp = $('fieldset.qxh-set--specify');
				var sMemFsThreeCleanUp = $('fieldset.qxh-set--savesettings');
				var TheBroom = $.Deferred;

				if ( qFieldSet.parent().is('div') ) qFieldSet.unwrap();
				if ( sMemFsTwoCleanUp.parent().is('div') ) sMemFsTwoCleanUp.unwrap();
				if ( sMemFsThreeCleanUp.parent().is('div') ) sMemFsThreeCleanUp.unwrap();
				// TODO Is Not working for some reason here
				//if ( HexaGon.sMemFsOneCleanUp.parent().is('div') ) HexaGon.sMemFsOneCleanUp.unwrap();
				//if ( HexaGon.sMemFsTwoCleanUp.parent().is('div') ) HexaGon.sMemFsTwoCleanUp.unwrap();
				//if ( HexaGon.sMemFsThreeCleanUp.parent().is('div') ) HexaGon.sMemFsThreeCleanUp.unwrap();
				HexaGon.sMembForm.contents().filter(function() {
					return this.nodeType == 3;
				}).remove();
				HexaGon.sMemObsoleteClean.remove();
				HexaGon.sMembForm.addClass( HexaGon.ClassMemSearchNear );
				console.log('Form cleaned up and ready to use');

				return TheBroom;
			};

			// Credits for the function set up: http://willmclean.net/calling-one-jquery-function-only-after-another-function-has-run/
			WrapInlineText().done( WrapFormFields() ),
			WrapFormFields().done( CleanUp() );
		};
		if ( HexaGon.sMemUrlTheRest > -1 ) {
			var WrapInlineText = function() {
				var WrapText = $.Deferred();

				HexaGon.sMemIClean2.contents().filter(function() {
					return this.nodeType == 3 && $.trim(this.nodeValue).length;
				}).wrap( HexaGon.sMemCleanWrap );

				return WrapText;
			};
			var WrapFormFields = function() {
				var sMemFsOne = $('select[name="sex"], input[name="lowerage"], input[name="lowerage"] + span.qxh-formtext, input[name="upperage"], input[name="upperage"] + span.qxh-formtext');
				var WrapFields = $.Deferred();

				HexaGon.sMemLang.wrapAll( HexaGon.sMemLangWrap ),
				sMemFsOne.wrapAll( HexaGon.sMemFsOneWrap ),
				HexaGon.sMemFsTwo.wrapAll( HexaGon.sMemFsTwoWrap ),
				HexaGon.sMemFsDist.wrapAll( HexaGon.sMemFsDistWrap ),
				HexaGon.sMemFsThree.wrapAll( HexaGon.sMemFsThreeWrap );

				return WrapFields;
			};
			var CleanUp = function() {
				var qFieldSet = $('fieldset');
				var sMemFsTwoCleanUp = $('fieldset.qxh-set--specify');
				var sMemFsThreeCleanUp = $('fieldset.qxh-set--savesettings');
				var TheBroom = $.Deferred;

				if ( qFieldSet.parent().is('div') ) qFieldSet.unwrap();
				if ( sMemFsTwoCleanUp.parent().is('div') ) sMemFsTwoCleanUp.unwrap();
				if ( sMemFsThreeCleanUp.parent().is('div') ) sMemFsThreeCleanUp.unwrap();
				HexaGon.sMembForm.contents().filter(function() {
					return this.nodeType == 3;
				}).remove();
				HexaGon.sMemObsoleteClean.remove();

				return TheBroom;
			};

			WrapInlineText().done( WrapFormFields() ),
			WrapFormFields().done( CleanUp() );
		};
	};
	// NOTE Resize popups
	HexaGon.reSize = function() {
		// NOTE Our Send msg window
		if(HexaGon.msgSend	> -1) window.resizeTo('450', '800');
		// NOTE The satellite
		if(HexaGon.satellite > -1) window.resizeTo('320', '500');
	};
	// NOTE This is stuff that we realy need to make sure they have been executed!
	function addSprite() {
		// NOTE pngBeGone
		var hq_Body				= $(document.body);
		var hq_ClassPrefix		= 'qxh-';
		var hq_ClassIcon		= hq_ClassPrefix+'icon';
		var hq_ClassSprite		= hq_ClassPrefix+'sprite-icon';
		var hq_SVGsprite		= '<svg xmlns="http://www.w3.org/2000/svg" class="qx-sprite qx-icon" style="display: none !important;"><symbol id="action-abuse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" xml:space="preserve"><path fill="#DD2E44" d="M18 0a18 18 0 1 0 0 36 18 18 0 0 0 0-36zm13 18c0 2.6-.8 5-2 7L11 7a13 13 0 0 1 20 11zM5 18c0-2.6.8-5 2-7l18 18A13 13 0 0 1 5 18z"/></symbol><symbol id="action-add" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.5 438.5" xml:space="preserve"><path  d="M409.1 109.2A218.3 218.3 0 0 0 219.3 0 218.3 218.3 0 0 0 0 219.3a218.3 218.3 0 0 0 219.3 219.3 218.3 218.3 0 0 0 219.3-219.3c0-39.8-9.9-76.5-29.5-110.1zm-62 128.3c0 5-1.7 9.3-5.3 12.9a17.6 17.6 0 0 1-12.9 5.4h-73V329c0 5-1.9 9.2-5.5 12.9a17.6 17.6 0 0 1-12.9 5.4H201c-5 0-9.2-1.8-12.9-5.4-3.6-3.7-5.4-8-5.4-12.9v-73h-73c-5 0-9.3-1.9-13-5.5a17.5 17.5 0 0 1-5.3-12.9V201c0-5 1.8-9.2 5.4-12.9 3.6-3.6 7.9-5.4 12.8-5.4h73.1v-73c0-5 1.8-9.3 5.5-13 3.6-3.5 7.8-5.3 12.8-5.3h36.5c5 0 9.3 1.8 12.9 5.4 3.6 3.6 5.4 7.9 5.4 12.8v73.1H329c5 0 9.2 1.8 12.9 5.4 3.6 3.7 5.4 8 5.4 12.9v36.5z"/></symbol><symbol id="action-delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 62" xml:space="preserve"><circle fill="red" stroke="red" stroke-width="2" stroke-opacity=".5" cx="31" cy="31" r="25.8"/><g fill="#fff"><path transform="rotate(-45)" d="M-17.6 40.2h35.3v7.2h-35.3z"/><path transform="rotate(-45)" d="M-3.6 26.1h7.2v35.4h-7.2z"/></g></symbol><symbol id="action-edit-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371 372" xml:space="preserve"><path  d="M149 297c40 0 74-33 74-74V75c-41 0-74 33-74 74v148zM75 163V75h60s-45 10-45 88M260 75h37v37h-15c-2-29-22-37-22-37z"/></symbol><symbol id="action-edit" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.6 489.6" xml:space="preserve"><path  d="M53.6 167V437h270.2V318.7a368 368 0 0 0 37.2-27.9c2.8-2.2 8.3-6.7 15.4-13.5v186a26.3 26.3 0 0 1-26.3 26.3H27.3A26.3 26.3 0 0 1 1 463.3V140.6a26.3 26.3 0 0 1 26.3-26.3H115c-9.6 16.4-17.8 34-24.7 52.6H53.6zM482.3 4c-9-1.5-20-2.5-32.5-3.2h-3.2l-5.8-.4h-.3l-4.8-.2h-.1c-87-2.9-147.6 23-147.6 23-82.5 33.4-139.3 93.1-165 184.2-8.2 29.5-5.6 60.2-1.4 90.4.5 2.8 2 7 10.8 1.3a409.9 409.9 0 0 1 81.4-131C257.7 119.5 307 80.8 368 56.5c11.2-4.5 21.9-7.9 33.3-11.8.4 1-.5 2-1.4 2.4l-1 .3a330 330 0 0 0-88.5 53 612 612 0 0 0-117 128.2A660.6 660.6 0 0 0 103.8 408s-3.6 16.1 8.6 4.4l53.8-66.9a8 8 0 0 1 2.3-2.8 12 12 0 0 1 4.2-2.3c24.5-9.2 49.3-17.6 73-28.4a364 364 0 0 0 87.7-55c2.9-2.3 32-25 62.6-72l1.4-2 .6-1a450.8 450.8 0 0 0 22.2-39.5l-61.7-8.4s69.8-9.9 80-32.5c.7-1.2 1.4-3.3 1.9-4.6 5.4-12.2 10.9-25.7 17-36.9 1.9-5.8 15.8-30.5 30-45 3.4-3.7 0-10.3-5-11z"/></symbol><symbol id="action-flirt" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 569 569" xml:space="preserve"><path  d="M427 38C384 13 336 0 284 0A283 283 0 0 0 38 427a283 283 0 0 0 389 104 283 283 0 0 0 104-389c-26-44-60-78-104-104zm-2 200c-2 9-5 16-9 22L286 435 157 260a59 59 0 0 1-7-54c4-12 11-21 23-29 10-6 20-10 31-9 10 0 19 2 27 6 7 4 14 10 20 17 9 10 21 14 35 14 15 0 27-4 36-14 6-7 12-13 20-17a56 56 0 0 1 58 3c11 8 19 17 23 29 3 12 4 23 2 32z"/></symbol><symbol id="action-info-close" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" xml:space="preserve"><path  d="M32 240c-49-79-13-143 81-143h774c94 0 130 64 81 143L591 844c-49 79-129 79-179 0L32 240z"/></symbol><symbol id="action-info-open" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" xml:space="preserve"><path  d="M146 909V92a82 82 0 0 1 136-61l539 404a82 82 0 0 1 0 130L276 974a81 81 0 0 1-130-65z"/></symbol><symbol id="action-logout" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" xml:space="preserve"><path d="M4813 4994a624 624 0 0 1-391-402c-29-85-31-271-27-1752l6-1658 48-96a674 674 0 0 1 297-297c136-67 377-67 517 0a694 694 0 0 1 297 297l48 96v3392l-48 96a680 680 0 0 1-297 295 679 679 0 0 1-450 29z" transform="matrix(.1 0 0 -.1 0 512)"/><path d="M2953 3261c-72-19-377-213-571-364a4285 4285 0 0 1 715-7236c424-207 759-316 1236-396 345-60 997-60 1342 0 466 80 805 187 1217 387a4330 4330 0 0 1 2262 2752c102 389 130 635 132 1091 2 464-21 657-124 1071a4335 4335 0 0 1-1921 2597c-194 117-276 131-345 64-42-42-42-54-48-585-8-667-17-630 263-924 253-262 333-360 467-565 215-332 351-667 437-1074 64-293 64-837 2-1144a3099 3099 0 0 0-2486-2453c-266-52-814-46-1096 9A3063 3063 0 0 0 2269 875c150 301 297 500 629 843 176 186 226 248 245 317 17 61 21 235 17 615-5 481-9 535-40 569-40 44-99 60-167 42z" transform="matrix(.1 0 0 -.1 0 512)"/></symbol><symbol id="action-reload" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280" xml:space="preserve"><path d="M154 131l8-19c2-5 0-13-5-16C125 74 15 13 3 151c0 6-1 7-2 1-2-21-3-68 24-92l18-14c18-11 63-31 127 3 5 3 11 1 12-5l4-21c2-6 5-7 8-2l53 88c3 5 1 10-5 11l-82 18c-6 1-9-2-6-7zm82 108c-18 12-63 32-127-2-5-3-11-1-13 5l-6 16c-1 5-5 6-8 0l-42-80c-3-5-1-11 5-13l70-21c6-2 9 1 7 7l-6 22c-1 6 1 14 6 17 33 21 143 80 155-57 1-6 2-6 2 0 2 21 2 68-25 93l-18 13z"/></symbol><symbol id="action-remove" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.334 95.334" xml:space="preserve"><path d="M47.667 0C21.341 0 0 21.341 0 47.667s21.341 47.667 47.667 47.667 47.667-21.341 47.667-47.667S73.993 0 47.667 0zm32.771 56.641H14.896a1.561 1.561 0 0 1-1.561-1.562V40.254c0-.862.699-1.561 1.561-1.561h65.542c.862 0 1.562.699 1.562 1.561v14.825a1.563 1.563 0 0 1-1.562 1.562z"/></symbol><symbol id="action-zero" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve"><path d="M30 418H0c0 42 34 76 76 76v-30c-25 0-46-21-46-46m0-165H0v62h30v-62zM0 150h30c0-26 21-46 46-46V74c-42 0-76 34-76 76m30 185H0v62h30v-62zm0-162H0v62h30v-62zm392 27l-26 35h26v-35zM322 99V74h-61v30h56l5-5M99 495h61v-30H99v30zm293-98h30v-62h-30v62zm-47 67v30c42 0 76-34 76-76h-30c0 25-20 46-46 46m47-149h30v-62h-30v62zM99 104h61V74H99v30zm81 0h62V74h-62v30zm0 391h62v-30h-62v30zm81 0h61v-30h-61v30zM500 17c-141 86-243 195-289 250L99 179l-50 40 195 197c33-86 139-253 268-372l-12-27z"/></symbol><symbol id="club-hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#B3404A" xml:space="preserve"><path d="M256 421c-58 0-120-27-180-79-45-38-72-76-73-78-4-5-4-11 0-16 1-2 30-41 76-81 60-50 119-76 177-76s117 26 177 76c46 40 75 79 76 81 4 5 4 11 0 16 0 1-23 32-59 66a14 14 0 1 1-19-20c24-22 42-43 50-54-10-13-34-41-66-68-37-32-95-70-159-70s-122 38-159 70c-32 27-56 55-66 68 24 30 117 138 225 138 34 0 69-11 105-31a14 14 0 1 1 14 23c-41 23-80 35-119 35z"/><path d="M256 421a165 165 0 1 1 165-165 14 14 0 1 1-27 0 138 138 0 1 0-138 138 14 14 0 1 1 0 27z"/><circle fill="#FFF" cx="256" cy="256" r="86"/><path d="M256 355a99 99 0 1 1 0-199 99 99 0 0 1 0 199zm0-171a72 72 0 1 0 0 144 72 72 0 0 0 0-144z"/><path d="M437 451c-3 0-7-2-10-4L65 85a14 14 0 0 1 20-20l362 362a14 14 0 0 1-10 24z"/></symbol><symbol id="club-xxx" fill="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 328.9 328.9" xml:space="preserve"><path d="M104 220.4v-89.3H83.4v-22.8h49.1v112.1H104zM239.6 137.2c0 9.8-5.3 18.4-14.1 23.2a30.7 30.7 0 0 1 20 28.4c0 20.1-18 33-46 33s-45.9-12.7-45.9-32.6c0-12.8 8.4-23.6 21.3-28.8a28.2 28.2 0 0 1-15.5-24c0-17.9 15.7-29.2 40-29.2 24.6 0 40.2 11.6 40.2 30zm-59 49.2c0 9.4 6.6 14.7 19 14.7 12.3 0 19.2-5.1 19.2-14.7 0-9.3-7-14.6-19.2-14.6-12.4 0-19 5.3-19 14.6zm2.8-47.6c0 8 5.8 12.5 16.2 12.5 10.4 0 16.1-4.5 16.1-12.5 0-8.3-5.7-13-16.1-13-10.4 0-16.2 4.7-16.2 13z"/><path d="M292.9 121a135.7 135.7 0 0 1-128.4 179A135.7 135.7 0 0 1 28.8 164.4 135.7 135.7 0 0 1 207.9 36V5.8A164.6 164.6 0 0 0 0 164.4C.1 255.1 73.9 329 164.5 329a164.7 164.7 0 0 0 158.6-208H293z"/><path d="M284.7 44.1V12.6H262v31.5h-31.4v22.7H262v31.5h22.7V66.8h31.5V44.1z"/></symbol><symbol id="clubs-header-xxx" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.5 16" fill="#ee2d24" xml:space="preserve"><path d="M11.3.6c6-2.2 7.4 2.4 16.1 3s12.8-2 13-.8c1.2 5.7-14.8 14.4-26.1 13-7.9-.8-10.7-11-3-15.2z"/><path d="M.9 4.2c4-2.2 5.9.3 7.1 1.5 1.1 0 1.1-.9.3-1.6C6.2 2 .4-.8 0 1.3c-.1.4.5 3.2.9 3z"/></symbol><symbol id="clubs-header" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve"><path d="M10 3c4.4 0 8 2.8 8 6.4 0 3-3 6.3-7.9 6.3-1.6 0-2.7-.3-3.7-.6-1 .6-1.3.8-3 1.4.4-1.5.4-2.2.3-3.2-.9-1-1.7-2.1-1.7-3.9C2 5.9 5.6 3 10 3zm0-2C4.7 1 0 4.5 0 9.4c0 1.7.6 3.4 1.7 4.7 0 1.5-.9 3.7-1.7 5.3 2.2-.4 5.3-1.3 6.6-2.1 1.2.3 2.3.4 3.4.4 5.9 0 9.9-4 9.9-8.3C20 4.5 15.2 1 10 1zm11.5 11.2l-.6 1.4c1.7 1.3 2.3 3.2.5 5.4l.1 1.9c-.9-.3-1-.4-1.7-.8-2.1.5-4.3.7-6.1-.9l-1.7.4c1.5 1.9 4.3 2.9 7.6 2.1.9.6 2.9 1.1 4.4 1.4-.5-1-1.1-2.5-1.1-3.5a5 5 0 0 0-1.4-7.4zm-15-3.8c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1 1.1-.5 1.1-1.1-.5-1.1-1.1-1.1zm3.5 0c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1 1.1-.5 1.1-1.1-.5-1.1-1.1-1.1zm3.5 0c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1 1.1-.5 1.1-1.1-.5-1.1-1.1-1.1z"/></symbol><symbol id="default-avatar" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve"><path d="M262 213c86-1 151-45 162-77 15-39-65-19-65-19S346 21 314 4c-28-14-37 13-52 15-15-2-24-29-52-15-32 17-44 113-44 113s-81-20-66 19c12 32 77 76 162 77zm107 42h-12c-10 28-43 52-94 52-37 0-65-13-81-31l2-7c0-12-10-21-21-21-10-16-29-35-56-29-1 14 6 26 16 36-14 1-29 8-37 24 16 15 42 14 59 3 4 5 10 8 16 8 18 92 102 113 102 113s106-27 106-148zM111 456s5-1 4 4l-5 35-1 1-1-1-6-35c-1-5 4-4 4-4v-11H83v11s5-1 5 4l-6 35-1 1-1-1-6-35c0-5 5-4 5-4v-11H55v11s4-1 5 4l10 52h19l3-17 3 17h29l10-52c1-5 5-4 5-4v-11h-28v11zm83 41l-10-52h-29l-10 52c-1 5-5 4-5 4v11h27v-11s-6 1-5-4l1-6h11l2 6c0 5-5 4-5 4v11h28v-11s-4 1-5-4zm-29-17l3-18c0-2 1-1 1-1l1 1 3 18h-8zm79-24s5-1 5 4v22l-15-35c-1-2-5-2-4-2h-25v11s6-1 6 4v37c0 5-6 4-6 4v11h28v-11s-5 1-5-4v-29l17 42 4 2h19v-11s-5 1-5-4v-37c0-5 5-4 5-4v-11h-24v11zm30 9h8c0-3 0-8 4-9h4s6-1 6 4v37c0 5-6 4-6 4v11h28v-11s-5 1-5-4v-37c0-5 5-4 5-4h4c5 1 5 6 5 9h7v-20h-60v20zm66-9s6-1 6 4v37c0 5-6 4-6 4v11h51v-25h-8c0 4 0 14-6 14h-7s-5 1-5-4v-12c0-2 2-2 2-2h2c4 0 4 6 4 7h5v-22h-5c0 2 0 8-4 8h-2s-2 0-2-3v-13c0-5 5-4 5-4h7c6 0 6 10 6 14h8v-25h-51v11zm93-11h-36v11s6-1 6 4v37c0 5-6 4-6 4v11h36c13 0 24-10 24-29v-10c0-18-11-28-24-28zm1 49c0 4-3 7-6 7 0 0-6 1-6-4v-37c0-5 6-4 6-4 3 0 6 3 6 6v32z"/></symbol><symbol id="default-club" fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 570 570" xml:space="preserve"><path d="M266 95c0 3-2 6-4 9 75 64 101 4 4-9zm-4 11l-1-1 1 1zm-13-32v-1 1zm18 18zm-21-18c-12-98-66-76-8 3 2-1 5-3 8-3zm17 7l3 9c98-11 76-66-3-9zm0-2l-1 1 1-1zm-28 25l-1 1 1-1zm-6-12zm2-2c0-4 1-7 4-9-75-62-101-3-4 9zm20-16c3 0 6 2 9 4 62-75 3-101-9-4zm-17 29l-3-9c-99 13-78 67 3 9zm2-24l-1-1 1 1zm4 14l2 4v1l1 1 4 1 1 1h1l1-1 3-1 1-1h1v-1l2-4v-2l-2-4v-1l-1-1-4-1-1-1h-1l-1 1-3 1-1 1-1 1-2 4v2z"/><path d="M495 196c100-43 27-115-15-16 42-99-68-99-23 0-45-99-115-27-15 16-100-43-100 67 0 23-100 44-30 114 15 15-19 41-11 65 2 72v40c-5-7-11-10-18-11-11-1-27 7-46-5 2 48 44 61 57 53l7-5v30H325v-9l6 2c11 2 38-20 25-56-10 14-23 13-31 17v-14c6-7 8-21 0-42 29 62 76 15 9-14 68 30 68-46 0-16 68-30 18-79-11-11 29-68-46-68-16 0-30-68-78-19-10 11-17-8-30-9-39-6V148c18 53 50 27 1-41h-1l-8 4h-2l-2-1a18 18 0 0 1-9-4c-56 66-18 94 2 35v267H124v-41l10 7c12 8 54-6 56-54-19 13-35 4-46 6-7 0-14 4-20 13v-34c12-9 19-33 2-71 42 99 115 29 16-15 99 44 99-66 0-23 99-43 26-115-16-16 42-99-68-99-23 0-45-99-114-27-15 16-99-43-99 67 0 23-99 44-30 114 15 15-19 41-11 65 2 72v22l-8-2c-11-2-27 7-46-6 2 46 40 60 54 55v33H19c-10 0-19 8-19 19v115c0 10 9 19 19 19h497c11 0 20-9 20-19V427c0-11-9-19-20-19h-38V305c12-9 18-33 2-71 42 99 115 29 15-15 100 44 100-66 0-23zm-394 11a13 13 0 1 1 27 0 13 13 0 0 1-27 0zm222 76a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-65 15c9 2 22 1 39-6-67 30-22 77 9 13-10 23-7 38 0 44v59h-48V298zm230 129a19 19 0 1 1 0 38H48a19 19 0 1 1 0-38h57v29h19v-29h115v29h19v-29h48v29h19v-29h134v29h19v-29h10zm-20-207a13 13 0 1 1 0-27 13 13 0 0 1 0 27z"/></symbol><symbol id="member-blog" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.28 21.28" xml:space="preserve"><path d="M6.75 20.53a7.16 7.16 0 0 1-4.78-1.81 6.32 6.32 0 0 1-1.44-1.99A5.74 5.74 0 0 1 0 14.3V7c0-.84.18-1.65.53-2.41a6.47 6.47 0 0 1 3.6-3.35C4.94.92 5.82.75 6.74.75h4.7a6 6 0 0 1 1.42.37 8.7 8.7 0 0 1 2.82 1.78c.4.39.73.81.97 1.26l.18.35c.06.1.1.22.15.36a5.95 5.95 0 0 1 .3 1.43l.15 1.02c.05.3.18.52.39.67.12.1.33.18.62.2.3.04.6.06.9.07.3 0 .59.02.86.03.26 0 .44.05.53.13l.29.22.2.39.05.27-.05 5.03c0 .85-.18 1.65-.53 2.41a6.31 6.31 0 0 1-3.6 3.3 7.2 7.2 0 0 1-2.62.5H6.75v-.01zm.08-14.64c-.37 0-.67.12-.92.35a1.12 1.12 0 0 0 0 1.68c.25.23.55.35.92.35h3.73c.36 0 .67-.12.93-.36a1.1 1.1 0 0 0 0-1.66 1.32 1.32 0 0 0-.93-.36H6.83zm-1.3 8.5c0 .27.12.5.38.7.25.2.55.3.92.3h7.6c.36 0 .66-.1.9-.3.25-.2.37-.43.37-.7 0-.28-.12-.5-.36-.7a1.45 1.45 0 0 0-.91-.28h-7.6c-.37 0-.67.1-.92.28a.84.84 0 0 0-.38.7z"/></symbol><symbol id="member-buffs" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 457 457" xml:space="preserve"><path id="hand" d="M441 253c11-12 16-26 16-43 0-15-6-28-16-38a53 53 0 0 0-39-17h-79a72 72 0 0 1 5-13l3-5 8-16a117 117 0 0 0 3-77c-1-4-4-8-7-13s-7-8-11-11c-5-3-10-6-17-8s-15-3-24-3c-5 0-9 2-13 6a85 85 0 0 0-15 29l-3 17a718 718 0 0 1-9 31l-9 14-29 34-29 35c-10 11-17 16-22 17-4 0-8 2-12 5-3 4-5 8-5 13v183c0 5 2 9 5 13 4 3 8 5 13 5 7 0 22 5 45 13a1573 1573 0 0 0 70 19c14 3 28 5 41 5h36c26-1 45-8 57-23 11-13 15-30 14-51 7-7 12-16 15-27 3-12 3-23 0-34 9-11 13-24 12-39 0-6-1-13-4-21z"/><path id="cuffs" d="M101 192H18c-5 0-9 2-13 5-3 4-5 8-5 13v183c0 5 2 9 5 13 4 3 8 5 13 5h83c4 0 9-2 12-5 4-4 6-8 6-13V210c0-5-2-9-6-13-3-3-8-5-12-5zM68 369c-4 4-8 6-13 6s-10-2-13-6c-4-3-5-8-5-13s1-9 5-13c3-3 8-5 13-5s9 2 13 5c3 4 5 8 5 13s-2 10-5 13z"/></symbol><symbol id="member-chat" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve"><path d="M256 32C124 32 16 113 16 213c0 57 35 108 89 142-8 21-20 45-37 70 42 18 90-9 123-37 21 5 43 7 65 7 133 0 240-81 240-182 0-100-107-181-240-181z"/></symbol><symbol id="member-diary" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492" xml:space="preserve"><path d="M381 372c-14 0-26 12-26 26v54l80-80h-54zm53 120c23 0 42-19 42-42v-71L362 492h72z"/><path d="M434 0H100C78 0 59 18 58 41h40a56 56 0 1 1 0 90H58v70h40a56 56 0 0 1 89 45 56 56 0 0 1-89 45H58v71h40a56 56 0 1 1 0 90H58c1 22 20 40 42 40h222v-94c0-33 26-59 59-59h95V42c0-23-19-42-42-42z"/><path d="M37 106h71c5 6 14 11 23 11a31 31 0 1 0-23-51H37a20 20 0 0 0 0 40zm0 160h71a31 31 0 0 0 54-20 31 31 0 0 0-54-20H37a20 20 0 0 0 0 40zm94 172a31 31 0 1 0-23-51H37a20 20 0 0 0 0 40h71c5 6 14 11 23 11z"/></symbol><symbol id="member-guestbook" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510" xml:space="preserve"><path d="M315 198l-3-2a9 9 0 0 1-1-4v-4l-18 17h3a39 39 0 0 0 24-4 48 48 0 0 1-5-3z"/><path d="M391 202a114 114 0 0 1-36 6 92 92 0 0 1-12-1l-2 2a57 57 0 0 1-39 15h-8l-23-3a9 9 0 0 1-5-16l46-43 1-1a194 194 0 0 1 26-65 755 755 0 0 0-116 15v316a982 982 0 0 1 168-17V202z"/><path d="M494 16c-33 5-83 19-117 59a207 207 0 0 0-45 85A761 761 0 0 1 494 16zM335 187c18 5 62 8 122-52 21-21 34-56 47-90l6-17c-39 26-118 83-175 159z"/><path d="M410 411c0 10-8 18-19 18a907 907 0 0 0-177 19 9 9 0 0 1-2-1c-61-15-150-17-175-18-10 0-18-8-18-18V122H0v335h158c11 0 19 8 19 19v18h74v-18c0-11 9-19 19-19h158V183a183 183 0 0 1-18 11v217z"/><path d="M37 411c56 0 113 5 168 16V111C144 97 62 94 37 94v317z"/></symbol><symbol id="member-ignored" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510"><path d="M255 510c28 0 51-23 51-51H204c0 28 23 51 51 51zm166-153V217c0-79-54-143-128-161V38c0-20-18-38-38-38s-38 18-38 38v18C143 74 89 138 89 217v140l-51 51v26h434v-26l-51-51zM319 199l-72 87h72v46H191v-46l72-87h-72v-46h128v46z"/></symbol><symbol id="member-info" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" xml:space="preserve"><path d="M62.2 0c6.7 0 10 4.6 10 9.8 0 6.5-5.8 12.5-13.4 12.5-6.3 0-10-3.7-9.9-9.9C49 7.2 53.4 0 62.2 0zM41.5 100c-5.2 0-9.1-3.3-5.4-17.6l6-25.5c1.1-4 1.3-5.7 0-5.7a40 40 0 0 0-12.5 5.6L27 52.4c12.9-11 27.7-17.3 34-17.3 5.3 0 6.2 6.3 3.5 16.1l-7 26.8c-1.2 4.7-.6 6.3.6 6.3 1.6 0 6.8-2 11.9-6l3 4C60.5 95.2 46.8 100 41.5 100z"/></symbol><symbol id="member-messages" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612" xml:space="preserve"><path d="M593 76H19l287 230L593 76zM0 111v379l2 13 211-218L0 111zm306 251l-63-53L21 536h564L368 309l-62 53zm306-250L400 285l210 218 2-13V112z"/></symbol><symbol id="member-movie" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 267 267" xml:space="preserve"><path d="M0 41v185c91 34 176-35 267 0V41C176 6 91 75 0 41zm49 180c-15-1-23-2-38-7v-33c15 5 23 7 38 7v33zm0-120c-15 0-23-2-38-7V62c15 5 23 6 38 7v32zm71 111c-16 4-23 6-38 7v-32l38-7v32zm0-119l-38 7V67c15-2 22-3 38-7v33zm65 106l-38 7v-32c15-4 22-5 38-7v32zM147 87V54l38-7v33c-15 2-23 3-38 7zm71-41c16 0 21 1 38 7v32c-17-5-22-6-38-7V46zm0 119c16 1 21 2 38 7v33c-17-5-22-6-38-7v-33z"/></symbol><symbol id="member-padlock" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487 487" xml:space="preserve"><path d="M404 197h-10v-45a151 151 0 1 0-302 0v45h-9c-15 0-27 15-27 33v223c0 19 12 34 27 34h321c14 0 26-15 26-34V230c0-18-12-33-26-33zM273 341v68c0 7-6 14-14 14h-32c-7 0-14-7-14-14v-68a40 40 0 0 1 26-69h9c21 1 37 19 37 41 0 11-4 21-12 28zm59-144H155v-45c0-49 40-89 88-89 49 0 89 40 89 89v45z"/></symbol><symbol id="member-photo-album" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve"><path d="M495 38H86c-10 0-18 8-18 18v17H51c-9 0-17 7-17 17v17H17c-9 0-17 7-17 17v333c0 9 8 17 17 17h410c9 0 17-8 17-17v-17h17c9 0 17-8 17-18v-17h17c10 0 17-7 17-17V56c0-10-7-18-17-18zm-68 276l-45-51c-3-4-9-4-13 0l-54 62-147-131c-3-3-8-3-11 0L17 318V132c0-4 4-8 9-8h392c5 0 9 4 9 8v182zm26 108h-9V124c0-10-8-17-17-17H51v-9c0-5 4-8 9-8h392c5 0 9 3 9 8v316c0 5-4 8-8 8zm34-34h-9V90c0-10-7-18-17-18H86v-8c0-5 3-8 8-8h393c4 0 8 3 8 8v316c0 4-4 8-8 8z"/><path d="M307 175a34 34 0 1 0 0 68 34 34 0 0 0 0-68z"/></symbol><symbol id="member-poll" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" xml:space="preserve"><path d="M25 4C12.3 4 2 12.9 2 24a19 19 0 0 0 9 15.7c0 .2 0 .6-.3 1.6-.4 1.3-1 3.2-2.5 5.2l-1 1.5H9c6.1 0 9.7-4 10.3-4.7 1.8.4 3.7.7 5.7.7 12.7 0 23-8.9 23-20S37.7 4 25 4zm-6 29h-4V19h4v14zm8 0h-4v-9h4v9zm8 0h-4V15h4v18z"/></symbol><symbol id="member-searching" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M378 494l-190 1c3-48 21-96 55-134l135 133zm-190 27c3 49 22 96 56 134l134-134H188zm208-235c-49 3-96 21-134 56l134 133V286zM263 674c38 34 86 53 134 55V540L263 674zm161 55c48-3 95-21 134-56L423 540l1 189zm207-235c-3-49-21-96-56-134L442 494h189zM422 286l1 189 134-134c-39-34-86-52-135-55zm154 368c34-38 53-86 55-134l-189 1 134 133zm319 267l-69 69-195-194 17-17-41-41a302 302 0 0 1-412-15 302 302 0 0 1-1-430c48-48 108-78 174-87-27-75-126-110-127-110l16-46c4 1 79 28 127 87 3-23 13-81 54-108 51-36 131-10 131-10s-3 84-55 120c-40 28-96 18-120 13 10 15 19 32 24 51a303 303 0 0 1 296 304c0 73-25 142-72 197l40 40 17-17 196 194zM591 688a254 254 0 0 0-1-362 254 254 0 0 0-362 1 254 254 0 0 0 1 362c48 48 113 74 181 74s133-26 181-75z"/></symbol><symbol id="member-verified" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve"><path d="M153 89v208c0 24 12 47 31 60l72 50 72-49c20-14 31-37 31-61V89H153zm164 97l-59 79a15 15 0 0 1-22 1l-40-39a15 15 0 1 1 21-21l28 28 48-66a15 15 0 0 1 24 18z"/><path d="M433 0H79c-8 0-15 7-15 15v282c0 53 26 103 70 133l114 79a15 15 0 0 0 17 0l113-79c44-30 70-80 70-133V15c0-8-7-15-15-15zm-44 297c0 34-17 66-44 85l-80 55a15 15 0 0 1-17 0l-80-55c-28-20-45-51-45-85V74c0-8 7-15 15-15h236c8 0 15 7 15 15v223z"/></symbol><symbol id="member-visitors" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill-opacity=".8" d="M33 15a8.4 8.4 0 0 1-.13 1.51C21.74 16.47 21 12.02 21 12.02s-1.9 4.4-5.88 4.49c-.08-.49-.12-1-.12-1.51a9 9 0 0 1 18 0z"/><path d="M14.13 16.68A10 10 0 0 0 24 25c4.9 0 9.04-3.5 9.85-8.31A9.41 9.41 0 0 0 34 15a10.01 10.01 0 1 0-19.87 1.67zM24 23a7.99 7.99 0 0 1-7.64-5.65 7.92 7.92 0 0 0 4.63-3.33c1.26 1.45 4.12 3.23 10.6 3.46A7.97 7.97 0 0 1 24 23zm0-16a8 8 0 0 1 8 8l-.02.49c-9.07-.25-10-3.63-10-3.63a1 1 0 0 0-.86-.83 1 1 0 0 0-1.04.6c-.01.03-1.4 3.1-4.05 3.75 0-.13-.03-.25-.03-.38a8 8 0 0 1 8-8zm20.42 19h-8.18a3.55 3.55 0 0 0-2.9 1.49 5.24 5.24 0 0 0-2.59-.71h-13.5c-.92 0-1.8.26-2.6.7A3.55 3.55 0 0 0 11.76 26H3.58A3.58 3.58 0 0 0 0 29.58V37a1 1 0 0 0 1 1h11v3a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1v-3h11a1 1 0 0 0 1-1v-7.42A3.58 3.58 0 0 0 44.42 26zm-10.69 3l-.33.33.33-.33zm-7.95-.22L24 32.94l-1.78-4.16h3.56zm-11.5.21l.32.34-.34-.33h.01zM2 36v-6.42c0-.87.7-1.58 1.58-1.58H7v4h2v-4h2.76c.59 0 1.1.33 1.37.82A5.2 5.2 0 0 0 12 32.03V36H2zm32 4H14v-7.97c0-.88.35-1.7.97-2.32a3.3 3.3 0 0 1 2.28-.93h2.8l3.03 7.1a1 1 0 0 0 1.84 0l3.04-7.1h2.79A3.24 3.24 0 0 1 34 32.03V40zm12-4H36v-3.97a5.2 5.2 0 0 0-1.13-3.21 1.56 1.56 0 0 1 1.37-.82H39v4h2v-4h3.42c.87 0 1.58.7 1.58 1.58V36zm-5-11a5.94 5.94 0 0 0 6-6 6 6 0 0 0-6-6 6 6 0 0 0-5.26 3.1A6.03 6.03 0 0 0 35 19a6 6 0 0 0 6 6zm0-2a4 4 0 0 1-3.97-4.46c1.13.96 3.32 2.07 7.53 2.27A3.96 3.96 0 0 1 41 23zm0-8a4 4 0 0 1 3.98 3.82c-5.17-.17-6.74-1.77-7.11-2.3A4 4 0 0 1 41 15zM7 25a6 6 0 0 0 6-6 6.03 6.03 0 0 0-.74-2.9A6 6 0 0 0 7 13a6 6 0 0 0-5.9 7A5.96 5.96 0 0 0 7 25zm0-2a3.95 3.95 0 0 1-3.55-2.2c4.2-.19 6.4-1.29 7.52-2.26A3.98 3.98 0 0 1 7 23zm0-8a4 4 0 0 1 3.14 1.53c-.35.5-1.89 2.12-7.12 2.3A4 4 0 0 1 7 15z"/></symbol><symbol id="member-other" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill-opacity=".8" d="M45.11 14.97l-.15.06-8-1-2.64-1.59a3.06 3.06 0 0 0-4 .8l-1.76 2.87c-1.8.76-2.85 1.97-2.6 3.92.14 1.12.9 3.18 1.42 4.56a2.44 2.44 0 0 0 2.06 1.55c1.6.14 4.11.41 5.52.83 2.2.66 2.2 3.9 1.9 5.06-.29 1.17-1.75 5.35-.2 6.9s2.08 2.73 2.08 2.73a22.93 22.93 0 0 1-16.78 5.28 22.75 22.75 0 0 1-9.08-2.76l.08-.15-2-6 4-2 2.8-6.43c.61-1.24-.2-2.7-1.58-2.83l-7.14-.64a3.48 3.48 0 0 1-1.9-.8L1.27 20.3c.18-1.12.44-2.2.78-3.26h3.53L7 19.41a1.78 1.78 0 0 0 2.53.57 1.78 1.78 0 0 0 .55-2.39c-.53-.9-1.08-1.92-.99-2.1l.98-1.82a3.15 3.15 0 0 1 2.76-1.64c1.73 0 3.13-1.4 3.13-3.13V5.03l-1.8-1.8A22.97 22.97 0 0 1 28.8 1.54c-.34 1.43-.7 5.32 5.15 5.48.56.02 3 2 3 2l2.7-1.79a22.88 22.88 0 0 1 5.45 7.73z"/><path d="M46.03 14.58a23.67 23.67 0 0 0-5.67-8.04 11.02 11.02 0 0 0-.53-.5 24.1 24.1 0 0 0-5.72-3.75A23.94 23.94 0 0 0 29.28.62l-.3-.05a23.86 23.86 0 0 0-5.02-.54c-3.57 0-7.02.77-10.24 2.3a24.18 24.18 0 0 0-8.7 6.97 23.7 23.7 0 0 0-3.92 7.43 23.01 23.01 0 0 0-.8 3.37 1.84 1.84 0 0 0-.04.14 24.02 24.02 0 0 0-.3 3.8c0 .7.03 1.33.08 1.87A23.46 23.46 0 0 0 3 35.69a23.96 23.96 0 0 0 6.23 7.28 22.31 22.31 0 0 0 3.17 2.1 23.62 23.62 0 0 0 9.48 2.87 24.07 24.07 0 0 0 17.52-5.51 24.03 24.03 0 0 0 8.57-18.4 23.86 23.86 0 0 0-1.93-9.45zM38 7.13l-1 .67C34.8 6.06 34.24 6.04 34 6.04c-1.88-.06-3.16-.51-3.81-1.36a2.92 2.92 0 0 1-.53-1.9c1.25.34 2.46.78 3.6 1.32a22.14 22.14 0 0 1 4.76 3.03zm-31.4 3.4a22.17 22.17 0 0 1 7.35-6.09l1 1V8.9c0 1.18-.95 2.13-2.13 2.13A4.14 4.14 0 0 0 9.2 13.2l-1 1.85c-.26.53-.15 1.05 1.03 3.05a.79.79 0 0 1-.25 1.06.81.81 0 0 1-1.11-.26l-1.42-2.38a1 1 0 0 0-.86-.49h-2.1a21.68 21.68 0 0 1 3.12-5.5zM4.72 34.72a21.5 21.5 0 0 1-2.7-8.99 16.79 16.79 0 0 1-.07-1.7c0-.58.03-1.17.07-1.76L6.5 26.1a4.52 4.52 0 0 0 2.46 1.03l7.14.64a.95.95 0 0 1 .75.5c.15.27.16.6 0 .94l-2.65 6.1-3.68 1.83a1 1 0 0 0-.5 1.21l1.2 3.59c-.25-.18-.51-.35-.76-.54a22 22 0 0 1-5.72-6.68zm17.32 11.23a21.64 21.64 0 0 1-8.2-2.38l-1.67-5.03 3.23-1.61a1 1 0 0 0 .47-.5l2.77-6.38a2.96 2.96 0 0 0-.06-2.76 2.97 2.97 0 0 0-2.32-1.51l-7.13-.64a2.5 2.5 0 0 1-1.35-.56l-5.42-4.66c.12-.64.26-1.26.44-1.89h2.2l1.13 1.9a2.8 2.8 0 0 0 3.94.89 2.78 2.78 0 0 0 .86-3.73 15.7 15.7 0 0 1-.78-1.46l.79-1.48a2.14 2.14 0 0 1 1.88-1.12 4.13 4.13 0 0 0 4.13-4.13V5.03a1 1 0 0 0-.3-.7l-.76-.77a21.84 21.84 0 0 1 11.78-1.2 5 5 0 0 0 .92 3.54c1.02 1.33 2.78 2.05 5.23 2.13.4.18 1.59 1.04 2.5 1.78a1 1 0 0 0 1.19.06l2-1.33a21.68 21.68 0 0 1 3.92 5.3l-6.14-.77-2.46-1.48a4.07 4.07 0 0 0-5.38 1.13l-1.59 2.6c-2.73 1.29-3.1 3.33-2.9 4.84.12.94.6 2.51 1.48 4.8a3.47 3.47 0 0 0 2.9 2.18c2.44.21 4.33.5 5.32.8 1.43.42 1.45 2.93 1.22 3.86l-.14.53c-.55 1.94-1.57 5.54.2 7.31.71.71 1.19 1.33 1.48 1.77a22.05 22.05 0 0 1-13.47 4.63 21.73 21.73 0 0 1-1.91-.1zm23.54-17.93a22 22 0 0 1-6.63 12.09 14.1 14.1 0 0 0-1.6-1.88c-.93-.95 0-4.27.31-5.36l.16-.6c.4-1.6.3-5.39-2.58-6.25-1.45-.43-3.9-.71-5.72-.87a1.45 1.45 0 0 1-1.22-.91c-1-2.62-1.3-3.8-1.36-4.33-.12-.96.02-2.04 2-2.87a1 1 0 0 0 .47-.4l1.7-2.8a2.05 2.05 0 0 1 2.68-.54l2.65 1.6a1 1 0 0 0 .39.13l7.58.94a21.9 21.9 0 0 1 1.54 8.06c0 1.36-.12 2.7-.37 3.99z"/></symbol><symbol id="member-position" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32" xml:space="preserve"><path d="M20.6 18l-8.2 10.6L4.2 18A9.8 9.8 0 0 1 2 12C2 6.5 6.7 2 12.4 2 18 2 22.7 6.5 22.7 12c0 2.3-.8 4.3-2.1 6zM0 12c0 2.2.6 4.2 1.7 6l10.7 14 10.7-14a11.6 11.6 0 0 0 1.7-6c0-6.6-5.6-12-12.4-12C5.5 0 0 5.4 0 12z"/><path d="M8 12a4 4 0 0 1 4.2-4 4 4 0 0 1 4.1 4 4 4 0 0 1-4.1 4A4 4 0 0 1 8 12zm-2 0c0 3.3 2.8 6 6.2 6a6.1 6.1 0 0 0 6.2-6c0-3.3-2.8-6-6.2-6A6.1 6.1 0 0 0 6 12z"/></symbol><symbol id="messages-answered" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve"><path d="M114.7 0l189.5 140.9L493.7 0z"/><path d="M313.1 171.6a15 15 0 0 1-17.9 0L96.4 23.8v149.8a190 190 0 0 1 249.9 145.6H497a15 15 0 0 0 15-15V23.8L313.1 171.6z"/><path d="M159.6 192.8C71.6 192.8 0 264.4 0 352.4S71.6 512 159.6 512s159.6-71.6 159.6-159.6-71.6-159.6-159.6-159.6zM194.3 390a15 15 0 0 1-21.2 21.2L124.9 363a15 15 0 0 1 0-21.2l48.2-48.2a15 15 0 1 1 21.2 21.2l-37.6 37.6 37.6 37.6z"/></symbol><symbol id="messages-attachment" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612" xml:space="preserve"><path d="M565 75l-2-3c-64-62-165-61-228 2L45 364c-21 21-45 61-45 97a124 124 0 0 0 125 125c34 0 65-13 89-37l250-250a88 88 0 0 0 0-125 88 88 0 0 0-125 0L148 366a26 26 0 1 0 37 37l191-192c7-6 17-10 26-10 9 1 18 4 25 10a36 36 0 0 1 0 51L177 512a72 72 0 0 1-124-51c-1-17 13-44 29-60l290-290c43-43 112-43 154-1l3 3c41 42 41 111-2 153L288 506a26 26 0 1 0 37 37l240-240c63-63 63-165 0-228z"/></symbol><symbol id="messages-unread" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xml:space="preserve"><path d="M39.43 56.85a.51.51 0 0 0-.37-.85H25.4a.51.51 0 0 0-.37.85 9.81 9.81 0 0 0 14.4 0zM58.51 46.77a22.13 22.13 0 0 1-6.31-15.72l.07-6.31C52.38 13.87 44 4.5 33.18 4a20 20 0 0 0-20.9 19.76l-.07 6.83a22.13 22.13 0 0 1-6.66 15.6l-.82.8A2.42 2.42 0 0 0 4 48.7v.57a2.42 2.42 0 0 0 2.4 2.45l51.15.55A2.42 2.42 0 0 0 60 49.88v-.57a2.42 2.42 0 0 0-.69-1.72zM42.24 26.82l-8.7 8.52a5.5 5.5 0 0 1-7.76-.06l-3.45-3.49a2.38 2.38 0 0 1 0-3.36l.89-.87a2.38 2.38 0 0 1 3.36 0L28 29a2.38 2.38 0 0 0 3.36 0L38 22.53a2.38 2.38 0 0 1 3.36 0l.87.89a2.38 2.38 0 0 1 .01 3.4z"/></symbol><symbol id="movie-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" xml:space="preserve"><path d="M11.1 10.6l4.2-8.2 4 8.3 9.2 1.5-6.7 6.4 1.4 9.1-8.1-4.4-8.3 4.2 1.7-9.1L2 11.9z"/></symbol><symbol id="movie-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve"><path d="M12.8 5.2l-8-.1c-2 0-3.7 1.6-3.7 3.5L1 15.2c0 2 1.6 3.6 3.6 3.6l8.1.1c2 0 3.7-1.6 3.7-3.5l.1-6.6c0-2-1.6-3.6-3.7-3.6zm-.3 7.3l-5.1 2.8c-1 .5-1-.4-1-.4V9.2c0-1 1-.5 1-.5l5.1 3c.6.4 0 .8 0 .8zM21.4 7.1L17 9.6v5.7l4.3 2.5c1.6.8 1.7-.7 1.7-.7V7.9c0-1.7-1.6-.8-1.6-.8z"/></symbol><symbol id="movies-liked" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250"><path d="M159 122a37 37 0 1 0 0 75 37 37 0 0 0 0-75zm23 35c0 3-2 6-4 9l-19 18-18-18c-4-4-5-8-6-11v-1a12 12 0 0 1 24-5 12 12 0 0 1 24 5l-1 3z"/><path d="M172 119l-10-34-89 24 15 56 29-7a42 42 0 0 1 55-39z"/><path d="M181 110c-2-8 3-17 10-19l-7-27-139 37 7 28c8-3 16 2 18 10s-3 16-10 18l7 28 52-14-2-9-31 8-17-64 96-26 12 41c11 5 20 16 23 29l7-2-8-28c-8 2-16-3-18-10z"/><path d="M125 0a125 125 0 1 0 0 250 125 125 0 0 0 0-250zm0 242a117 117 0 1 1 0-234 117 117 0 0 1 0 234z"/></symbol><symbol id="nav-favorites" fill="currentColor" stroke="#000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510" xml:space="preserve"><path d="M255 490l-36-36C87 337 0 258 0 161 0 82 61 20 140 20c44 0 87 21 115 54 28-33 71-54 115-54 79 0 140 62 140 141 0 97-87 176-219 293l-36 36z"/></symbol><symbol id="nav-home" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 546 546" xml:space="preserve"><path d="M500 492V292c0-12-7-28-17-35L289 123c-10-7-27-7-37 0L70 249c-10 7-19 23-19 36v207c0 12 11 25 23 25h406c13 0 20-13 20-25zm-221-29l-2 1c-105-42-145-140-99-182 46-43 99 15 99 15s53-58 99-15c47 42 7 139-97 181z"/><path d="M536 209L289 40c-10-7-27-7-37 0L10 211c-11 8-13 22-6 32l1 1c7 10 21 12 31 5L251 97c10-7 27-7 37 0l222 150c10 7 24 4 31-6l1-1c7-10 4-24-6-31zM425 114c10 7 18 3 18-10V48c0-13-10-19-23-19h-37c-13 0-23 7-23 19s8 25 18 33l47 33z"/></symbol><symbol id="online-active" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" xml:space="preserve"><path d="M40 5H10a2.5 2.5 0 0 0-2.5 2.5v20a17.5 17.5 0 0 0 35 0v-20A2.5 2.5 0 0 0 40 5zm0 22.5a15 15 0 0 1-30 0V15h30zm0-15H10v-5h30z"/><path d="M21.7 29.3L20.3 34s0 .5.1.6.8 0 .8 0l3.8-2.3 3.7 2.3s.5.2.7 0 .1-.7.1-.7l-1.1-4.6 3.7-3s.3-.2.3-.4-.4-.3-.4-.3l-4.8-.5-1.6-4.2s-.3-.5-.6-.5-.5.5-.5.5l-1.7 4.3-4.7.4s-.5 0-.5.4.4.6.4.6z"/></symbol><symbol id="online-inactive" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.7 77.8" xml:space="preserve"><path d="M66.3 108.3l-9 5.7a67.6 67.6 0 0 0 33.1 4.5l-2.6-8.3a61.3 61.3 0 0 1-21.5-2zM95.2 109.2l2.6 8a68.7 68.7 0 0 0 23.7-10l-4.3-7.4a60.3 60.3 0 0 1-22 9.4zM29.6 82.5l10.2-10.2a60.9 60.9 0 0 1 78.8-6l8-4.5a69.3 69.3 0 0 0-92.8 4.6L23.5 76.7a8.2 8.2 0 0 0 0 11.7l10.3 10.3a69.2 69.2 0 0 0 10 8.2l8.5-4.6a60.5 60.5 0 0 1-12.5-9.5zM144.4 82.8V82.5a3.3 3.3 0 0 0-1.4-2.7 62.7 62.7 0 0 0-4.2-5 4.3 4.3 0 1 0-6.2 6c.7.6 1.6 1.7 2.4 2.8l-9.2 9.2L123 95l4.3 7.5c1.5-1.2 3-2.5 4.3-3.9l10.4-10.3a8.1 8.1 0 0 0 1.8-3 4.3 4.3 0 0 0 .5-2.6z" transform="translate(-19.7 -46.2)"/><path d="M84.4 63.4A19.7 19.7 0 0 0 68.8 95L103 76.5a19.7 19.7 0 0 0-18.6-13.1z" transform="translate(-19.7 -46.2)"/><path fill="#DF2700" d="M23.9 124a4.2 4.2 0 0 1-2-8l122.3-66.6a4.2 4.2 0 0 1 4 7.4L25.9 123.4a4.2 4.2 0 0 1-2 .5z" transform="translate(-19.7 -46.2)"/></symbol><symbol id="online-new" fill="green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" xml:space="preserve"><path d="M40 5H10a2.5 2.5 0 0 0-2.5 2.5v20a17.5 17.5 0 0 0 35 0v-20A2.5 2.5 0 0 0 40 5zm0 22.5a15 15 0 0 1-30 0V15h30zm0-15H10v-5h30z"/><path d="M21.7 29.3L20.3 34s0 .5.1.6.8 0 .8 0l3.8-2.3 3.7 2.3s.5.2.7 0 .1-.7.1-.7l-1.1-4.6 3.7-3s.3-.2.3-.4-.4-.3-.4-.3l-4.8-.5-1.6-4.2s-.3-.5-.6-.5-.5.5-.5.5l-1.7 4.3-4.7.4s-.5 0-.5.4.4.6.4.6z"/></symbol><symbol id="online-wap" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.4 27.4"><path d="M19.5 0H7.9a2 2 0 0 0-2 2v23.4c0 1.1 1 2 2 2h11.6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-8.6 1.2h5.7c.1 0 .2.2.2.5s0 .5-.2.5h-5.7c-.2 0-.3-.2-.3-.5s.1-.5.3-.5zm2.8 24.3a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6zM20 21H7.4V3.4H20V21z"/></symbol><symbol id="qx-exclamation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 1280" xml:space="preserve"><g fill="#AA8B59"><path d="M1858 12784c-31-16-34-38-22-140l6-51 237 94 256 102c13 6-64 10-215 10-190 0-240-3-262-15zM2470 12788l-325-122-300-112 2-54 8-151 7-96 181 74a106882 106882 0 0 0 1162 463c11 5-144 9-345 8-219 0-375-4-390-10zM3340 12785l-240-90c-360-134-762-303-1157-486l-73-34v-84l148 71c415 197 570 260 1152 463l480 168c8 3-50 6-130 6-102 0-155-4-180-14zM3275 12591c-286-114-713-288-950-386l-440-181c-5-2-8-26-7-53l4-49 131 55c371 154 655 270 1312 534l720 289-125-1h-125l-520-208zM3765 12661c-634-258-1544-642-1800-761l-80-37 3-46c2-26 7-47 11-47 3 0 93 38 200 85s196 84 197 82c2-2-89-45-202-97l-206-93 6-45c3-25 6-60 6-78v-34l163 81c697 350 1913 899 2412 1090l100 38h-470l-340-138zM4305 12616c-741-306-2359-1010-2393-1041-10-9-11-23-5-52l8-39 410 181c670 296 1825 789 1831 782 2-2-137-68-309-147-171-79-528-247-792-373-391-187-1029-472-1124-502-19-6-21-12-16-73l15-210c4-79 11-146 14-149s61 24 130 60c124 66 578 281 1011 480 363 167 829 378 845 384 8 2-151-80-355-184-472-241-1214-632-1577-832-37-20-48-32-48-51-1-27 43-774 45-777 1-2 91 45 201 102 181 96 356 175 804 362l247 104c51 21 96 39 100 39 5 0-174-98-397-218-553-298-923-502-936-516-7-7-9-38-6-83l4-72 72 33c135 62 712 339 1006 483 162 79 290 140 285 135-6-5-82-49-170-97-88-47-391-215-672-373l-513-286v-35c0-64 12-112 24-102a242924 242924 0 0 1 1697 962l716 409 7 76c4 42 5 78 3 80s-51-21-108-53c-235-128-1576-779-1585-770-4 4 392 217 957 516 390 206 499 259 605 295l129 44 9 71c5 39 6 74 4 77a13991 13991 0 0 0-1098-459c0 2 250 128 555 280l555 275v88l-51-26c-30-15-55-22-60-17-6 6 16 21 50 38 60 28 60 28 65 79 10 93 12 176 6 176-4 0-290-133-636-296s-687-321-759-352c-126-54-645-252-645-247 0 7 343 189 535 283 116 57 246 127 290 156 90 59 363 204 882 468l351 179 4 67c2 37 3 68 2 70s-70-31-153-72c-83-42-154-76-158-76-5 1 61 36 145 79s157 82 161 87c7 7 32 313 26 321-1 2-89-33-195-77-188-77-253-97-153-47 26 13 116 54 199 91l152 67 6 107 12 165c3 31 2 57-3 57-4 0-120-47-258-104zm86-155c-21-16-165-81-195-88l99 51c122 61 131 64 96 37zm18-245c-2-2-123-56-269-119s-357-156-469-206-206-90-208-88c-10 10 370 180 882 394 48 20 73 28 64 19zm-1784-596c-3-5-12-10-18-10-7 0-6 4 3 10 19 12 23 12 15 0zm-125-60c-52-27-99-49-105-49-5 0 33 22 85 49s100 49 105 49c6 0-33-22-85-49zm1010 45c0-3-31-21-70-40-38-19-70-33-70-30 0 4 126 72 138 75 1 0 2-2 2-5zm-150-79c0-2-57-35-127-72-71-37-274-147-453-244-333-182-470-253-470-246a34252 34252 0 0 0 1048 566l2-4zm-1040-246c-30-16-59-29-65-29-5 0 15 13 45 29s60 29 65 29c6 0-15-13-45-29zm-130-60c-30-16-59-29-65-29-5 0 15 13 45 29s60 29 65 29c6 0-15-13-45-29zM4265 10738l-610-363c-242-144-555-323-697-398-280-149-588-317-797-435l-133-75 6-36c3-20 6-66 6-103 0-40 4-68 10-68s119 58 253 129c476 252 971 508 1544 798l582 294 5 42c3 23 7 77 10 119l4 78-27-15c-47-24-141-64-141-60 0 2 38 25 85 50l85 47v49c0 27-3 49-7 48-5 0-84-46-178-101zM4315 10323c-60-36-283-160-494-275-531-290-743-409-1288-720l-473-270v-37c0-21 3-65 6-98l7-60 473 288c785 477 1613 973 1746 1045l126 68 5 60 4 62c-1 1-51-27-112-63zM4365 9976a97926 97926 0 0 1-1832-1013l-453-255v-45c0-39 2-44 18-39 9 4 175 95 367 203 793 444 1219 680 1568 867l367 198v49c0 52-3 55-35 35zM4365 9701a29368 29368 0 0 0-1630-891l-640-327 4-94c1-52 6-99 10-106s86 31 241 114c298 158 1186 616 1655 855l360 183 7 65c10 100 14 210 8 210-3 0-10-4-15-9zM4240 9229c-688-365-1528-824-2019-1106l-101-57 1-41c0-22 4-61 7-87l7-47 345 202c531 312 1336 770 1752 997l117 64 7 52c11 90 12 90-116 23zM4200 9018l-380-226c-280-166-1055-636-1425-864l-250-154-3-53c-3-46-1-53 13-47 9 3 165 95 348 204l1077 642c410 243 748 445 752 449 10 10 22 131 12 130-5 0-70-37-144-81zM3950 8606l-880-476-712-387-208-114 1-67c0-37 4-86 7-110l7-42 155 96c700 435 1688 1030 1933 1163l77 43v49c0 27-1 49-2 49l-378-204zM3880 8379c-610-360-1708-1017-1713-1026-3-5-2-32 0-61l6-53 26 18c54 36 1166 697 1621 965 261 154 479 284 484 288 12 12 21 120 10 120-5-1-200-114-434-251zM3985 8214c-640-352-1006-556-1402-782l-413-235 7-76 7-78 236 139c288 171 328 194 315 181-5-6-131-86-280-177l-269-166 3-92c1-51 4-94 5-96 2-1 158 97 347 219 484 312 985 629 1397 883 223 138 352 224 353 234l8 115c4 62 2 97-4 96-5 0-145-75-310-165zm-1195-819c0-2-10-9-22-15-22-11-22-10-4 4 21 17 26 19 26 11zM4045 7903c-595-365-1417-879-1752-1095-89-58-93-61-93-97 0-20 4-41 8-48 5-9 83 36 257 149 401 259 1030 656 1437 907l376 232 4 45c2 26-1 44-7 43-5-1-109-62-230-136zM4030 7699c-431-277-571-369-1192-782l-618-410v-76c0-42 4-82 8-88 6-10 38 7 118 58 405 264 618 393 984 594l468 257c28 16 52 27 52 25 0-3-91-61-202-128-264-160-681-422-1090-684-356-228-338-212-322-293l6-31 87 58c258 174 1220 779 1692 1064l226 137 8 141c4 77 5 143 2 146-6 5-445-258-866-519l-250-156c-14-8-21-11-16-5 16 17 690 461 1073 706 72 47 72 47 72 92 0 25-1 45-2 45-2 0-109-68-238-151zM4025 6983c-394-228-1761-1036-1773-1048-2-1 1-46 5-98l8-95 190 125c221 146 445 276 1195 693 300 166 549 306 555 312 8 7 28 218 21 225-1 1-91-50-201-114zM4170 6747c-159-97-971-630-1380-905l-505-339-3-51c-2-29 0-52 3-52s85 55 183 122c470 322 1290 867 1673 1110 52 33 57 40 63 83 4 26 6 48 4 50s-19-6-38-18zM3810 6324c-462-290-735-463-1177-747l-343-220v-48c0-27 2-49 5-49a116443 116443 0 0 0 1355 854l475 296 60 37 5 57c3 31 3 56 0 56l-380-236zM3862 6080c-389-217-723-408-1191-678l-373-217 5-88c5-93 9-106 29-90 22 16 108 64 108 60 0-3-29-24-65-47l-66-43 7-116c4-64 9-133 13-153l6-37 310 198c268 170 1022 631 1386 845l116 69 7 100c4 54 6 101 4 103-7 6-717-413-1208-714l-295-180c-56-28 259 181 791 525 110 72 316 194 457 273 241 133 257 144 261 174 8 47 12 186 6 186l-308-170zM3865 5454l-892-566c-612-389-633-403-633-432 1-85-33-101 548 269l877 554c187 117 345 218 352 225 13 13 28 116 16 115-4-1-125-75-268-165zM3840 5246c-267-180-531-361-1203-821l-278-190 7-155c3-85 7-156 9-158 1-2 166 118 366 265 376 277 556 394 1099 714l265 157 11 188 10 191c-1 1-130-85-286-191zM3785 4553c-165-115-473-329-683-478l-384-270 212-3 212-2 387 236 421 257c45 26 29 10-35-35l-340-244-290-209 249-3 250-2 120 91 128 98c6 5 28 317 43 616a2362 2362 0 0 0 13 155c-2 0-139-93-303-207zM2072 2583l-62-48v-59c0-45 3-56 13-49 40 31 224 178 237 190 12 11 4 13-56 13-68 0-72-1-132-47zM2359 2400c-178-127-330-237-337-244-9-9-12-54-10-179l3-167 340 231c594 404 680 462 670 451l-430-338-502-393-83-66v-177l33 24c35 27 1116 812 1347 978l145 105-74 3-73 3-72-53a735 735 0 0 0-136-95c0 2 35 31 77 63l92 71c13 10-30 12-209 13h-225l-275-210c-326-250-330-253-330-247 0 4 330 275 483 397 37 29 67 55 67 57s-40 3-88 3h-88l-325-230zM3460 2382c-380-298-504-398-1037-831l-413-334V906l48 45c395 377 1022 926 1318 1156l414 317 250 192c12 12-7 14-125 14h-140l-315-248zM3205 1734L2015 839l-3-60c-2-48 0-59 10-53l373 279 1183 889 822 617v59c0 33-1 60-2 59-2 0-538-403-1193-895zM4375 2461c-11-10-119-94-240-187-603-460-1172-910-1748-1383l-363-297c-12-9-14-35-12-118l3-106 318 265c414 345 1016 837 1600 1309l467 377v80c0 43-1 79-3 79-1 0-11-8-22-19zM4220 2122c-459-354-850-672-1657-1346l-553-461V199l23 18 417 348c901 753 1411 1166 1919 1555 31 24 32 28 29 81l-3 56-175-135zM4250 1988l-335-303c-236-215-542-466-790-649-686-505-849-629-1072-815l-43-35V0h206l39 41c105 109 737 676 880 787 177 140 926 703 1133 852l131 95 1 173c0 94-1 172-2 172l-148-132zM4215 1395C3764 1023 3113 447 2725 77l-80-76h330l110 95c125 108 615 461 1253 904 60 42 62 44 62 87v44l-82-57-208-147-140-100c-68-48 101 92 394 328l37 30-3 88-3 87-115-92-504-407-420-340-31-24 25 25c69 72 657 582 1027 893 21 17 24 27 21 74l-3 55-180-149zM4365 1001c-11-10-164-128-340-262-419-319-926-708-945-725-12-12-4-14 60-14h75l235 186c129 102 396 310 593 461l357 275v49c0 54-6 58-35 30zM3949 454L3448 51l-57-46 145-3 145-3 147 117 360 282 212 166v123c0 68-2 123-4 123s-203-160-447-356zM4138 192L3882 5l114-3 114-3 145 117 145 116v74c0 41-1 74-2 74l-260-188zM4355 35l-40-34 43-1c41 0 42 0 42 35 0 19-1 35-2 35-2 0-21-16-43-35z" transform="matrix(.1 0 0 -.1 0 1280)"/></g></symbol><symbol id="qx-flower" stroke="#000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 457 457" xml:space="preserve"><path d="M79 208l11-5c15-6 32-10 50-10l30 3-56-38 91 47 17 6c-6-24-23-76-65-100-20-12-43-16-64-16-37 0-67 11-67 11s10 66 53 102zM108 281l60-30c14-13 28-23 37-29-16-6-40-12-65-12-14 0-30 2-44 8-59 24-82 102-82 102s41 22 86 22l21-2 2-11c5-25 18-47 33-65l-48 17z"/><path d="M198 357l15-121c-19 12-65 47-74 96-12 63 40 125 40 125s69-38 82-99c-26-28-36-66-39-93l-24 92zM363 260l-6-5c-13 4-27 6-41 6-16 0-30-2-43-5l58 60-83-67-12-5c1 26 9 78 43 109 31 28 75 33 103 33 15 0 25-2 25-2s4-81-44-124zM351 172l-95 51-10 8c14 5 41 13 70 13 16 0 34-2 50-10 57-27 78-105 78-105s-39-19-82-19c-16 0-33 3-48 10-2 34-16 60-32 79l69-27z"/><path d="M230 181l4-79 5 71v8l-1 35c46-32 107-117-4-216 0 0-53 44-61 102 29 20 47 53 57 79z"/></symbol><symbol id="qx-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141 75" xml:space="preserve"><path d="M12 15c0-2 0-6 9-6s9 4 9 6v35c0 2 0 7-9 7s-9-5-9-7V15zM0 67l16 2 8 6h26l-11-8c18-5 21-11 21-18V17c0-8-6-15-14-17H0v67z"/><path d="M81 32L55 0h30l11 14h1l9-14h30l-25 32 30 36h-31L96 49 81 68H53l28-36z"/></symbol><symbol id="qx-gold-flower" stroke="#a18703" fill-rule="evenodd" fill="#c2a803" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" xml:space="preserve"><path d="M287 243.7a34.7 34.7 0 0 1-17.7-26.7c5.2.1 17.8 13.4 18.4 26.4"/><path d="M290.3 244.2c-5.8-.7-6.5-27.3 0-33.8 7.2 6 7.2 33.3 0 33.8z"/><path d="M284.9 242.2a30.1 30.1 0 0 1-5.6-26.5c3.9 2.4 11.5 12 11 28.5"/><path d="M290.2 244c-7.7-10.8-17.3-19.2-27.5-19.6 6.4 12 6.9 18.5 27.6 19.7M293.6 243.7a34.7 34.7 0 0 0 17.6-26.7c-5.2.1-17.8 13.4-18.4 26.4"/><path d="M295.7 242.2a30.1 30.1 0 0 0 5.5-26.5c-3.8 2.4-11.4 12-11 28.4"/><path d="M290.3 244c7.7-10.8 17.3-19.2 27.5-19.6-6.4 12-6.8 18.4-27.6 19.7"/></symbol><symbol id="qruiser-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 31.3" xml:space="preserve"><path d="M86.6 11.1c0-4.1-3.7-7.4-8.2-7.4l.8.1-.4-.1h-.4c-4.5 0-8.2 3.3-8.2 7.4v.1c0 4.1 3.7 7.4 8.2 7.4h.1c1.4 0 2.6.8 2.6 1.8v.1c0 1-1.2 1.8-2.6 1.8h-.3.2c-1.4 0-2.6-.8-2.6-1.8h-5.6c0 4.1 3.7 7.4 8.2 7.4h.3-.2c4.5 0 8.2-3.3 8.2-7.4v-.1c0-4.1-3.7-7.4-8.2-7.4h-.1c-1.4 0-2.6-.8-2.6-1.8v-.1c0-1 1.2-1.8 2.6-1.8l-.8-.1h.1l.3.1h.4c1.4 0 2.6.8 2.6 1.8h5.6zm13.4 9.4c0 1-1.2 1.8-2.6 1.8h-.2.1c-1.4 0-2.6-.8-2.6-1.8v-9.2c0-1 1.2-1.8 2.6-1.8h.2-.1c1.4 0 2.6.8 2.6 1.8v.2-.3c0 1-1.2 1.8-2.6 1.8h-2.7v5.6h2.7c4.5 0 8.2-3.3 8.2-7.4V11v.3c0-4.1-3.7-7.4-8.2-7.4h-.2.1c-4.5 0-8.2 3.3-8.2 7.4v9.2c0 4.1 3.7 7.4 8.2 7.4h.2-.1c4.5 0 8.2-3.3 8.2-7.4H100zM34.9 3.6v16.8c0 4.1 3.7 7.4 8.2 7.4h.2-.2c4.5 0 8.2-3.3 8.2-7.4V3.6h-5.6v16.8c0 1-1.2 1.8-2.6 1.8h-.2.2c-1.4 0-2.6-.8-2.6-1.8V3.6h-5.6zm-8.8 24.3V11.1c0-1 1.2-1.8 2.6-1.8h3.6V3.6h-3.6c-4.5 0-8.2 3.3-8.2 7.4v16.8h5.6zm32.4-11.5h5.6v11.5h-5.6zm55.3 11.5V11.1c0-1 1.2-1.8 2.6-1.8h3.6V3.6h-3.6c-4.5 0-8.2 3.3-8.2 7.4v16.8h5.6zM10.9 20.4c0 1-1.2 1.8-2.6 1.8h-.2.1c-1.4 0-2.6-.8-2.6-1.8V11c0-1 1.2-1.8 2.6-1.8h.2-.1c1.4 0 2.6.8 2.6 1.8v9.4zm5.6-9.4c0-4.1-3.7-7.4-8.2-7.4h-.2.1C3.7 3.6 0 6.9 0 11v9.4c0 4.1 3.7 7.4 8.2 7.4h.2-.1c4.5 0 8.2-3.3 8.2-7.4V11z"/><path d="M8.4 23.7l5.7 7.5 4.5-3.3-5.6-7.6z"/><path fill="#bc152a" d="M63.6 4.6c.3-.4.6-.7 1.1-.9a3 3 0 0 1 1.3-.3c.8 0 1.4.3 1.9.9.5.6.8 1.3.8 2.1s-.3 1.4-.8 1.9-1.2.7-2.1.7h-.4l-.4-.1-.8-.2-.1.1v.1l.8.3c.6.2 1.1.6 1.5 1.1.4.5.6 1 .6 1.6 0 .7-.3 1.4-.9 2-.6.6-1.3.9-2.1.9-.7 0-1.4-.3-1.9-.9a3 3 0 0 1-.8-2V11H61v.9c0 .8-.3 1.5-.8 2.1-.5.6-1.1.8-1.9.8-.8 0-1.5-.3-2.1-.9-.6-.6-.9-1.2-.9-2 0-.6.2-1.1.6-1.7.4-.5.9-.9 1.4-1l.8-.3v-.2l-.8.3h-.9c-.8 0-1.5-.3-2-.8s-.8-1.1-.8-1.9c0-.8.3-1.5.8-2.1.5-.6 1.2-.9 1.9-.9.5 0 .9.1 1.3.3l1.1 1 .5.7h.1l.1-.1-.5-.7a3 3 0 0 1-.4-.8l-.1-.9c0-.8.3-1.4.8-1.9s1.2-.8 2-.8 1.5.3 2 .8.8 1.2.8 1.9l-.1 1-.4.8-.5.7.1.1.1.1.4-.9zm.1 3.2c0-.7-.2-1.3-.7-1.8-.5-.5-1.1-.7-1.8-.7s-1.3.2-1.8.7c-.5.5-.7 1.1-.7 1.8s.2 1.3.7 1.8c.5.5 1.1.7 1.8.7s1.3-.2 1.8-.7c.4-.5.7-1.1.7-1.8z"/></symbol></svg>';
		var hq_svgFragment		= '<svg class="'+hq_ClassSprite+' '+hq_ClassIcon;
		var hq_svgFragmentUse	= '"><use xlink:href="';
		var hq_svgFragmentSuffix = '" /></svg>';
		var hq_QruiserLogo		= $('img#logo_qruiser');
		var hq_qxLogo			= $('.blog-teasers .gaymap h3');
		var hq_qmenuLogout		= $('#qmenu_logout > a');
		var hq_qmenuHome		= $('#qmenu_home > a, .homeicon');
		var hq_emptyAvatar		= $('.emptymembericon > a, .emptymemberlargeicon');
		var hq_emptyClubIcon	= $('#column_center a.clublink > img[src$="blank.gif"], .rightcolumn-club-icon .rightcolumn-club-icon-empty');
		var hq_xxxClubWarning	= $('.clubxxx1hidden, .clubxxx2hidden, .clubxxx3hidden, .clubxxx4hidden');
		var hq_verified			= $('.verifiedicon,.verifiedlargeicon');
		var hq_chat				= $('.chaticon, .chatlargeicon');
		var hq_mail				= $('.mailicon, .maillargeicon');
		var hq_mailUnread		= $('.mailunreadicon');
		var hq_mailAnswered		= $('.mailansweredicon');
		var hq_mailAttachment	= $('.attachedicon');
		var hq_padLock			= $('.icon-lock, .lockicon');
		var hq_clear			= $('.icon-zero');
		var hq_abuse			= $('img[src$="abuse.gif"]');
		var hq_heartIcon		= $('.favouriteicon [class^="favouriteicon_"]');
		var hq_mutedIcon		= $('.ignoredicon [class^="ignoredicon_"]');
		var hq_heartIcon2		= $('img[src$="heart4.gif"]');
		var hq_textIcon			= $('.textlargeicon');
		var hq_infoIcon			= $('.infoicon');
		var hq_blog				= $('.blogicon, .bloglargeicon');
		var hq_diary			= $('.diaryicon, .diarylargeicon');
		var hq_photoalbum		= $('.photoalbumicon, .photoalbumlargeicon');
		var hq_movie			= $('.movieicon, .movielargeicon');
		var hq_guestbook		= $('.guestbookicon, .guestbooklargeicon');
		var hq_poll				= $('.pollicon, .polllargeicon');
		var hq_video			= $('.video-icon');
		var hq_videoStar		= $('img[src$="star.png"]');
		var hq_moviesLiked		= $('#column_center .header a[href^="/showmovies_digged.php?id="]');
		var hq_edit				= $('.icon-edit, #largeediticon');
		var hq_edit_menu		= $('#qmenu_edit > a > img[src$="editblock.png"]');
		var hq_OnlineAct1		= $('.icon-online-1');
		var hq_OnlineAct2		= $('.icon-online-2, .icon-online-3');
		var hq_onlineWap		= $('.icon-online-4');
		var hq_onlineWapOld		= $('img[src$="online_wap.gif"]');
		var hq_Quarantined		= $('.icon-quarantined');
		var hq_iconClose		= $('.icon-close, .standardbanner .close');
		var hq_Exclamation		= $('.exclamation, .icon-exclamation, img[src$="warning_icon.png"]');
		var hq_PresFlower		= $('.'+hq_ClassPrefix+'member-intro > .homepage_goldflower');
		var hq_GoldFlower		= $('.icon-gold, .icon-gold.icon-small');
		var hq_reload			= $('.icon-reload');
		var hq_add				= $('#largefavouriteicon, #largeunignoreicon');
		var hq_ignore			= $('#largeignoreicon, #largeunfavouriteicon')
		var hq_flirt			= $('#largeflirticon');
		var hq_dropArrow		= $('[id$="droparrow"]');
		var hq_upIcon			= $('.dropupicon');
		var hq_downIcon			= $('.dropdownicon');
		var hq_clubXXX			= $('#column_center .list [id^="divx"] a.clublink + span.smalltext,#column_center .list [class^="clubxxx"] a.clublink + span.smalltext, #column_center .list [class^="clubxxx"][class$="hidden"] a[href^="/clubs/club.php?id="] + span, .clubxxx1hidden > span > b, .clubxxx2hidden > span > b, .clubxxx3hidden > span > b, .clubxxx4hidden > span > b, .rightcolumn-club.clubxxx1hidden h4, .rightcolumn-club.clubxxx2hidden h4, .rightcolumn-club.clubxxx3hidden h4, .rightcolumn-club.clubxxx4hidden h4, .clubxxx1hidden > span[style="font-weight:bold;"], .clubxxx2hidden > span[style="font-weight:bold;"], .clubxxx3hidden > span[style="font-weight:bold;"], .clubxxx4hidden > span[style="font-weight:bold;"]');
		var hq_clubPublic		= $('#column_center .list [id^="divx"] .small a[onclick^="openEdit"]:not([style*="bold"])');
		var hq_clubHidden		= $('#column_center .list [id^="divx"] .small a[onclick^="openEdit"][style*="bold"]');
		var hq_clubHeader		= $('#column_center .header [href^="/showclubs.php"]:not([href$="&xxx=1"])');
		var hq_clubHeaderX		= $('#column_center .header [href^="/showclubs.php"][href$="&xxx=1"]');
		var hq_MemberSearching	= $('.homepage > a[name="looking_for"] + .homepageblock .line .header');
		var hq_MemPosition		= $('.homepageblock.'+hq_ClassPrefix+'member-position .line .header');
		var hq_MemberVisitors	= $('.homepageblock.'+hq_ClassPrefix+'members:first .line .header a');
		var hq_MemberOther		= $('.homepageblock.'+hq_ClassPrefix+'members:last .line .header');
		var hq_QruiserLogoSVG	= hq_svgFragment+'-logo" alt="Qruiser - The Nordic Gay Lesbian & Queer Online Community'+hq_svgFragmentUse+'#qruiser-logo'+hq_svgFragmentSuffix;
		var hq_qxLogoSVG		= hq_svgFragment+'-qx-logo'+hq_svgFragmentUse+'#qx-logo'+hq_svgFragmentSuffix;
		var hq_logoutSVG		= hq_svgFragment+'-logout'+hq_svgFragmentUse+'#action-logout'+hq_svgFragmentSuffix;
		var hq_homeSVG			= hq_svgFragment+'-home'+hq_svgFragmentUse+'#nav-home'+hq_svgFragmentSuffix;
		var hq_emptyAvatarSVG	= hq_svgFragment+'-noavatar'+hq_svgFragmentUse+'#default-avatar'+hq_svgFragmentSuffix;
		var hq_emptyClubIconSVG = hq_svgFragment+'-noclubicon'+hq_svgFragmentUse+'#default-club'+hq_svgFragmentSuffix;
		var hq_verifiedSVG		= hq_svgFragment+'-verified'+hq_svgFragmentUse+'#member-verified'+hq_svgFragmentSuffix;
		var hq_chatSVG			= hq_svgFragment+'-chat'+hq_svgFragmentUse+'#member-chat'+hq_svgFragmentSuffix;
		var hq_mailSVG			= hq_svgFragment+'-mail'+hq_svgFragmentUse+'#member-messages'+hq_svgFragmentSuffix;
		var hq_mailUnreadSVG	= hq_svgFragment+'-unread'+hq_svgFragmentUse+'#messages-unread'+hq_svgFragmentSuffix;
		var hq_mailAnsweredSVG	= hq_svgFragment+'-answered'+hq_svgFragmentUse+'#messages-answered'+hq_svgFragmentSuffix;
		var hq_mailAttachmentSVG = hq_svgFragment+'-attachment'+hq_svgFragmentUse+'#messages-attachment'+hq_svgFragmentSuffix;
		var hq_padLockSVG		= hq_svgFragment+'-padlock'+hq_svgFragmentUse+'#member-padlock'+hq_svgFragmentSuffix;
		var hq_MemberSearchingSVG = hq_svgFragment+'-lookingfor '+hq_ClassPrefix+'header'+hq_svgFragmentUse+'#member-searching'+hq_svgFragmentSuffix;
		var hq_MemPositionSVG 	= hq_svgFragment+'-position '+hq_ClassPrefix+'header'+hq_svgFragmentUse+'#member-position'+hq_svgFragmentSuffix;
		var hq_MemberVisitorsSVG = hq_svgFragment+'-visitors '+hq_ClassPrefix+'header'+hq_svgFragmentUse+'#member-visitors'+hq_svgFragmentSuffix;
		var hq_MemberOtherSVG	= hq_svgFragment+'-other-visitors '+hq_ClassPrefix+'header'+hq_svgFragmentUse+'#member-other'+hq_svgFragmentSuffix;
		var hq_clearSVG			= hq_svgFragment+'-clear'+hq_svgFragmentUse+'#action-zero'+hq_svgFragmentSuffix;
		var hq_abuseSVG			= hq_svgFragment+'-abuse'+hq_svgFragmentUse+'#action-abuse'+hq_svgFragmentSuffix;
		var hq_heartIconSVG		= hq_svgFragment+'-favorite'+hq_svgFragmentUse+'#nav-favorites'+hq_svgFragmentSuffix;
		var hq_mutedIconSVG		= hq_svgFragment+'-ignored'+hq_svgFragmentUse+'#member-ignored'+hq_svgFragmentSuffix;
		var hq_textIconSVG		= hq_svgFragment+'-text'+hq_svgFragmentUse+'#action-edit-text'+hq_svgFragmentSuffix;
		var hq_infoIconSVG		= hq_svgFragment+'-info'+hq_svgFragmentUse+'#member-info'+hq_svgFragmentSuffix;
		var hq_blogSVG			= hq_svgFragment+'-blog'+hq_svgFragmentUse+'#member-blog'+hq_svgFragmentSuffix;
		var hq_diarySVG			= hq_svgFragment+'-diary'+hq_svgFragmentUse+'#member-diary'+hq_svgFragmentSuffix;
		var hq_photoalbumSVG	= hq_svgFragment+'-photo-album'+hq_svgFragmentUse+'#member-photo-album'+hq_svgFragmentSuffix;
		var hq_movieSVG			= hq_svgFragment+'-movie'+hq_svgFragmentUse+'#member-movie'+hq_svgFragmentSuffix;
		var hq_guestbookSVG		= hq_svgFragment+'-guestbook'+hq_svgFragmentUse+'#member-guestbook'+hq_svgFragmentSuffix;
		var hq_pollSVG			= hq_svgFragment+'-poll'+hq_svgFragmentUse+'#member-poll'+hq_svgFragmentSuffix;
		var hq_videoSVG			= hq_svgFragment+'-movie'+hq_svgFragmentUse+'#movie-white'+hq_svgFragmentSuffix;
		var hq_videoStarSVG		= hq_svgFragment+'-star'+hq_svgFragmentUse+'#movie-star'+hq_svgFragmentSuffix;
		var hq_editSVG			= hq_svgFragment+'-edit'+hq_svgFragmentUse+'#action-edit'+hq_svgFragmentSuffix;
		var hq_OnlineAct1SVG	= hq_svgFragment+'-online-inactive'+hq_svgFragmentUse+'#online-inactive'+hq_svgFragmentSuffix;
		var hq_OnlineAct2SVG	= hq_svgFragment+'-online-active'+hq_svgFragmentUse+'#online-active'+hq_svgFragmentSuffix;
		var hq_QuarantinedSVG	= hq_svgFragment+'-quarantined'+hq_svgFragmentUse+'#online-new'+hq_svgFragmentSuffix;
		var hq_onlineWapSVG		= hq_svgFragment+'-online-wap'+hq_svgFragmentUse+'#online-wap'+hq_svgFragmentSuffix;
		var hq_iconCloseSVG		= hq_svgFragment+'-icon-close'+hq_svgFragmentUse+'#action-delete'+hq_svgFragmentSuffix;
		var hq_ExclamationSVG	= hq_svgFragment+'-icon-exclamation'+hq_svgFragmentUse+'#qx-exclamation'+hq_svgFragmentSuffix;
		var hq_FlowerSVG		= hq_svgFragment+'-flower'+hq_svgFragmentUse+'#qx-flower'+hq_svgFragmentSuffix;
		var hq_GoldFlowerSVG	= hq_svgFragment+'-goldflower'+hq_svgFragmentUse+'#qx-gold-flower'+hq_svgFragmentSuffix;
		var hq_reloadSVG		= hq_svgFragment+'-reload'+hq_svgFragmentUse+'#action-reload'+hq_svgFragmentSuffix;
		var hq_addSVG			= hq_svgFragment+'-add'+hq_svgFragmentUse+'#action-add'+hq_svgFragmentSuffix;
		var hq_ignoreSVG		= hq_svgFragment+'-ignore'+hq_svgFragmentUse+'#action-remove'+hq_svgFragmentSuffix;
		var hq_flirtSVG			= hq_svgFragment+'-flirt'+hq_svgFragmentUse+'#action-flirt'+hq_svgFragmentSuffix;
		var hq_dropArrowUpSVG	= hq_svgFragment+'-dropup'+hq_svgFragmentUse+'#action-info-open'+hq_svgFragmentSuffix;
		var hq_dropArrowDownSVG	= hq_svgFragment+'-dropdown'+hq_svgFragmentUse+'#action-info-close'+hq_svgFragmentSuffix;
		var hq_clubXXXSVG		= hq_svgFragment+'-clubxxx'+hq_svgFragmentUse+'#club-xxx'+hq_svgFragmentSuffix;
		var hq_clubPublicSVG	= hq_svgFragment+'-clubpublic'+hq_svgFragmentUse+'#nav-home'+hq_svgFragmentSuffix;
		var hq_clubHiddenSVG	= hq_svgFragment+'-clubhidden'+hq_svgFragmentUse+'#club-hidden'+hq_svgFragmentSuffix;
		var hq_moviesLikedSVG	= hq_svgFragment+'-movies-liked '+hq_ClassPrefix+'header'+hq_svgFragmentUse+'#movies-liked'+hq_svgFragmentSuffix;
		var hq_clubHeaderSVG	= hq_svgFragment+'-clubs--header '+hq_ClassPrefix+'header'+hq_svgFragmentUse+'#clubs-header'+hq_svgFragmentSuffix;
		var hq_clubHeaderXSVG	= hq_svgFragment+'-clubs--header '+hq_ClassPrefix+'header'+hq_svgFragmentUse+'#clubs-header-xxx'+hq_svgFragmentSuffix;

		hq_Body.append( hq_SVGsprite );
		var pngBeGone = function() {
			hq_QruiserLogo.after( hq_QruiserLogoSVG );
			hq_qxLogo.append( hq_qxLogoSVG );
			hq_qmenuLogout.append( hq_logoutSVG );
			hq_qmenuHome.append( hq_homeSVG );// TODO Remove the whitespace node
			hq_emptyAvatar.append( hq_emptyAvatarSVG );
			hq_emptyClubIcon.after( hq_emptyClubIconSVG );
			hq_xxxClubWarning.append( hq_emptyClubIconSVG );
			hq_verified.append( hq_verifiedSVG );
			hq_chat.append( hq_chatSVG );
			hq_mail.append( hq_mailSVG );
			hq_mailUnread.append( hq_mailUnreadSVG );
			hq_mailAnswered.append( hq_mailAnsweredSVG );
			hq_mailAttachment.append( hq_mailAttachmentSVG );
			hq_padLock.append( hq_padLockSVG );
			hq_blog.append( hq_blogSVG );
			hq_diary.append( hq_diarySVG );
			hq_photoalbum.append( hq_photoalbumSVG );
			hq_movie.append( hq_movieSVG );
			hq_moviesLiked.prepend( hq_moviesLikedSVG );
			hq_guestbook.append( hq_guestbookSVG );
			hq_poll.append( hq_pollSVG );
			hq_video.append( hq_videoSVG );
			hq_videoStar.after( hq_videoStarSVG );
			hq_edit.append( hq_editSVG );
			hq_edit_menu.after( hq_editSVG );
			hq_clear.append( hq_clearSVG );
			hq_abuse.after( hq_abuseSVG );
			hq_heartIcon.append( hq_heartIconSVG );
			hq_heartIcon2.after( hq_heartIconSVG );
			hq_mutedIcon.append( hq_mutedIconSVG );
			hq_textIcon.append( hq_textIconSVG );
			hq_infoIcon.append( hq_infoIconSVG );
			hq_OnlineAct1.append( hq_OnlineAct1SVG );
			hq_OnlineAct2.append( hq_OnlineAct2SVG );
			hq_Quarantined.append( hq_QuarantinedSVG );
			hq_onlineWap.append( hq_onlineWapSVG );
			hq_onlineWapOld.after( hq_onlineWapSVG );
			hq_iconClose.append( hq_iconCloseSVG );
			hq_Exclamation.after( hq_ExclamationSVG );
			hq_PresFlower.after( hq_FlowerSVG );
			hq_GoldFlower.append( hq_FlowerSVG );
			hq_reload.append( hq_reloadSVG );
			hq_add.append( hq_addSVG );
			hq_ignore.append( hq_ignoreSVG );
			hq_flirt.append( hq_flirtSVG );
			hq_upIcon.append( hq_dropArrowUpSVG );
			hq_downIcon.append( hq_dropArrowDownSVG );
			hq_dropArrow.after( hq_dropArrowUpSVG, hq_dropArrowDownSVG );
			hq_clubXXX.append( hq_clubXXXSVG );
			hq_MemberSearching.prepend( hq_MemberSearchingSVG );
			hq_MemPosition.prepend( hq_MemPositionSVG );
			hq_MemberVisitors.prepend( hq_MemberVisitorsSVG );
			hq_MemberOther.prepend( hq_MemberOtherSVG );
			hq_clubPublic.append( hq_clubPublicSVG );
			hq_clubHidden.append( hq_clubHiddenSVG );
			hq_clubHeader.prepend( hq_clubHeaderSVG );
			hq_clubHeaderX.prepend( hq_clubHeaderXSVG );
		};
		pngBeGone();
	};
	function NeedsToBeDone() {
		{
			var hq_diggedMovies			= window.location.href.indexOf('/showmovies_digged.php');
			var hq_MemberProfileLink	= window.location.href.indexOf("/?id=");
			var hq_msgOld				= window.location.href.indexOf('/messages.php');// NOTE HACK
			var hq_MemberProfileId		= window.location.href.split('?id=');
			var hq_DocBody				= $(document.body);
			var hq_Window				= $(window);
			var hq_HtmlBody				= $('html, body');
			var hq_TopMenu				= $('#qmenu');
			var hq_Width100				= $('.column-content textarea, .video-js[class*="video_"][class*="-dimensions"], .list .messages, #clubinfo_text + p + div.small[style*="float:right;"], .listpagelinks, .listpagenumber, form, [data-user-input], #homepageinfo, .homepageblock .relative, .column-center .column-content, .homepage, .line, img.background-image, .column-content div[style*="width:"]:not([style*="16px"]), #column_right.column-right, .container.gaymap-today .container-header, .container-columns, .clubxxx1,.clubxxx2,.clubxxx3,.clubxxx4, .container-column img, .insertmember, .insertmember .link, .insertmember .description, .insertmember .icons, .blog-teasers, .teaser-image, #qmenu li a, #changemood');
			var hq_hideStuff			= $('#qmenu_edit > a > img[src$="editblock.png"], .list + br, img#logo_qruiser, #subnavbar .clear, [id$="droparrow"], #qmenu_home a span, #scrvideo_text + br, img[src$="star.png"], #largeicons li > div, img[src$="abuse.gif"], .homebuttons li > div, img[src$="heart4.gif"], [id$="_text"] + p:empty, img[src$="xxxclub.gif"], img.homepage_goldflower, .signed-in-gold .external-ad, .rightcolumn-club-icon-empty, .hqx-flex-item > br:last-child, .errorText ~ div[style*="/shadow/"], a[href*="javascript:openEdit(\'sms\')"], br[clear="all"], br[clear="all"] + br, .emptymembericon img[src$="blank.gif"], #column_center a.clublink > img[src$="blank.gif"], [id$="_text"] + p:empty + p[style="padding-top:10px;"]:empty, [class^="clubxxx"][class$="hidden"] > div[style*="height: 110px;"]:first-child, [class$="hidden"] > img.xxx1, [class$="hidden"] > img.xxx3, [class$="hidden"] > img.xxx4');
			var hq_removeEmpty			= $('#column_center .even:empty, .thinlineup:empty, .homepageblock div[style="float:left;width:140px"]:first-child, .block img[src$="blank.gif"]:not([style*="/photothumbnails/"]), .homepageblock div[style="float:left;width:70px"], li div[style="width: 10px; height: 9px"]:empty,div[style="width: 10px; height: 10px"]:empty');
			var hq_inlineCleaning		= $('.movies-listing .even div, .movies-listing .odd div, .movies-listing > div:nth-of-type(3), .video-thumb img[src$="star.png"], .video-thumb span, .attachedicon, span.homelink, div[style*="font-size: 10px;"], .block[style*="font-size: 11px;"], .icons li, .line .header span, #search form, #largeediticon, a[style*="text-decoration"]:not([style*="bold"]):not([href*="javascript:dropContent"]), i.icon, .emptymembericon, .noticetext');
			var hq_searchNodes			= $('[id^="column_"], .odd, .even, .container--favourites .notextdecoration');
			var hq_searchXxxNodes		= $('.column-content .odd > div[style*="float"] > [class*="clubxxx"]:not([class$="hidden"]) + div > [class*="clubxxx"]:not([class$="hidden"]) > div:nth-of-type(2), .column-content .even > div[style*="float"] > [class*="clubxxx"]:not([class$="hidden"]) + div > [class*="clubxxx"]:not([class$="hidden"]) > div:nth-of-type(2)');
			var hq_GetTitleText			= $('[href*="addscribble"], [href*="becomemember"], [href*="adddiscussion"], [onclick^="abusereport"], [onclick^="toggleAbuse"], a[href="javascript:toggleShowas()"], .container-header a, .header a, .homepageblock a[href^="/showmovies.php"], a[onclick^="openEdit"] > span, .small > a[onclick^="openEdit"], [class^="clubxxx"] a.clublink + .smalltext, a.clublink, .insertmember .mood');
			var hq_logoLink				= $('#whole > #header > #home > a[href="/"]');
			var hq_Sticky				= $('.container.container--favourites, #loginbox, #whole #qmenu, #column_left.column-left .container:first-of-type, .container--chat-list, .container--personal, .container--your-search, .container.logged-in, .column-content p + h2 + p[style*="margin-top: 0.5em;"]');
			var hq_MakeButton			= $('[onclick^="abusereport"], [onclick^="toggleAbuse"], [class*="banner"] .actions .action, .column-center #goldmemberbanner .actions .action, .column-center #profilewizard .actions .action, [type="reset"],[type="button"],[type="submit"],input[type="submit"],button[type="submit"],[href*="addscribble"],[href*="becomemember"],[href*="adddiscussion"],#column_center #zeroall,h3 [href^="/signup.php"],[href$="&show_admin_members=1"],[href*="/clubs/club_edit.php?clubid="],#column_center button,button.modal-close,div:not([class*="button"]):not([class*="subnavbar-item"]) > [href*="/createclub/"],#column_center .small + .list + p + div[style="float:right;"], form[name="sort"] + .list + div[style="margin-top:10px; float: right"]:last-of-type');
			var hq_MakeGridContainer	= $('#whole, #header, #qmenu, #whole .main-content, .insertmember');
			var hq_MakeGridItem			= $('');
			var hq_MakeList				= $('.movies-listing > div:nth-of-type(3), #column_center.column-center h2 + p[style="margin-top: 0.5em;"] + div:not(#homepageinfo):not(#map_canvas):not(.list):not([id^="album_"]):not(.odd):not(.even):not(.gallery):not([class*="hidden"]), .column-content .line + div:not(#homepageinfo):not(#map_canvas):not(.list):not([id^="album_"]):not(.odd):not(.even):not(.gallery):not([class*="hidden"])');
			var hq_MakeFlexContainer	= $('#digexplained_text + p:empty + .small + div, .homepageblock > #homepageinfo, .homepageblock > [id^="album_"][id$="_info"].block, .images-homepage-image, .images-homepage, .list, .gallery, .container-columns, .insertmember .link, .insertmember .icons, .scribbleboard-holder, .blog-teasers, #scroller > div[style*="width:41"], .movies-listing > div:nth-of-type(3), #column_center.column-center h2 + p[style="margin-top: 0.5em;"] + div:not(#homepageinfo):not(#map_canvas):not(.list):not([id^="album_"]):not(.odd):not(.even):not(.gallery):not([class*="hidden"]), .column-content .line + div:not(#homepageinfo):not(#map_canvas):not(.list):not([id^="album_"]):not(.odd):not(.even):not(.gallery):not([class*="hidden"])');
			var hq_MakeFlexItem			= $('.homepageblock > #homepageinfo > .infoblock, .homepageblock > .block > a[href^="javascript:openPhotoPopup"], .list > .odd, .list > .even, .odd, .even');
			var hq_SubNavButtons		= $('#subnavbar .subnavbar-item ');
			var hq_HomePageFlex			= $('.homepageblock');
			var hq_HomePagePresentation	= $('.homepage > div[style="padding-top: 10px"] + .block');
			var hq_HomePageStats		= $('.homepage > div[style="padding-top: 10px"] + .block + .homepageblock');
			var hq_HomePageLookingFor	= $('.homepage > a[name="looking_for"] + .homepageblock ');
			var hq_starSign				= $('img[src*="/starsigns/"][style*="block"]');
			var hq_ScribbleImages		= $('img[src*="/scribbleimages/"]');
			var hq_seFlag				= $('.icon-flag-SE');
			var hq_noFlag				= $('.icon-flag-NO');
			var hq_dkFlag				= $('.icon-flag-DK');
			var hq_fiFlag				= $('.icon-flag-FI');
			var hq_ukFlag				= $('.icon-flag-UK');
			var hq_deFlag				= $('.icon-flag-DE');
			//var hq_HomeMovieTitle		= $('.homepageblock > div:nth-of-type(3) > div > video-thumb-holder + div > a[href^="/showmovies.php"]');
			var hq_colRight				= $('#column_right.column-right');
			var hq_TeaserDiv	 		= $('.blog-teasers');
			var hq_wholeID				= $('#whole');
			var hq_MemberPres			= $('.homepage div[style="display: block; min-height:150px;"]:first-of-type, .homepage #buff_block + div');
			var hq_AdminUser			= $('.insertmember > a[href="/support.php"]');
			var hq_MovieTitle			= $('div:not(.video-thumb-holder) > a[href^="/showmovies.php"], .homepage div[style="font-weight: bold; line-height: 14px;"] > a[href^="/showmovies.php"]');
			var hq_TitleWrapper			= $('.movies-listing > div:nth-of-type(3) > div:not(.listpagenumber) > div > div:nth-of-type(3) > div[class^="clubxxx"]:not([class$="hidden"]), .movies-listing .video-thumb-holder + div, .homepage div[style="font-weight: bold; line-height: 14px;"]');
			var hq_ChatHeaderText		= $('.container--chat-list .container-header a');
			var hq_LatestFavMember		= $('.container.container--last-logged-in > .container-inner > .insertmember');
			var hq_LatestFavDiv			= $('.container.container--last-logged-in');
			var hq_FavoritesDiv			= $('.container.container--favourites');
		}
		{
			var hq_ClassPrefix			= 'qxh-';
			var hq_IdPrefix				= 'qxh_';
			var hq_ClassMain			= 'hexagon';
			var hq_FragmentSpan			= '<span class="'+hq_ClassPrefix;
			var hq_FragmentDiv			= '<div class="'+hq_ClassPrefix;
			var hq_FragmentSuffix		= '" />';
			var hq_mainContent			= ".main-content";
			var hq_ClassOddEven			= '.odd, .even';
			var hq_ClassAlert			= hq_ClassPrefix+'alert';
			var hq_ClassW100			= hq_ClassPrefix+'w100';
			var hq_ClassHidden			= hq_ClassPrefix+'hidden';
			var hq_ClassMemberBody		= hq_ClassPrefix+'source-profile '+hq_ClassPrefix+'template-profile-member'+hq_MemberProfileId[1];
			var hq_ClassMemIntro		= hq_ClassPrefix+'member-intro';
			var hq_ClassHpStats			= hq_ClassPrefix+'member-stats';
			var hq_ClassHpPresentation	= hq_ClassPrefix+'member-presentation';
			var hq_ClassHpLookingFor	= hq_ClassPrefix+'member-lookingfor';
			var hq_ClassGridContainer	= hq_ClassPrefix+'grid-container';
			var hq_ClassGridItem		= hq_ClassPrefix+'grid-item';
			var hq_ClassMakeList		= hq_ClassPrefix+'list';
			var hq_ClassFlexContainer	= hq_ClassPrefix+'flex-container';
			var hq_ClassFlexItem		= hq_ClassPrefix+'flex-item';
			var hq_ClassStickyWidget	= hq_ClassPrefix+'widget--sticky';
			var hq_ClassButton			= hq_ClassPrefix+'button';
			var hq_ClassScribbleImg		= hq_ClassPrefix+'scribble-image';
			var hq_ClassClean			= hq_ClassPrefix+'clean';
			var hq_ClassMovieTitle		= hq_ClassPrefix+'movie-title';
			var hqClassTitleWrapper		= hq_ClassPrefix+'title-wrapper';
			var hq_ClassShadow			= hq_ClassPrefix+'shadow';
			var hq_ClassFirstWord		= hq_ClassPrefix+'firstWord';
			var hq_ClassSubNavGrid		= 'subnav-grid';
			var hq_ClassStarSign		= 'starsign';
			var hq_ClassXxx				= 'xxx';
			var hq_spanText				= hq_FragmentSpan+'text'+hq_FragmentSuffix;
			var hq_IdMemberBody			= hq_IdPrefix+'member_'+hq_MemberProfileId[1];
			var hq_SpanXxx				= hq_FragmentSpan+hq_ClassXxx+hq_FragmentSuffix;
			var hq_SpanStarSign			= hq_FragmentSpan+hq_ClassStarSign+hq_FragmentSuffix;
			var hq_subNavGrid			= hq_FragmentDiv+hq_ClassSubNavGrid+hq_FragmentSuffix;
			var hq_logoLinkTitle		= 'Qruiser - The Nordic Gay Lesbian & Queer Online Community';
			var hq_seFlagTitle			= 'Svenska / Swedish';
			var hq_noFlagTitle			= 'Norsk / Norwegian';
			var hq_dkFlagTitle			= 'Dansk / Danish';
			var hq_fiFlagTitle			= 'Soumi / Finnish';
			var hq_ukFlagTitle			= 'English';
			var hq_deFlagTitle			= 'Deutsch / German';
			var hq_NoHomePageList		= ':has([class*="list"],.homepageblock > .smalltext, .gallery, #map_canvas, #homepageinfo, .block)';
			var hq_topContent			= "#header";
			var hq_Favorites			= '.container.container--favourites > .container-inner';
			var hq_MailBox				= '.container.container--mailbox';
		}

		hq_HtmlBody.addClass( hq_ClassMain );
		// NOTE Add a bottom shadow to the #qmenu when we scroll down
		hq_Window.scroll(function() {
			if (hq_Window.scrollTop() > 192) {
				hq_TopMenu.addClass( hq_ClassShadow );
			} else {
				hq_TopMenu.removeClass( hq_ClassShadow );
			}
		});
		// NOTE Make sure that the right column realy is where it should be!
		// TODO Remove ASAP
		if ( hq_colRight.parent().is( hq_wholeID ) ) {
			hq_colRight.appendTo( hq_mainContent ),
			console.log('#column_right.column-right was moved to '+hq_mainContent);
		} else {
			console.info('#column_right.column-right is already in place');
		}
		// NOTE Move .blog-teasers to #header
		if ( hq_TeaserDiv.parent().not( hq_topContent ) ) hq_TeaserDiv.appendTo(hq_topContent),
			console.log('.blog-teasers was moved to '+hq_topContent);
		// NOTE Remove inline styles
		hq_inlineCleaning.removeAttr("style").addClass( hq_ClassClean );
		hq_ScribbleImages.removeAttr("style").addClass( hq_ClassScribbleImg );
		// NOTE Delete empty nodes
		hq_removeEmpty.remove();
		// NOTE Hide stuff that is empty, but still needed atm
		hq_hideStuff.addClass( hq_ClassHidden );
		// NOTE Remove any hard coded withs and add the class .qxh-w100
		hq_Width100.css("width","").addClass( hq_ClassW100 );
		// NOTE Wrap all text nodes inside a span.text
		hq_searchNodes.contents().filter(function() {
			return this.nodeType == 3 && $.trim(this.nodeValue).length;
		}).wrap( hq_spanText );
		hq_Sticky.addClass( hq_ClassStickyWidget );
		// NOTE Wrap all divs so we can style there parent
		hq_SubNavButtons.wrapAll( hq_subNavGrid );
		hq_MakeButton.addClass( hq_ClassButton );
		hq_MovieTitle.addClass( hq_ClassMovieTitle );
		hq_TitleWrapper.addClass( hqClassTitleWrapper ).removeAttr('style');
		hq_MakeGridContainer.addClass( hq_ClassGridContainer ),
		//hq_MakeFlexContainer.addClass( hq_ClassFlexContainer );
		hq_MakeList.addClass( hq_ClassMakeList ),
		// https://stackoverflow.com/a/31116022/6820262 & http://jsfiddle.net/tusharj/rv2jc04c/
		hq_MakeFlexContainer.addClass( hq_ClassFlexContainer ).each(function() {
			// Get all the `items` inside this `wrapper`
			var hq_this = $(this);
			hq_this.find( hq_MakeFlexItem ).each(function () {
				var hq_this = $(this);
				// Add class using the `index()` of this element
				hq_this.addClass( hq_ClassFlexItem ).removeClass('odd even').attr('data-index', function(){
					var hq_this = $(this);
					return (hq_this.index() + 1)
				});
				// Add data-index attribute using the `index()` of this element
			});
		});
		// Get links text and set it as title for the link
		hq_GetTitleText.attr('title', function() {
			var hq_this = $(this);
			return hq_this.text()
		});
		// Set the correct title for the logo link
		hq_logoLink.attr('title', hq_logoLinkTitle),
		hq_seFlag.attr('title', hq_seFlagTitle),
		hq_noFlag.attr('title', hq_noFlagTitle),
		hq_dkFlag.attr('title', hq_dkFlagTitle),
		hq_fiFlag.attr('title', hq_fiFlagTitle),
		hq_ukFlag.attr('title', hq_ukFlagTitle),
		hq_deFlag.attr('title', hq_deFlagTitle);

		// NOTE First word in title
		// Function from: https://www.jaredatchison.com/code/use-jquery-manipulate-first-last-word-element/
		hq_ChatHeaderText.html(function(){
			var text = $(this).text().split(' ');
			var first = text.shift();
			return (text.length > 0 ? hq_FragmentSpan+'hidden '+hq_ClassFirstWord+'">'+first+'</span> ' : first) + text.join(" ");
			//return (text.length > 0 ? '<span class="qxh-hidden qxh-firstWord">'+first+'</span> ' : first) + text.join(" ");
		});
		// NOTE Last word in title
		//$('.sidebar-primary .widget-title').html(function(){
		//	var text = $(this).text().split(' ');
		//	var last = text.pop();
		//	return text.join(" ") + (text.length > 0 ? ' <span class="qxh-lastWord">'+last+'</span>' : last);
		//});

		// NOTE Move Latest logged in favorites to the Favorites widget
		hq_LatestFavMember.appendTo( hq_Favorites ),hq_LatestFavDiv.remove();
		// NOTE Move the Favorites widget above the Mail/Message Widget
		hq_FavoritesDiv.insertBefore( hq_MailBox );

		// HACK for the old not logged in index
		if ( !$(document.body).hasClass("signed-in") ) {
			var hq_ClassDot			= '.';
			var hq_ClassFrontCols	= hq_ClassPrefix+'front-columns';
			var hq_ClassFrontImg	= hq_ClassPrefix+'front-image';
			var hq_ClassFrontText	= hq_ClassPrefix+'front-text';
			var hq_frontImgDiv		= 'div[style*="width:80px;"]';
			var hq_frontTextDiv		= 'div[style*="width:105px;"]';
			var hq_frontCssArray	= {"float" : "","margin-top" : "","margin-right" : "","margin-bottom" : "","overflow" : ""};

			var hq_frontImg			= $( hq_frontImgDiv ).addClass( hq_ClassFrontImg );
			var hq_frontText		= $( hq_frontTextDiv ).addClass( hq_ClassFrontText );
			var hq_flexItem			= hq_ClassDot+hq_ClassFlexItem;

			var hq_divTargets		= $(hq_frontImgDiv + ',' + hq_frontTextDiv);
			var hq_frontGroups		= hq_divTargets.length;
			var hq_frontMainWrap	= '<div class="'+hq_ClassFlexContainer+'" />';
			var hq_frontGroupDiv	= '<div class="'+hq_ClassFrontCols+' '+hq_ClassFlexItem+'" />';
			// https://stackoverflow.com/questions/13489450/wrap-every-2-divs-in-a-new-div
			for ( var i = 0;i < hq_frontGroups;i+=2 ){
				hq_divTargets.filter( ':eq('+i+'),:eq('+(i+1)+')' ).wrapAll( hq_frontGroupDiv );
			};

			hq_frontImg.css( hq_frontCssArray );
			hq_frontText.removeAttr("style");
			$( '#column_center > .qxh-flex-item' ).wrapAll( hq_frontMainWrap );
			console.log('Frontpage done');
		}
		//
		if( hq_msgOld > -1 ) {
			hq_AdminUser.parents( '.'+hq_ClassFlexItem ).addClass( hq_ClassAlert );
		};
		// TEMP Dirty HACK to be able to keep functionality on member profiles!
		if( hq_MemberProfileLink > -1) {
			var hq_BuyGoldToFlower	= $('.hideself_ > a:first-of-type[href^="javascript:buygold"]');
			var hq_BuyGoldToName	= $('.hideself_ > a:last-of-type[href^="javascript:buygold"] > b');
			var hq_BuyGoldCleanUp	= $('.hideself_ > a:last-of-type[href^="javascript:buygold"]');
			var hq_ProfileFacePic	= $('img[src^="/thumbcorners.php"][style*="/memberthumbnails/"]');
			var hq_ProfileHeroImg	= $('.homepage > div[style="padding-top: 10px"]');
			var hq_MemberPosition	= $('.homepageblock #map_canvas');
			var hq_HomeMembers		= $('.homepageblock > .gallery.gallery-scroll');
			var hq_ClassMemberFace	= hq_ClassPrefix+'member-faceimage';
			var hq_ClassMemHeroImg	= hq_ClassPrefix+'member-heroimage';
			var hq_ClassMemPosition	= hq_ClassPrefix+'member-position';
			var hq_ClassMembers		= hq_ClassPrefix+'members';
			var hq_ClassVisitors	= hq_ClassPrefix+'member-visitors';
			var hq_ClassOther		= hq_ClassPrefix+'other-members';

			console.info("Qruiser: We have a renegade template"),
			hq_DocBody.addClass( hq_ClassMemberBody ).attr("id", hq_IdMemberBody),
			hq_MemberPres.addClass( hq_ClassMemIntro ),
			hq_ProfileFacePic.addClass( hq_ClassMemberFace ).css('margin-right',''),
			hq_ProfileHeroImg.addClass( 'homepageblock '+hq_ClassMemHeroImg ).removeAttr('style'),
			hq_starSign.wrap( hq_SpanStarSign ),
			hq_HomePageStats.addClass( hq_ClassHpStats ),
			hq_BuyGoldToName.appendTo( hq_BuyGoldToFlower ), hq_BuyGoldCleanUp.remove(),// NOTE Merge the two buy gold links to one
			hq_HomePagePresentation.addClass( 'homepageblock '+hq_ClassHpPresentation ),
			hq_HomePageLookingFor.addClass( hq_ClassHpLookingFor ),
			hq_MemberPosition.parent().addClass( hq_ClassMemPosition ),
			hq_HomePageFlex.not( ( hq_NoHomePageList ) ).addClass( hq_ClassFlexContainer ),
			hq_MakeFlexItem.addClass( hq_ClassFlexItem ).removeClass('odd even');
			hq_HomeMembers.parent().addClass( hq_ClassMembers ),
			$('.'+hq_ClassMembers+':first').addClass( hq_ClassVisitors ),
			$('.'+hq_ClassMembers+':first > .line > .header').replaceWith(function() {
				return '<span class="header"><a href="/visitors.php">' + this.innerHTML + '</a></span>';
			});
			$('.'+hq_ClassMembers+':last').addClass( hq_ClassOther );

			// NOTE Replace <div> with <section> https://stackoverflow.com/a/11707394/6820262
			//$(".homepage > div.homepageblock").replaceWith(function() {
			//	return "<section class='homepageblock'>" + this.innerHTML + "</section>";
			//});
		}
		if ( hq_diggedMovies > -1 ) {
			hq_searchXxxNodes.contents().filter(function() {
				return this.nodeType == 3 && $.trim(this.nodeValue).length;
			}).wrap( hq_SpanXxx );
			// TEMP FIXME
			hq_searchXxxNodes.append( '<svg class="qxh-sprite-icon qxh-icon-clubxxx"><use xlink:href="#club-xxx" /></svg>' );
		}
		//hq_MakeFlexItem.addClass( hq_ClassFlexItem ).removeClass('odd even');
		//$('.gallery.gallery-scroll').removeClass('gallery-scroll');
	};
	NeedsToBeDone();
	addSprite();
	// NOTE Don't Look Back, Just Get it Done!
	$(document).on("ready",HexaGon.init);
})(window, document, jQuery);
