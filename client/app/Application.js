Ext.define('Pollr.Application', {
	extend: 'Ext.app.Application',

	name: 'Pollr',

	requires: [
		'Pollr.model.*',
		'Pollr.view.*'
	],

	onAppUpdate: function() {
		window.location.reload();
	}
});
