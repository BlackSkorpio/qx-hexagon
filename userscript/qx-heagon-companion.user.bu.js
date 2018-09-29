// ==UserScript==
// @name         QX Hexagon companion
// @version      0.1
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

/*** Variables ***/
var hex_path       = window.location.pathname;
var hex_href       = window.location.href;
var hex_loc        = hex_path.match(/^\/?(\w+)\b/);
var hex_updated    = hex_href.indexOf('updated=1');
var hex_XXX        = hex_href.indexOf('xxx=1');
var hex_buffs_sent = hex_href.indexOf('/buffs.php?type=sent');
var hex_outbox     = hex_href.indexOf('/messages.php?mailbox=out');
var hex_sendMsg    = hex_href.indexOf("/messagebox.php");
var hex_satellite  = hex_href.indexOf("/satellite.php");
/* CSS classes */
var hex_prefix     = 'hex';
/* Selectors */
var Hexagon        = $('html, body');
var hex_body       = $(document.body);
var hex_even_empty = $("#column_center .even:empty");
var allColumns     = $('[id^="column_"]');
var inlineCleaning = $('#search form, #largeediticon, a[style*="text-decoration"], i.icon, .emptymembericon, .noticetext');
var removeEmpty    = $('li div[style="width: 10px; height: 9px"]:empty,div[style="width: 10px; height: 10px"]:empty');
/* Elements */
var hex_text       = '<span class="text" />';
var hex_grid       = '<div class="hex-grid" />';
var hex_column     = '<div class="hex-column" />';

/*** Add body class ***/
/* To make sure we are running Hexagon */
Hexagon.addClass('hexagon');
/* The main body class */
if(hex_loc) hex_body.addClass(hex_prefix + '-' + hex_loc[1].toLowerCase());
/* XXX body class */
if(hex_XXX        > -1) hex_body.addClass(hex_prefix   + '-xxx');
/*** Add body ID ***/
if(hex_updated    > -1) hex_body.attr('id', hex_prefix + '_updated');
if(hex_outbox     > -1) hex_body.attr('id', hex_prefix + '_msg_out');
if(hex_buffs_sent > -1) hex_body.attr('id', hex_prefix + '_buffs_out');

// Wrap all text nodes inside a span.text
allColumns.contents().filter(function() {
	return this.nodeType == 3 && $.trim(this.nodeValue).length;
}).wrap(hex_text);

/*** Clean up center column ***/
hex_even_empty.remove();
/* Clean up inline styles */
inlineCleaning.removeAttr("style").addClass(hex_prefix);
/* Delete empty nodes */
removeEmpty.remove();

/*** Resize popups ***/
if(hex_sendMsg    > -1) window.resizeTo('450', '800');
if(hex_satellite  > -1) window.resizeTo('320', '500');
