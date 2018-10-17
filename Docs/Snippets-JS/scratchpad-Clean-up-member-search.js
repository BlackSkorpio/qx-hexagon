var qFormName = $('form.clearfix[name="listform"]');
if ( qFormName ) {
	var WrapInlineText = function() {
		var qInlineCleaning = $('[class="floatleft"]');
		var qCleanWrapper = '<span class="q-formtext" />';
		var WrapText = $.Deferred();

		qInlineCleaning.contents().filter(function() {
			return this.nodeType == 3 && $.trim(this.nodeValue).length;
		}).wrap( qCleanWrapper );
		console.log('We are done with text nodes, jump over to the fields');

		return WrapText;
	};
	var WrapFormFields = function() {
		var qSexField = $('select[name="sex"]');
		var qSexWrapper = '<fieldset class="q-field-set q-set--sex" />';
		var qLowerAge = $('input[name="lowerage"], input[name="lowerage"] + span.q-formtext');
		var qLowerAgeWrapper = '<fieldset class="q-field-set q-set--lowerage" />';
		var qUpperAge = $('input[name="upperage"], input[name="upperage"] + span.q-formtext');
		var qUpperAgeWrapper = '<fieldset class="q-field-set q-set--upperage" />';
		var qFaceImage = $('input[name="faceimage"][type="hidden"], input#faceimage, label[for="faceimage"]');
		var qFaceImageWrapper = '<fieldset class="q-field-set q-set--faceimage" />';
		var qVerifiedMem = $('input[name="verified"][type="hidden"], input#verified, label[for="verified"]');
		var qVerifiedMemWrapper = '<fieldset class="q-field-set q-set--verified" />';
		var qActiveMem = $('input[name="active"][type="hidden"], input#active, label[for="active"]');
		var qActiveMemWrapper = '<fieldset class="q-field-set q-set--active" />';
		var qSaveSettings = $('input#savesettings, label[for="savesettings"], label + a[href="/goldmember.php?gore=9"]');
		var qSaveSettingsWrapper = '<fieldset class="q-field-set q-set--savesettings" />';
		var WrapFields = $.Deferred();

		qSexField.wrapAll( qSexWrapper ),
		qLowerAge.wrapAll( qLowerAgeWrapper ),
		qUpperAge.wrapAll( qUpperAgeWrapper ),
		qFaceImage.wrapAll( qFaceImageWrapper ),
		qVerifiedMem.wrapAll( qVerifiedMemWrapper ),
		qActiveMem.wrapAll( qActiveMemWrapper ),
		qSaveSettings.wrapAll( qSaveSettingsWrapper );
		console.log('Stitching fields and text together is done, so lets get the broom');

		return WrapFields;
	};
	var CleanUp = function() {
		var qFieldSet = $('fieldset.q-field-set');
		var TheBroom = $.Deferred;

		if ( qFieldSet.parent().is('div') ) {
			qFieldSet.unwrap();
		};
		if ( $( '.q-set--faceimage, .q-set--verified, .q-set--active, .q-set--savesettings' ).parent().is('div') ) {
			$( '.q-set--faceimage, .q-set--verified, .q-set--active, .q-set--savesettings' ).unwrap();
		};
		console.log('Form cleaned up and ready to use');

		return TheBroom;
	};

	// Credits for the function set up: http://willmclean.net/calling-one-jquery-function-only-after-another-function-has-run/
	WrapInlineText().done( WrapFormFields() ),
	WrapFormFields().done( CleanUp() );
};
