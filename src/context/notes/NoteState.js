import NoteContext from "./noteContext";
import {useState} from "react";

const NoteState = (props) => {
    const initialNotes = [
        {
          "_id": "6200eb0190ce18140d4079f7",
          "user": "6200ab1ad5bfa53b26dbff0e",
          "title": "Note 1",
          "description": "My title description",
          "tag": "unknown",
          "date": "2022-02-07T09:48:49.326Z",
          "__v": 0
        },
        {
          "_id": "6200eb0990ce18140d4079f9",
          "user": "6200ab1ad5bfa53b26dbff0e",
          "title": "Note 2",
          "description": "My title 2 description",
          "tag": "unknown",
          "date": "2022-02-07T09:48:57.890Z",
          "__v": 0
        },
        {
          "_id": "6200eb1090ce18140d4079fb",
          "user": "6200ab1ad5bfa53b26dbff0e",
          "title": "Note 3",
          "description": "My title 3 description",
          "tag": "unknown",
          "date": "2022-02-07T09:49:04.786Z",
          "__v": 0
        },
        {
            "_id": "6200eb0190ce18140d4079f7",
            "user": "6200ab1ad5bfa53b26dbff0e",
            "title": "Note 1",
            "description": "My title description",
            "tag": "unknown",
            "date": "2022-02-07T09:48:49.326Z",
            "__v": 0
          },
          {
            "_id": "6200eb0990ce18140d4079f9",
            "user": "6200ab1ad5bfa53b26dbff0e",
            "title": "Note 2",
            "description": "My title 2 description",
            "tag": "unknown",
            "date": "2022-02-07T09:48:57.890Z",
            "__v": 0
          },
          {
            "_id": "6200eb1090ce18140d4079fb",
            "user": "6200ab1ad5bfa53b26dbff0e",
            "title": "Note 3",
            "description": "My title 3 description",
            "tag": "unknown",
            "date": "2022-02-07T09:49:04.786Z",
            "__v": 0
          },{
            "_id": "6200eb0190ce18140d4079f7",
            "user": "6200ab1ad5bfa53b26dbff0e",
            "title": "Note 1",
            "description": "My title description",
            "tag": "unknown",
            "date": "2022-02-07T09:48:49.326Z",
            "__v": 0
          },
          {
            "_id": "6200eb0990ce18140d4079f9",
            "user": "6200ab1ad5bfa53b26dbff0e",
            "title": "Note 2",
            "description": "My title 2 description",
            "tag": "unknown",
            "date": "2022-02-07T09:48:57.890Z",
            "__v": 0
          },
          {
            "_id": "6200eb1090ce18140d4079fb",
            "user": "6200ab1ad5bfa53b26dbff0e",
            "title": "Note 3",
            "description": "My title 3 description",
            "tag": "unknown",
            "date": "2022-02-07T09:49:04.786Z",
            "__v": 0
          },{
            "_id": "6200eb0190ce18140d4079f7",
            "user": "6200ab1ad5bfa53b26dbff0e",
            "title": "Note 1",
            "description": "My title description",
            "tag": "unknown",
            "date": "2022-02-07T09:48:49.326Z",
            "__v": 0
          },
          {
            "_id": "6200eb0990ce18140d4079f9",
            "user": "6200ab1ad5bfa53b26dbff0e",
            "title": "Note 2",
            "description": "My title 2 description",
            "tag": "unknown",
            "date": "2022-02-07T09:48:57.890Z",
            "__v": 0
          },
          {
            "_id": "6200eb1090ce18140d4079fb",
            "user": "6200ab1ad5bfa53b26dbff0e",
            "title": "Note 3",
            "description": "My title 3 description",
            "tag": "unknown",
            "date": "2022-02-07T09:49:04.786Z",
            "__v": 0
          }

      ]

    const [notes, setNotes] = useState(initialNotes);

    return(
       <NoteContext.Provider value={{notes, setNotes}}>
           {props.children}
       </NoteContext.Provider>
    )
}

export default NoteState;