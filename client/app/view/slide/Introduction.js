Ext.define('Pollr.view.slide.Introduction', {
	extend: 'Ext.Container',
	xtype: 'slide-introduction',
	cls: 'slide-introduction',

	items: [{
		xtype: 'component',
		cls: 'slide-title',
		html: 'Welcome to Pollr'
	}, {
		xtype: 'component',
		cls: 'slide-description',
		html: 'Check back when the presentation has started'
	}]
});
