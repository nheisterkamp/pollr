Ext.define('Pollr.override.data.Store', {
	override: 'Ext.data.Store',

	getRemovedRecords: function() {
		return this.callParent(arguments) || [];
	}
});
