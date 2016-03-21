Ext.define('Pollr.view.main.SlideController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.slide',

	config: {
		question: undefined
	},

	control: {
		'slide-answers': {
			select: 'onSlideAnswerSelect'
		}
	},

	votes: [],

	init: function() {
		var me = this,
			view = this.getView(),
			Question = Pollr.model.Question,
			question = (Question.loadCurrent()
				.then(this.setQuestion.bind(this),
					this.setQuestion.bind(this)));

		io.socket.on('question:current', function(id) {
			if (!id) {
				return me.setQuestion(null);
			}
			return Question.load(id, {
				success: me.setQuestion.bind(me),
				failure: me.setQuestion.bind(me)
			});
		});
	},

	updateQuestion: function(question) {
		return this.getViewModel().set('question', question);
	},

	onSlideAnswerSelect: function(list, answer) {
		return this.voteAnswer(answer);
	},

	voteAnswer: function(answer) {
		var question = answer.getQuestion();
		var vote = Ext.Array.findBy(this.votes, function(record) {
			var questionId = record.get('question');
			if (questionId && questionId.id) {
				questionId = questionId.id;
			}
			return questionId === question.id;
		});

		if (vote) {
			vote.set('answer', answer.id);
		} else {
			vote = Pollr.model.Vote.create({
				question: question.id,
				answer: answer.id
			});
			this.votes.push(vote);
		}

		if (!vote.dirty && !vote.phantom) {
			return;
		}

		vote.save();
	}
});
