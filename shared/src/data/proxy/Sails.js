Ext.define('Pollr.data.proxy.Sails', {
	extend: 'Ext.data.proxy.Rest',
	alias: 'proxy.sails',

	batchActions: false,
	noCache: false,
	writer: {
		clientIdProperty: 'clientId'
	}
});
