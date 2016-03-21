Ext.define('PollrDashboard.view.presentation.PresentationController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.presentation',

	keyMap: null,

	init: function() {
		this.keyMap = new Ext.util.KeyMap({
			target: document,
			key: [
				Ext.event.Event.LEFT,
				Ext.event.Event.RIGHT,
				Ext.event.Event.ENTER,
				Ext.event.Event.SPACE
			],
			fn: this.keyHandler,
			scope: this
		});
	},

	afterRender: function() {
		return this.getView().el.on('click', this.presentationNextHandler, this);
	},

	keyHandler: function(key) {
		switch (key) {
			case Ext.event.Event.LEFT:
				return this.presentationPreviousHandler();

			case Ext.event.Event.RIGHT:
			case Ext.event.Event.ENTER:
			case Ext.event.Event.SPACE:
				return this.presentationNextHandler();
		}
	},

	destroy: function() {
		this.keyMap.destroy();
		this.getView().el.un('click', this.presentationNextHandler, this);
		return this.callParent(arguments);
	},

	presentationPreviousHandler: function(btn) {
		return this.getView().previousSlide();
	},

	presentationNextHandler: function(btn) {
		return this.getView().nextSlide();
	}
});
