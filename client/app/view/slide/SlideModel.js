Ext.define('Pollr.view.slide.SlideModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.slide',

	data: {
		question: undefined,
		introduction: {
			cls: 'introduction',
			title: 'Welcome to Pollr',
			description: 'Check back when the presentation has started'
		},
		attention: {
			cls: 'attention dark',
			title: 'Pollr',
			description: 'Please look up from your screen'
		}
	},

	formulas: {
		extraCls: function(get) {
			return get('current.cls') || '';
		},
		current: function(get) {
			var answers = get('answers');
			if (answers) {
				return get('question');
			} else if (get('question')) {
				return get('attention');
			}
			return get('introduction');
		},
		answers: function(get) {
			var question = get('question'), answers;
			if (question) {
				answers = question.answers();
			}
			return answers && answers.getCount() ? answers : null;
		}
	}
});
