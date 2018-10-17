// NOTE https://stackoverflow.com/questions/21971629/jquery-add-index-numbering-to-a-class
/*$( "form[name='listform'] .q-formtext" ).attr( "class", function(i) {
	return '-'+i;
});*/
//$( "form[name='listform'] .q-formtext" ).addClass( function(i) { return "index-"+i } );

/*$( "form[name='listform'] > span, form[name='listform'] .q-formtext" ).each(function(index){
	$(this).addClass('index-'+ index);
});*/
var qx_prefix = 'q-';
var qx_classRange = qx_prefix+'range';
var qx_range = $( "form[name='listform'] span." + qx_classRange );
qx_range.each(function(i) {
    $(this).removeClass(qx_classRange).addClass(qx_classRange + "-" + i);
});