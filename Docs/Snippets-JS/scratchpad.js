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
				var qSelectLang = $('form p:first-of-type > a');
				var qFieldSetOne = $('select[name="sex"], input[name="lowerage"], input[name="lowerage"] + span.q-formtext, input[name="upperage"], input[name="upperage"] + span.q-formtext');
				var qFieldSetTwo = $('input[name="faceimage"][type="hidden"], input#faceimage, label[for="faceimage"], input[name="verified"][type="hidden"], input#verified, label[for="verified"], input[name="active"][type="hidden"], input#active, label[for="active"]');
				var qFieldSetThree = $('input#savesettings, label[for="savesettings"], label + a[href="/goldmember.php?gore=9"]');
				var qSelectLangWrapper = '<fieldset class="q-field-set q-set--language" />';
				var qWrapperLineOne = '<fieldset class="q-field-set q-set--sex" />';
				var qWrapperLineTwo = '<fieldset class="q-field-set q-set--specify" />';
				var qWrapperLineThree = '<fieldset class="q-field-set q-set--savesettings" />';
				var WrapFields = $.Deferred();

				qSelectLang.wrapAll( qSelectLangWrapper ),
				qFieldSetOne.wrapAll( qWrapperLineOne ),
				qFieldSetTwo.wrapAll( qWrapperLineTwo ),
				qFieldSetThree.wrapAll( qWrapperLineThree );
				console.log('Stitching fields and text together is done, so lets get the broom');

				return WrapFields;
			};
			var CleanUp = function() {
				var qFieldSet = $('fieldset');
				var qSpec = $('fieldset.q-set--specify');
				var qSave = $('fieldset.q-set--savesettings');
				var TheBroom = $.Deferred;

				if ( qFieldSet.parent().is('div') ) {
					qFieldSet.unwrap();
				};
				if ( qSpec.parent().is('div') ) {
					qSpec.unwrap();
				};
				if ( qSave.parent().is('div') ) {
					qSave.unwrap();
				};
				$('form.clearfix[name="listform"]').contents().filter(function() {
					return this.nodeType == 3;
				}).remove();
				$('form.clearfix[name="listform"] .floatleft,form.clearfix[name="listform"] .input-spacing').remove();
				console.log('Form cleaned up and ready to use');

				return TheBroom;
			};

			// Credits for the function set up: http://willmclean.net/calling-one-jquery-function-only-after-another-function-has-run/
			WrapInlineText().done( WrapFormFields() ),
			WrapFormFields().done( CleanUp() );
		};
