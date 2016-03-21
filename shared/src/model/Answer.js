Ext.define('Pollr.model.Answer', {
	extend: 'Pollr.data.Model',

	fields: [{
		name: 'question',
		reference: 'Question'
	}, {
		type: 'number',
		name: 'order'
	}]
});
