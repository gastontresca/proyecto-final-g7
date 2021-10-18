const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Scherma({
title:String,
text: String,
author: Schema.Types.ObjectId,
createdAT: {

  type: Date,
  default: Date.now
}
});


const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
