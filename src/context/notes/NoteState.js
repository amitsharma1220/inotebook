import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes);
  const host = "http://localhost:5000"

  //Fetch all Note
  const fetchAllNotes = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: 'GET',
      headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6IjYyMDBhYjFhZDViZmE1M2IyNmRiZmYwZSJ9LCJpYXQiOjE2NDQyMTEyNDV9.GyO31ltrXR5R5VBMiXPv5PtNYSGFNkfCzN1wMiwZOhU'
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);

  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6IjYyMDBhYjFhZDViZmE1M2IyNmRiZmYwZSJ9LCJpYXQiOjE2NDQyMTEyNDV9.GyO31ltrXR5R5VBMiXPv5PtNYSGFNkfCzN1wMiwZOhU'
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }


  //Delete a Note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6IjYyMDBhYjFhZDViZmE1M2IyNmRiZmYwZSJ9LCJpYXQiOjE2NDQyMTEyNDV9.GyO31ltrXR5R5VBMiXPv5PtNYSGFNkfCzN1wMiwZOhU'
      }
    });
    const json = await response.json();
    console.log(json);

    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6IjYyMDBhYjFhZDViZmE1M2IyNmRiZmYwZSJ9LCJpYXQiOjE2NDQyMTEyNDV9.GyO31ltrXR5R5VBMiXPv5PtNYSGFNkfCzN1wMiwZOhU'
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
   
    console.log(newNotes);
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;