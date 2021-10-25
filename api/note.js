const express= require('express');
const router = express.Router();
const Note= require('../models/Note');

router
  .route('/api/notes')
  .get((req,res) => {
    Note.find((err, notes) => {
      res.json(notes)
    })
  })

  .post((req, res) => {
  const note = new Note({
    title: req.body.title,
    text: req.body.text
  });
  note.save((err, note) => {
    res.json(note);
  })
});

router
  .route('/api/notes/:id')
  .get((req, res)=> {
    Note.find({ id: req.params.id},(err, notes) => {
      res.json(notes);
    })
  })
  .delete((req, res) => {
    note.findByIdAndRemove(req.params.id, (err) => {
    res.json({ msg: 'nota borrada'});
  });





  });

module.exports = router;
