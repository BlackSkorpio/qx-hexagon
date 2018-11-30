$(document.body).prepend('<button id="designMode" class="qxh-button">Toggle designMode</button>');
//function hq_designMode() {
document.getElementById('designMode').onclick = function () {
	if (document.documentElement.contentEditable === false || document.designMode === "off") {
		document.body.contentEditable='true';
		document.designMode='on';
		void 0;
	} else if (document.documentElement.contentEditable === true || document.designMode === "on") {
		document.body.contentEditable='false';
		document.designMode='off';
		void 0;
	}
};
