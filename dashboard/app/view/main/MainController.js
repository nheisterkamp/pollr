Ext.define('PollrDashboard.view.main.MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.main',

	control: {
		'question-list': {
			itemdblclick: 'onQuestionListItemDblClick'
		},
		'question-list > *': {
			drop: 'onQuestionListViewDrop'
		},
		'answer-list > *': {
			drop: 'onAnswerListViewDrop'
		}
	},

	init: function() {
		Pollr.model.Question.setCurrent(null);

		var me = this,
			session = this.getSession(),
			reader = new Ext.data.reader.Json({
				model: Pollr.model.Vote
			});

		me.getStore('questions').on({
			load: function(store) {
				store.sort('order', 'ASC');
				store.getSorters().clear();
			}
		});

		io.socket.on('vote:update', function(res) {
			var votesStore = me.getStore('votes'),
				data = res.id ? res : res.data,
				voteId = data.id,
				vote = votesStore.getById(voteId);

			if (vote) {
				vote.set(data);
			} else {
				var votes = reader.read([data], {
					recordCreator: session.recordCreator
				});
				votesStore.add(votes.getRecords());
			}
		});
	},

	resetVotesHandler: function() {
		Pollr.model.Question.setCurrent(null);
		var votesStore = this.getStore('votes');
		Ext.Msg.confirm('Sure?', 'Clear votes?', function(response) {
			if (response === 'yes') {
				io.socket.post('/api/vote/clear', function(res) {
					votesStore.removeAll();
					Ext.toast('Votes cleared');
				}, function() {
					Ext.toast('Votes clearing failed');
				})
			}
		});
	},

	startPresentationHandler: function() {
		return this.openQuestionPresentWindow();
	},

	onQuestionListItemDblClick: function(list, question) {
		return this.openQuestionPresentWindow(question);
	},

	editQuestionHandler: function(list, rowIdx, colIdx, item, e, question) {
		return this.openQuestionFormWindow(question);
	},

	presentQuestionHandler: function(list, rowIdx, colIdx, item, e, question) {
		return this.openQuestionPresentWindow(question);
	},

	addQuestionHandler: function() {
		return this.openQuestionFormWindow();
	},

	openQuestionFormWindow: function(question) {
		var list = this.getView(),
			store = this.getStore('questions');

		question = question || this.getSession().createRecord('Question', {
			order: store.getCount()
		});

		Ext.create('Ext.Window', {
			title: question.phantom ? 'Add slide' : 'Edit slide',
			parent: list,
			width: '90%',
			height: '90%',
			modal: true,
			constrain: true,
			items: [{
				xtype: 'question-form',
				question: question
			}],
			buttons: [{
				text: 'Cancel',
				handler: 'questionCancelHandler'
			}, '->', {
				text: 'Delete',
				style: {
					background: 'red'
				},
				handler: 'questionDeleteHandler',
				hidden: question.phantom
			}, {
				text: 'Save',
				handler: 'questionSaveHandler'
			}]
		}).show();
	},

	questionCancelHandler: function(btn) {
		btn.up('window').close();
	},

	questionSaveHandler: function(btn) {
		var view = this.getView(),
			list = view.down('question-list') || view,
			store = this.getStore('questions'),
			win = btn.up('window'),
			form = win.down('question-form');

		win.disable();
		form.save().then(function(question) {
			win.close();
			if (store) {
				if (store.indexOf(question) === -1) {
					store.add(question);
				}
				list.setSelection(question);
			}
		}, function() {
			win.enable();
			Ext.Msg.alert('Error', 'Something went wrong while saving');
		});
	},

	questionDeleteHandler: function(btn) {
		var view = this.getView(),
			list = view.down('question-list') || view,
			store = this.getStore('questions'),
			win = btn.up('window'),
			form = win.down('question-form'),
			question = form.getQuestion();

		Ext.Msg.confirm('Delete question',
			'Are you sure you want to delete the question "' +
			question.get('title') + '"?',
			function(answer) {
				if (answer === 'yes') {
					question.drop(true);
					question.save({
						success: function() {
							if (store) {
								store.remove(question);
							}
							win.close();
						},
						failure: function() {
							Ext.Msg.alert('Something went wrong while deleting');
						}
					})
				}
			});
	},

	addAnswerCallback: function(list) {
		var answers = list.getStore();
		answers.add({
			order: answers.getCount()
		});
		// @todo start editing answer
	},

	reorderStore: function(store) {
		store.beginUpdate();
		store.each(function(record, order) {
			record.set('order', order);
		});
		store.endUpdate();
	},

	onQuestionListViewDrop: function(node, data, overModel, dropPosition) {
		var list = this.getView(),
			store = this.getStore('questions');

		this.reorderStore(store);
		list.view.refresh();
		store.sync();
	},

	onAnswerListViewDrop: function(node, data, overModel, dropPosition) {
		var view = data.view,
			list = view.grid,
			store = this.getStore('questions');

		this.reorderStore(store);
		view.refresh();
	},

	openQuestionPresentWindow: function(question) {
		var view = this.getView(),
			questions = this.getStore('questions');

		Ext.create('Ext.Window', {
			parent: view,
			cls: 'presentation-window',
			header: false,
			maximized: true,
			resizable: false,
			width: '100%',
			height: '100%',
			modal: true,
			layout: 'fit',
			items: [{
				xtype: 'presentation',
				questions: questions,
				question: question || questions.first()
			}]
		}).show();
	}
});
