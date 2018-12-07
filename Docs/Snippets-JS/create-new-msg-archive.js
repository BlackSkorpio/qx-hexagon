// NOTE Move msg archive to the new msg widget
function MsgArchive() {
	var CreateMsgArchive = function() {
		var hq_ArchiveTitle = $('.container.container--mailbox > .container-header > a').text();
		var hq_NewArchive = $('<div class="qxh-msg-archive">' + hq_ArchiveTitle +'</div>');
		var hq_ChatList = '.container.container--chat-list > .container-inner';

		var NewMsgArchive = $.Deferred();

		hq_NewArchive.appendTo( hq_ChatList );

		return NewMsgArchive;
	};
	var GetArchiveLinks = function() {
		var hq_ArchiveLinks = $('.container.container--mailbox > .container-inner > div');
		var hq_NewArchiveLinks = '.container.container--chat-list > .container-inner > .qxh-msg-archive';

		var ArchiveLinks = $.Deferred();

		hq_ArchiveLinks.appendTo( hq_NewArchiveLinks );

		return ArchiveLinks;
	};
	var CleanUpArchive = function() {
		var hq_MailBoxArchive = $('.container.container--mailbox');

		var CleanUp = $.Deferred();

		hq_MailBoxArchive.remove();

		return CleanUp;
	};
	CreateMsgArchive().done( GetArchiveLinks() ),
	GetArchiveLinks().done( CleanUpArchive() );
};
MsgArchive();
