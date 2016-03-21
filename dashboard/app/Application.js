Ext.define('PollrDashboard.Application', {
	extend: 'Ext.app.Application',

	name: 'PollrDashboard',

	requires: [
		'PollrDashboard.view.*',
		'Pollr.model.*'
	],

	onAppUpdate: function() {
		window.location.reload();
	}
});
