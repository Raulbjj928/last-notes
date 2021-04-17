import Actions from "./components/Actions";
import Header from "./components/Header";
import Logo from "./components/Logo";
//import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import NotesArea from "./components/NotesArea";

import HighlightProvider from "./context/HighlightContext";
import NoteListProvider from "./context/NoteListContext";
import NoteFormProvider from "./context/NoteFormContext";

function App() {
  return (
    <NoteFormProvider>
      <NoteListProvider>
        <HighlightProvider>
          <Header>
            <Logo/>
            <Actions/>
          </Header>
          <NotesArea>
            <Notes />
          </NotesArea>
        </HighlightProvider>
      </NoteListProvider>
    </NoteFormProvider>
  );
}

export default App;
