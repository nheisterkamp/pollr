/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    answers: {
      collection: 'answer',
      via: 'question'
    },
    votes: {
      collection: 'vote',
      via: 'question'
    },
    order: {
      type: 'integer'
    },
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    type: {
      type: 'string'
    }
  }
};

