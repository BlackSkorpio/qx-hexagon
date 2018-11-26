// Get links text and set it as title for the link
$('.small > a[onclick^="openEdit"]').attr('title', function() {
	return $(this).text()
});
// Set the correct title for the logo link
$('#whole > #header > #home > a[href="/"]').attr('title', 'Qruiser - The Nordic Gay Lesbian & Queer Online Community');
