Ext.define('Pollr.view.slide.Slide', {
	extend: 'Ext.Container',
	xtype: 'slide',
	cls: 'slide',

	controller: 'slide',
	viewModel: {
		type: 'slide'
	},

	config: {
		question: null
	},

	scrollable: {
		y: true,
		indicators: false
	},

	padding: 10,

	bind: {
		cls: 'slide {extraCls}'
	},

	items: [{
		xtype: 'component',
		cls: 'slide-title',
		bind: {
			html: '{current.title}'
		}
	}, {
		xtype: 'component',
		cls: 'slide-description',
		bind: {
			html: '{current.description}'
		}
	}, {
		xtype: 'fieldset',
		title: 'Answers',
		reference: 'answers',
		hidden: true,
		flex: 1,
		items: [{
			xtype: 'slide-answers',
			bind: {
				store: '{answers}'
			}
		}],
		bind: {
			hidden: '{!answers}'
		}
	}],

	updateQuestion: function(question) {
		return this.lookupViewModel().set('question', question);
	}
});
