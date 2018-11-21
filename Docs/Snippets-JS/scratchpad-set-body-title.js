// ==UserScript==
// @name     QX setWindowTitles
// @version  		0
// @icon				 https://blog.xenproject.org/wp-content/uploads/2014/10/Testing.jpg
// @icon				http://www.sctest.org/content/themes/sctest/assets/i/sctest-logo-icon.svg
// @grant       none
// @namespace		https://github.com/BlackSkorpio/
// @include *oxygen.local*
// @include *qruiser.com*
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// ==/UserScript==

if ( $(document.body).hasClass("signed-in") ) {
	function setWindowTitles() {
		var url				= window.location.href;
		var TitlePrefix		= 'Qruiser - ';
		var TitleSuffix		= ' - The Nordic Gay & Queer Online Community';
		var TitleSpacer		= ' - ';
		var GetTemplateName	= $('#current_page');
		var GetSubNavTitle	= $('#subnavbar .subnavbar-item--active > a');
		var GetClubName		= $('.column-content h2:first-of-type > a');
		var GetClubSection	= $('.column-content h2:first-of-type + p > b > a');
		var GetClubThread	= $('.column-content .odd > div > h2:first-of-type');
		var GetNickName		= $('.column-content h2:first-of-type > a');
		var GetShowClubsTitle = $('#clubinfo_text + p:empty + div > b > a');
		var GetUpdatedTitle	= $('.column-content #error_texts ~ h2:first-of-type');
		var GetMapTitle		= $('.column-content #error_texts + div.small + p + .insertmember + p + h2:first-of-type');
		var GetSentryTitle	= $('#column_right .container-header > a[href="/sentry.php"]');
		var url_clubs		= url.indexOf( '/clubs/' );
		var url_movies		= url.indexOf( '/movies/' );
		var url_texts		= url.indexOf( '/texts/' );
		var url_members		= url.indexOf( '/members/' );
		var url_forum		= url.indexOf( '/forum/' );
		var url_info		= url.indexOf( '/info/' );
		var url_pics		= url.indexOf( '/pics/' );
		var url_chat		= url.indexOf( '/chat/' );
		var url_Club		= url.indexOf( 'club.php' );
		var url_Cmembers	= url.indexOf( 'clubmembers.php' );
		var url_Cscribbles	= url.indexOf( 'clubscribble.php' );
		var url_Cpolls		= url.indexOf( 'clubpolls.php' );
		var url_Cdiscussions = url.indexOf( 'clubdiscuss.php' );
		var url_profile		= url.indexOf('/?id=');
		var url_map			= url.indexOf('/map.php');
		var url_showclubs	= url.indexOf('/showclubs.php');
		var url_closeToYou	= url.indexOf( '/members/close_to_you/' );
		var url_favorites	= url.indexOf('/favourites.php');
		var url_showFavs	= url.indexOf('/showfavourites.php');
		var url_youasFav	= url.indexOf('/youasfavourite.php');
		var url_ignored		= url.indexOf('/ignored.php');
		var url_visitors	= url.indexOf('/visitors.php');
		var url_visited		= url.indexOf('/visited.php');
		var url_buffs		= url.indexOf('/buffs.php');
		var url_showMovies	= url.indexOf('/showmovies.php');
		var url_moviesDigged = url.indexOf('/showmovies_digged.php');
		var url_showPolls	= url.indexOf('/showpolls.php');
		var url_verified	= url.indexOf('/verified.php');
		var url_verifiedBy	= url.indexOf('/verified_byme.php');
		var url_favUpdated	= url.indexOf('/favourites_updated.php');
		var url_blogOverview = url.indexOf('/blog_overview.php');
		var url_blogCreate	= url.indexOf('/blog_create.php');
		var url_showDiary	= url.indexOf('/showdiary.php');
		var url_giftCards	= url.indexOf('/yourgiftcards.php');
		var url_askSentry	= url.indexOf('/sentry.php');


		if ( typeof GetClubName !== 'undefined' || GetClubName !== null ) {
			var ClubName = GetClubName.text();
		}
		if ( typeof GetClubSection !== 'undefined' || GetClubSection !== null ) {
			var ClubSection = GetClubSection.text();
		}
		if ( typeof GetClubThread !== 'undefined' || GetClubThread !== null ) {
			var ClubThread = GetClubThread.text();
		}
		if ( typeof GetTemplateName !== 'undefined' || GetTemplateName !== null ) {
			var TemplateName = GetTemplateName.text();
		}
		if ( typeof GetSubNavTitle !== 'undefined' || GetSubNavTitle !== null ) {
			var SubNavTitle = GetSubNavTitle.text();
		}
		if ( typeof GetNickName !== 'undefined' || GetNickName !== null ) {
			// Replace any _ with space: https://stackoverflow.com/a/34671415/6820262
			var NickName = GetNickName.text().replace(/_/g, " ");
		}
		if ( typeof GetShowClubsTitle !== 'undefined' || GetShowClubsTitle !== null ) {
			var ShowClubsSection = GetShowClubsTitle.text();
		}
		if ( typeof GetUpdatedTitle !== 'undefined' || GetUpdatedTitle !== null ) {
			var UpdatedSection = GetUpdatedTitle.text();
		}
		if ( typeof GetMapTitle !== 'undefined' || GetMapTitle !== null ) {
			var MapTitle = GetMapTitle.text();
		}
		if ( typeof GetSentryTitle !== 'undefined' || GetSentryTitle !== null ) {
			var SentryTitle = GetSentryTitle.text();
		}

		if ( ( url_clubs > -1 ) || ( url_movies > -1 ) || ( url_texts > -1 ) ) {
			var MembersTitle = TitlePrefix + SubNavTitle + ' ' + TemplateName + TitleSuffix;
			document.title = MembersTitle;
		}
		if ( ( url_members > -1 ) || ( url_forum > -1 ) || ( url_info > -1 ) ) {
			if ( url_closeToYou > -1 ) {
				var MembersTitle = TemplateName + ' ' + SubNavTitle;
			} else {
				var MembersTitle = SubNavTitle + ' ' + TemplateName;
			}
			document.title = TitlePrefix + MembersTitle + TitleSuffix;
		}
		if ( ( url_pics > -1 ) || ( url_chat > -1 ) ) {
			var PicsTitle = TitlePrefix + SubNavTitle + TitleSuffix;
			document.title = PicsTitle;
		}
		// NOTE Clubs
		if ( url_clubs > -1 ) {
			if ( url_Club > -1 ) {
				var ClubsTitle = TitlePrefix + ClubName + TitleSuffix;
				document.title = ClubsTitle;
			}
			// NOTE Club Sections
			if ( ( url_Cmembers > -1 ) || ( url_Cscribbles > -1 ) || ( url_Cpolls > -1 ) ) {
				var ClubSectionTitle = TitlePrefix + ClubName + ' ' +  ClubSection + TitleSuffix;
				document.title = ClubSectionTitle;
			}
			// NOTE Club discussions
			if ( url_Cdiscussions > -1 ) {
				var ClubDiscussTitle = TitlePrefix + ClubName + ' ' +  ClubSection + ' ' + ClubThread + TitleSuffix;
				document.title = ClubDiscussTitle;
			}
		}
		// NOTE The profile
		if ( url_profile > -1 ) {
			var ProfileTitle = TitlePrefix + NickName + TitleSuffix;
			document.title = ProfileTitle;
		}
		// NOTE Your Position
		if ( url_map > -1 ) {
			var PositionTitle = TitlePrefix + MapTitle + TitleSuffix;
			document.title = PositionTitle;
		}
		// NOTE Your clubs
		if ( url_showclubs > -1 ) {
			var ShowClubsTitle = TitlePrefix + ShowClubsSection + TitleSuffix;
			document.title = ShowClubsTitle;
		}
		// NOTE Profile Sections
		if ( ( url_favorites > -1 ) || ( url_showFavs > -1 ) || ( url_youasFav > -1 ) ||
			( url_ignored > -1 ) || ( url_visitors > -1 ) || ( url_visited > -1 ) ||
			( url_buffs > -1 ) || ( url_showMovies > -1 ) || ( url_moviesDigged > -1 ) ||
			( url_showPolls > -1 ) || ( url_verified > -1 ) || ( url_verifiedBy > -1 )
			) {
			var YourSectionsTitle = TitlePrefix + SubNavTitle + TitleSuffix;
			document.title = YourSectionsTitle;
		}
		// NOTE Updated content at your favorites
		if ( ( url_favUpdated > -1 ) || ( url_blogOverview > -1 ) || ( url_blogCreate > -1 ) ||
			( url_showDiary > -1 ) || ( url_giftCards > -1 )
			) {
			var UpdatedTitle = TitlePrefix + UpdatedSection + TitleSuffix;
			document.title = UpdatedTitle;
		}
		// NOTE Ask Sentry
		if ( url_askSentry > -1 ) {
			document.title = TitlePrefix + SentryTitle + TitleSuffix;
		}
	};
	setWindowTitles();
}
