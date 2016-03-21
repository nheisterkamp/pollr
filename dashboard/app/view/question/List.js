Ext.define('PollrDashboard.view.question.List', {
	extend: 'Ext.grid.Panel',
	xtype: 'question-list',

	viewConfig: {
		plugins: {
			ptype: 'gridviewdragdrop',
			dragText: 'Drag and drop to reorganize'
		}
	},

	sortableColumns: false,

	columns: [{
		xtype: 'rownumberer'
	}, {
		dataIndex: 'title',
		flex: 1,
		text: 'Title'
	}, {
		dataIndex: 'description',
		flex: 1,
		text: 'Description'
	}, {
		xtype: 'actioncolumn',
		width: 50,
		items: [{
			iconCls: 'x-fa fa-pencil',
			handler: 'editQuestionHandler'
		}, {
			iconCls: 'x-fa fa-share-square-o',
			handler: 'presentQuestionHandler'
		}]
	}]
});
