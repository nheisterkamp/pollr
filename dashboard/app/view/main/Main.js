Ext.define('PollrDashboard.view.main.Main', {
	extend: 'PollrDashboard.view.question.List',
	xtype: 'main',

	requires: [
		'Ext.plugin.Viewport',
		'Ext.window.MessageBox',

		'PollrDashboard.view.main.MainController',
		'PollrDashboard.view.main.MainModel',
		'PollrDashboard.view.question.*'
	],

	controller: 'main',
	viewModel: {
		type: 'main'
	},

	session: true,

	title: 'Pollr',
	autoLoad: true,
	tools: [{
		xtype: 'button',
		text: 'Reset votes',
		iconCls: 'x-fa fa-trash',
		handler: 'resetVotesHandler'
	}, {
		xtype: 'button',
		text: 'Start presentation',
		iconCls: 'x-fa fa-desktop',
		handler: 'startPresentationHandler'
	}, {
		xtype: 'button',
		text: 'Add slide',
		iconCls: 'x-fa fa-plus',
		handler: 'addQuestionHandler'
	}],
	bind: {
		store: '{questions}'
	}
});
