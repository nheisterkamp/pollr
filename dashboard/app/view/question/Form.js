Ext.define('PollrDashboard.view.question.Form', {
	extend: 'Ext.form.Panel',
	xtype: 'question-form',

	requires: ['PollrDashboard.view.answer.List'],

	viewModel: {
		data: {
			question: null
		}
	},

	config: {
		question: null
	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	padding: 10,
	modelValidation: true,

	items: [{
		xtype: 'textfield',
		allowBlank: false,
		name: 'title',
		fieldLabel: 'Title',
		bind: '{question.title}'
	}, {
		xtype: 'textarea',
		name: 'description',
		fieldLabel: 'Description',
		bind: '{question.description}'
	}, {
		xtype: 'textfield',
		name: 'image',
		fieldLabel: 'Image',
		bind: '{question.image}'
	}, {
		xtype: 'answer-list',
		flex: 1,
		title: 'Answers',
		bind: {
			store: '{question.answers}'
		}
	}],

	updateQuestion: function(question) {
		return this.getViewModel().set('question', question);
	},

	save: function() {
		var me = this,
			question = me.getQuestion();
		return this.saveQuestion()
			.then(this.saveAnswers.bind(this))
			.then(function() {
				return question;
			});
	},

	saveQuestion: function() {
		var me = this,
			question = me.getQuestion();

		return new Promise(function(resolve, reject) {
			if (!me.isValid()) {
				return reject();
			}

			if (!question.dirty) {
				return resolve(question);
			}

			return question.save({
				success: resolve,
				failure: reject
			});
		});
	},

	saveAnswers: function() {
		var me = this;
		return new Promise(function(resolve, reject) {
			var question = me.getQuestion(),
				answers = question.answers();

			if (!answers.needsSync) {
				return resolve(answers);
			}

			return answers.sync({
				success: resolve,
				failure: reject
			});
		});
	}
});
