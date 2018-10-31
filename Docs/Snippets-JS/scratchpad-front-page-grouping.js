var hq_ClassPrefix		= 'qxh-';
var hq_ClassFrontImg	= hq_ClassPrefix+'front-image';
var hq_ClassFrontText	= hq_ClassPrefix+'front-text';
var hq_frontImgDiv		= '#column_center div[style*="width:80px;"]';
var hq_frontTextDiv		= '#column_center div[style*="width:105px;"]';
var hq_frontCssArray	= {"float" : "","margin-top" : "","margin-right" : "","margin-bottom" : "","overflow" : ""};

var hq_frontImg				= $( hq_frontImgDiv );
var hq_frontText			= $( hq_frontTextDiv );
var hq_divTargets			= $(hq_frontImgDiv + ',' + hq_frontTextDiv);
var hq_frontGroups		= hq_divTargets.length;
var hq_frontDivs			= '<div class="qxh-front-page-columns qxh-flex-container" />';
// https://stackoverflow.com/questions/13489450/wrap-every-2-divs-in-a-new-div
//for ( var i = 0;i < hq_frontGroups;i+=2 ){
//    hq_divTargets.filter( ':eq('+i+'),:eq('+(i+1)+')' ).wrapAll( hq_frontDivs );
//};

//hq_frontImg.css( hq_frontCssArray ).addClass( hq_ClassFrontImg );
//hq_frontText.removeAttr("style").addClass( hq_ClassFrontText );


function SetUpFrontPage() {
	var WrapBlogGroups = function() {
		var hq_frontImgDiv		= '#column_center div[style*="width:80px;"]';
		var hq_frontTextDiv		= '#column_center div[style*="width:105px;"]';
		var hq_divTargets		= $(hq_frontImgDiv + ',' + hq_frontTextDiv);
		var hq_frontGroups		= hq_divTargets.length;
		var hq_frontDivs		= '<div class="qxh-front-page-columns qxh-flex-container" />';
		var GroupWrapping = $.Deferred();

		for ( var i = 0;i < hq_frontGroups;i+=2 ){
			hq_divTargets.filter( ':eq('+i+'),:eq('+(i+1)+')' ).wrapAll( hq_frontDivs );
		};

		return GroupWrapping;
	};
	var CleanUpGroups = function() {
		var hq_ClassPrefix		= 'qxh-';
		var hq_ClassFrontImg	= hq_ClassPrefix+'front-image';
		var hq_ClassFrontText	= hq_ClassPrefix+'front-text';
		var hq_frontCssArray	= {"float" : "","margin-top" : "","margin-right" : "","margin-bottom" : "","overflow" : ""};
		var CleanUp = $.Deferred();

		hq_frontImg.css( hq_frontCssArray ).addClass( hq_ClassFrontImg );
		hq_frontText.removeAttr("style").addClass( hq_ClassFrontText );
		$('.qxh-front-page-columns').wrapAll('<div class="qxh-flex-container" />');

		return CleanUp;
	};
	GroupWrapping().done( CleanUp() );
};
SetUpFrontPage();
