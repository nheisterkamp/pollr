/**
 * VoteController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  clear: function(req, res, next) {
    return Vote.destroy({}).exec(function(err) {
      return res.json({ success: true });
    });
  },

  create: function(req, res, next) {
    var user = req.session.user || (
          req.session.user = Math.random().toString(36).substr(2)),
        body = req.body;
    delete body.clientId;

    return Vote.findOne({
      question: body.question,
      user: user
    }).exec(function(err, record) {
      if (!record) {
        body.user = user;
        return Vote.create(body).exec(function(err, record) {
          // Vote.publishCreate(record, req.isSocket ? req : undefined);
          sails.sockets.blast('vote:update', record);
          return res.json(record);
        });
      }

      return Vote.update({
        question: body.question,
        user: user
      }, {
        answer: body.answer
      }).exec(function(err, records) {
        var record = records[0];
        sails.sockets.blast('vote:update', records[0]);
        // Vote.publishUpdate(record.id, record, req.isSocket ? req : undefined);
        return res.json(record);
      });
    });
  },

  update: function(req, res, create) {
    return this.create.apply(this, arguments);
  }
};

