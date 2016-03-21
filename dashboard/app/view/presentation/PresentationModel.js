Ext.define('PollrDashboard.view.presentation.PresentationModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.presentation',

	data: {
		question: undefined,
		questions: undefined,
		introduction: {
			title: 'Welcome to Pollr',
			description: 'Check back when the presentation has started'
		}
	},

	formulas: {
		current: function(get) {
			return get('question') || get('introduction');
		},
		answers: function(get) {
			return get('question.answers');
		},
		slideIdx: function(get) {
			return get('questions').indexOf(get('question'));
		},
		slideNumber: function(get) {
			return get('slideIdx')  + 1;
		},
		totalSlides: function(get) {
			var questions = get('questions');
			return questions && questions.isStore ? questions.getCount() : 0;
		},
		previousSlideAvailable: function(get) {
			return get('slideIdx') > 0 ? true : false;
		},
		nextSlideAvailable: function(get) {
			return get('slideIdx') < get('totalSlides') - 1 ? true : false;
		},
		showLeftPane: function(get) {
			var answers = get('answers');
			return (answers && answers.getCount()) || get('current.description');
		}
	},

	stores: {
		questionVotes: {
			type: 'chained',
			source: '{votes}',
			pageSize: 0
		}
	}
});
