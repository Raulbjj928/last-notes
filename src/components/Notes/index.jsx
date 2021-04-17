// eslint-disable-next-line
import React, { useEffect } from "react";
import { useHighlight } from "../../context/HighlightContext";
import { useNoteForm } from "../../context/NoteFormContext";
import { useNoteList } from "../../context/NoteListContext";
import Note from "../Note";

import "./styles.css";

export default function Notes() {
    

    const { highlight, setHighlight } = useHighlight();
    const { setTitle, setDescription } = useNoteForm();
    const { noteList, setNoteList } = useNoteList();
    
    useEffect(() => {
        getLocalNotes();
    }, [])

    useEffect(() => {
        if(highlight){
            const highlightedNote = noteList.find((note) => note.id === highlight);

            setTitle(highlightedNote.title)
            setDescription(highlightedNote.description) 
        }else{
            setTitle("");
            setDescription("");
        }
    }, [highlight]);

    function getLocalNotes() {
        let localNotes = localStorage.getItem("notes");
        if(localNotes === null) {
            localStorage.setItem("notes", JSON.stringify([]));
        } else {
            localNotes = JSON.parse(localNotes); 
            setNoteList(localNotes);
        }
    }

    return(
       <section className="notes">
            {noteList.map((note) => (                
                <Note
                    key={note.id}
                    id={note.id}
                    title={note.title}  
                    description={note.description}
                    highlight= {highlight}
                    setHighlight={setHighlight} 
                />                
            ))}
       </section>
    );
} 
// eslint-disable-next-line