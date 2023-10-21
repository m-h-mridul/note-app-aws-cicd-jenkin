import { Link, useLoaderData } from "react-router-dom";
import "./App.css";
import NoteCard from "./components/NoteCard";
import { useState } from "react";

function App() {
  const loadedNotes = useLoaderData();
  const [notes, setNotes] = useState(loadedNotes);

  return (
    <>
      <Link to="add">
        <h3 className="text-xl  mt-6 mb-10 "> -- WRITE YOUR NOTES HERE --</h3>
      </Link>

      <h1 className="text-4xl ">Total Notes : {notes.length}</h1>

      <div>
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            notes={notes}
            setNotes={setNotes}
          ></NoteCard>
        ))}
      </div>
    </>
  );
}

export default App;
