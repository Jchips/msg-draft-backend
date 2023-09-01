'use strict';
const MessageDraft = require('../models/messageDraft');

const msgDraftHandler = {};

// req.user comes from the verifyUser
msgDraftHandler.getDrafts = async function(req, res, next) {
  try {
    let queryObject = {email: req.user.email}
    const drafts = await MessageDraft.find(queryObject);
    res.status(200).json(drafts);
  } catch (err) {
    next(err);
  }
}

msgDraftHandler.addDraft = async function(req, res, next) {
  let newDraftData = req.body;
  try {
    let newDraft = await MessageDraft.create({...newDraftData, email: req.user.email});
    res.status(201).json(newDraft);
  } catch (err) {
    next(err);
  }
}

msgDraftHandler.editDraft = async function(req, res, next) {
  const { id } = req.params;
  let editedDraftData = req.body;
  try {
    let editedDraft = await MessageDraft.findByIdAndUpdate(id, {...editedDraftData, email: req.user.email}, {new: true, overwrite: true});
    res.status(200).json(editedDraft);
  } catch (err) {
    next(err);
  }
}

msgDraftHandler.deleteDraft = async function(req, res, next) {
  const { id } = req.params;
  try {
    await MessageDraft.findByIdAndDelete(id);
    res.status(200).send('deleted post');
  } catch (err) {
    next(err);
  }

}

module.exports = msgDraftHandler;