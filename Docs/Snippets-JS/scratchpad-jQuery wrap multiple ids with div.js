/* jQuery wrap multiple ids with div
   https://stackoverflow.com/a/29360164/6820262 */
$('#column_left > #changemood, #column_left > #changemood + span, #column_left > script + div[style="margin-bottom: 8px;"], #column_left #coordform').wrapAll('<div id="mood_status" class="widget wrapper" />');
$('#column_left > p:nth-of-type(n+5):nth-of-type(-n+12)').wrapAll('<div id="profile_links" class="widget wrapper" />');

/* https://www.dyclassroom.com/jquery/jquery-wrap-elements-and-remove-elements */
$('#column_right > .smalldivider ~ .insertmember').wrapAll($('<div />', {
	'id': 'online',
	'class': 'widget wrapper'
}));

/* https://gist.github.com/BigglesZX/747490 */
<script type='text/javascript'>
	$(".form-container .form-label").each(function(index) {
		$(this).next(".form-field").andSelf().wrapAll("<div class='form-element-wrapper' />")
	});
</script>
