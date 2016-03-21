Ext.define('Pollr.model.Question', {
	extend: 'Pollr.data.Model',

	fields: [{
		type: 'number',
		name: 'order'
	}, {
		type: 'string',
		name: 'title',
		allowBlank: false
	}, {
		type: 'string',
		name: 'description'
	}],

	setCurrent: function() {
		return this.self.setCurrent(this.id);
	},

	statics: {
		setCurrent: function(id) {
			return new Promise(function(resolve, reject) {
				return io.socket.post('/api/question/current', {
					id: id
				}, resolve, reject);
			});
		},

		loadCurrent: function() {
			var Model = this;
			return new Promise(function(resolve, reject) {
				return io.socket.get('/api/question/current', function(data) {
					data = data || {};
					if (!data.id) {
						return reject(null);
					}
					return Model.load(data.id, {
						success: resolve,
						failure: reject
					});
				}, reject);
			});
		}
	}
});
