const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router();

//ROUTE:1 Get Logged-In User All Notes: GET "api/auth/fetchAllNotes". Login required.
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.send(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
})

//ROUTE:2 ADD Note corresponding to the Logged-In User Database: POST "api/auth/addNote". Login required.
router.post('/addNote', fetchUser, [
    //Validators declaration at the server side for [title | email | password]
    body('title', 'Title must be atleast 3 characters.').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    const { title, description, tag } = req.body;

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.send(saveNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
})

//ROUTE:3 Update an existing note using: PUT "api/auth/updateNote/:id". Login required. 
router.put('/updateNote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated 
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send({ error: "Not found" }) };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ error: "Unauthorized Access" });
        }
        //Update the note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.send(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
})

//ROUTE:4 Delete an existing note using: DELETE "api/auth/deleteNote/:id". Login required. 
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
    
    //find the note to be deleted 
    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(404).send({ error: "Not found" }) };

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send({ error: "Unauthorized Access" });
    }

    //Delete the note
    note = await Note.findByIdAndDelete(req.params.id)
    res.send({success:"Note has been deleted!"});
})

module.exports = router;