Ext.define('PollrDashboard.view.answer.List', {
	extend: 'Ext.grid.Panel',
	xtype: 'answer-list',

	plugins: [{
		ptype: 'cellediting',
		clicksToEdit: 1
	}],

	viewConfig: {
		plugins: {
			ptype: 'gridviewdragdrop',
			dragText: 'Drag and drop to reorganize'
		}
	},

	tools: [{
		type: 'plus',
		callback: 'addAnswerCallback'
	}],

	sortableColumns: false,

	columns: [{
		xtype: 'rownumberer'
	}, {
		dataIndex: 'title',
		flex: 1,
		text: 'Title',
		editor: 'textfield'
	}]
});
