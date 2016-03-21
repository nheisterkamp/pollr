/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var current = null;

module.exports = {
  current: function(req, res, next) {
    if (req.method === 'POST') {
      current = (req.body && req.body.id) ? req.body.id : null;
      if (current && current.id) { current = current.id; }
      sails.sockets.blast('question:current', current);
      return res.json({ success: true });
    } else {
      return res.json({
        id: current && current.id ? current.id : current
      });
    }
  }
};

