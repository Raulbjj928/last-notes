import React from "react";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import  { useNoteForm }  from "../../context/NoteFormContext";
import { useHighlight } from "../../context/HighlightContext";
import { useNoteList } from "../../context/NoteListContext";

import "./styles.css";


export default function Actions() {
    const { 
        visibleForm, 
        setVisibleForm,  
        setTitle, 
        setDescription 
    } = useNoteForm();
    const { highlight, setHighlight } = useHighlight();
    const { noteList, setNoteList } = useNoteList();

    function createHandler() {
        if(visibleForm && highlight) {
            setTitle("");
            setDescription("");
            setHighlight(false);
        } else {
            setVisibleForm(!visibleForm);
        }
    }

    function editHandler() {
        if (highlight){
            const highlightedNote = noteList.find((note) => note.id === highlight);

            setTitle(highlightedNote.title);
            setDescription(highlightedNote.description);
            setVisibleForm(!visibleForm);
        }
    }
        
    function deleteHandler() { 
        if(highlight) { 
            setTitle("");
            setDescription("");
            setHighlight(false);

            const highlightedNote = noteList.findIndex((note) => note.id === highlight)
            noteList.splice(highlightedNote, 1);

            setNoteList([...noteList]);

        }
    }
    return(
       <div className="actions">
           <button className="create" onClick = { createHandler }>
                <FaPlus className="icon" />
           </button>
            <button className="edit" onClick={editHandler}>
                <FaPencilAlt className={`icon ${!highlight && "disabled"}`}/>
            </button>
            <button className="delete" onClick={deleteHandler}>
                <FaTrash className={`icon ${!highlight && "disabled"}`} />
            </button>

       </div>
    )
}