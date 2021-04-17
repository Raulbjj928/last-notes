import React, { useEffect } from 'react';
import {FaCheck,FaBan} from 'react-icons/fa';
import { useHighlight } from '../../context/HighlightContext';
import { useNoteForm } from '../../context/NoteFormContext';
import { useNoteList } from '../../context/NoteListContext';

import "./styles.css";

export default function NoteForm() { 
    const { noteList, setNoteList } = useNoteList();
    const { highlight, setHighlight} = useHighlight();

    const { 
        title, 
        setTitle, 
        description, 
        setDescription, 
        setVisibleForm 
    } = useNoteForm();

    useEffect(() => {
        savelocalNotes();
    }, [noteList]);

    function titleHandler(e) {
        setTitle(e.target.value);        
    }

    function descriptionHandler(e) {
        setDescription(e.target.value);        
    }

    function submitHandler(e) {
        e.preventDefault();
        if(highlight) { 
            noteList.map((note) => {
                if( note.id === highlight ) {
                    note.title = title;
                    note.description = description;
                }                
            } );

            setNoteList([...noteList]);
        }
        else {
            setNoteList([
                ...noteList,
                {
                    id: String(Math.floor(Math.random() * 1000)),
                    title,
                    description,
                },
            ]);
        }
    }
        
    function cancelHandler(e) {
        e.preventDefault();

        setHighlight(false);
        setVisibleForm(false);
    }

    function savelocalNotes() {
        localStorage.setItem("notes", JSON.stringify(noteList));
    }
    return(
        <form  className="note-menu">
            <div>
                <label htmlFor="" >Titulo</label>
                <input
                id="title" 
                value={title}
                onChange={titleHandler}
                type="text" 
                placeholder="Informe o titulo" />
            </div>
            <div>
                <label 
                htmlFor="note" >Nota</label>                                        
                <textarea  
                id="note" 
                value={description}
                onChange={descriptionHandler}
                type="text"  
                rows="10" 
                placeholder="Escreva sua nota"/>
            </div>
            <div className="buttons">
                <button className="cancel" onClick={ cancelHandler }>
                    <FaBan className="icon"/>
                    </button>
                <button 
                type="submit" 
                className="confirm"
                onClick={submitHandler}>
                    <FaCheck className="icon"/>
                </button>
            </div>
        </form>
    )
} 