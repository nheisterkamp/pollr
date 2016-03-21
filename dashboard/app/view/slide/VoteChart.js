Ext.define('PollrDashboard.view.slide.VoteChart', {
	extend: 'Ext.chart.PolarChart',
	xtype: 'slide-votechart',

	requires: [
		'Ext.draw.engine.Svg',
		'Ext.chart.series.Pie',
		'Ext.chart.interactions.ItemHighlight',
		'Ext.chart.theme.DefaultGradients'
	],

	config: {
		question: null
	},

	store: {
		fields: [{
			name: 'title'
		}, {
			name: 'votes'
		}]
	},

	animate: true,
	shadow: true,

	legend: {
		position: 'right'
	},

	insetPadding: 25,
	innerPadding: 25,

	theme: 'default-gradients',

	series: [{
		type: 'pie',
		angleField: 'votes',
		showInLegend: true,
		label: {
			field: 'title',
			display: 'outside',
			font: '18px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif'
		},
		animate: true
	}],

	initComponent: function() {
		this.callParent(arguments);
		this.lookupViewModel().get('votes').on({
			endupdate: 'refreshChart',
			scope: this
		});
		this.refreshChart();
	},

	updateQuestion: function() {
		this.refreshChart();
	},

	refreshChart: function() {
		console.debug('[view/slide/VoteChart] refreshChart {%O} (%O)', this, arguments);
		var question = this.getQuestion(),
			votes = this.lookupViewModel().get('votes');

			console.log('question = %O, votes = %O', question, votes);

		if (!votes || !question) {
			return;
		}

		var answers = question.answers(),
			store = this.getStore(),
			data = [];

		answers.each(function(answer) {
			var voteCount = 0;
			votes.each(function(vote) {
				var voteAnswer = vote.get('answer') || vote.getAnswer();
				if (voteAnswer && voteAnswer.id) {
					voteAnswer = voteAnswer.id;
				}
				if (voteAnswer === answer.id) {
					voteCount++;
				}
			});

			data.push({
				title: answer.get('title') + ' (' + voteCount + ')',
				votes: voteCount
			});
		});

		console.log('data = %O', data);

		store.loadData(data);

		this.redraw();
	}
});
