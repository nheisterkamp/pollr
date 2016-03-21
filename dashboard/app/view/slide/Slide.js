Ext.define('PollrDashboard.view.slide.Slide', {
	extend: 'Ext.Panel',
	xtype: 'slide',
	cls: 'slide',

	config: {
		slide: null,
		question: null
	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [{
		cls: 'slide-title',
		minHeight: 72,
		bind: {
			html: '{current.title}'
		}
	}, {
		flex: 1,
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		items: [{
			flex: 1,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				cls: 'slide-description',
				minHeight: 64,
				bind: {
					html: '{current.description}'
				}
			}, {
				xtype: 'slide-votechart',
				flex: 1,
				bind: {
					question: '{current}'
				}
			}],
			bind: {
				hidden: '{!showLeftPane}'
			}
		}, {
			flex: 1,
			layout: 'fit',
			items: [{
				xtype: 'component',
				align: 'center',
				bind: {
					html: [
						'<div class="slide-image" style="',
							'background-image: url({current.image});"></div>'
					].join('')
				}
			}],
			bind: {
				hidden: '{!current.image}'
			}
		}]
	}],

	updateQuestion: function(question) {
		return this.setSlide(question);
	},

	updateSlide: function(slide) {
		if (this.rendered) {
			this.removeAll();
			this.add(slide);
		} else {
			this.items = slide;
		}
	}
});
