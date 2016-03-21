Ext.define('Pollr.model.Vote', {
	extend: 'Pollr.data.Model',

	fields: [{
		name: 'question',
		reference: 'Question'
	}, {
		name: 'answer',
		reference: 'Answer'
	}]
});
