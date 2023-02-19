import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


    //Get all note
    const getNotes = async () => {
      //API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYTJmNTFiNGU4OWI4NjhjYmI2YzczIn0sImlhdCI6MTY3NjI5MjgzNn0.DOwWI-5hDlcFCsWH8o6PuxiAwT9fOiGv3MCKzvzjRp0"
        }
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
    }

  //Add a note 
  const addNote = async (title, description, tag) => {
    //TODO API CALL
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYTJmNTFiNGU4OWI4NjhjYmI2YzczIn0sImlhdCI6MTY3NjI5MjgzNn0.DOwWI-5hDlcFCsWH8o6PuxiAwT9fOiGv3MCKzvzjRp0"
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = response.json();

    console.log("Adding a new note")
    const note = {
      "_id": "63ea5cff4da82e557f8cfe562",
      "user": "63ea2f51b4e89b868cbb6c731",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-02-13T15:53:35.858Z",
      "__v": 0
    };
    setNotes(notes.concat(note))

  }

  


  //Delete a note
  const deleteNote = async (id) => {
    //TODO API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYTJmNTFiNGU4OWI4NjhjYmI2YzczIn0sImlhdCI6MTY3NjI5MjgzNn0.DOwWI-5hDlcFCsWH8o6PuxiAwT9fOiGv3MCKzvzjRp0"

      },
    });
    const json = response.json();
    console.log(json)
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((notes) => { return notes._id !== id })
    setNotes(newNotes)
  }


  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYTJmNTFiNGU4OWI4NjhjYmI2YzczIn0sImlhdCI6MTY3NjI5MjgzNn0.DOwWI-5hDlcFCsWH8o6PuxiAwT9fOiGv3MCKzvzjRp0"

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, getNotes, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;