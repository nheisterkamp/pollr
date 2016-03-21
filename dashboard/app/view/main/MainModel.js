Ext.define('PollrDashboard.view.main.MainModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.main',

	data: {
		name: 'PollrDashboard'
	},

	stores: {
		questions: {
			model: 'Question',
			session: true,
			pageSize: 0,
			remoteSort: false
		},
		votes: {
			model: 'Vote',
			session: true,
			pageSize: 0
		}
	}
});
