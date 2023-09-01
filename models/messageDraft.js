'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageDraftSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled'
  },
  text: {
    type: String,
    required: true,
    default: ''
  },
  email: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

const messageDraftModel = mongoose.model('MessageDraft', MessageDraftSchema);
module.exports = messageDraftModel;