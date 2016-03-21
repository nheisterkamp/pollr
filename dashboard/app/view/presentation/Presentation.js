Ext.define('PollrDashboard.view.presentation.Presentation', {
	extend: 'PollrDashboard.view.slide.Slide',
	xtype: 'presentation',

	controller: 'presentation',
	viewModel: {
		type: 'presentation'
	},

	config: {
		questions: null
	},

	buttons: [{
		text: 'Previous',
		handler: 'presentationPreviousHandler',
		bind: {
			disabled: '{!previousSlideAvailable}'
		}
	}, '->', {
		xtype: 'component',
		bind: {
			html: '{slideNumber} / {totalSlides}'
		}
	}, '->', {
		text: 'Next',
		handler: 'presentationNextHandler',
		bind: {
			disabled: '{!nextSlideAvailable}'
		}
	}],

	destroy: function() {
		Pollr.model.Question.setCurrent(null);
		return this.callParent(arguments);
	},

	initialize: function() {
		if (!this.getQuestion()) {
			this.goToSlide(0);
		}
	},

	goToSlide: function(idx) {
		this.setQuestion(this.getQuestions().getAt(idx));
	},

	previousSlide: function() {
		this.goToSlide(this.getQuestions().indexOf(this.getQuestion()) - 1);
	},

	nextSlide: function() {
		this.goToSlide(this.getQuestions().indexOf(this.getQuestion()) + 1);
	},

	applyQuestion: function(question, oldQuestion) {
		if (!question && oldQuestion) {
			question = oldQuestion;
		}
		return question;
	},

	updateQuestion: function(question, oldQuestion) {
		this.lookupViewModel().set('question', question);
		question.setCurrent();
	}
});
