Ext.define('Pollr.data.Model', {
	extend: 'Ext.data.Model',

	requires: ['Pollr.data.proxy.Sails'],

	schema: {
		namespace: 'Pollr.model.',
		proxy: {
			type: 'sails',
			url: '/api/{entityName:lowercase}'
		}
	}
});
