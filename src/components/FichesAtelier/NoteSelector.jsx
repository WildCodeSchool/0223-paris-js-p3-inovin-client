import React, { useState } from "react";
import "./NoteSelector.scss";

function NoteSelector({ setNote, note }) {
  const handleNoteChange = (event) => {
    const selectedNote = parseInt(event.target.value);
    setNote(selectedNote);
  };

  return (
    <div className="noteselection">
      <div className="notesubselection">
        <span>{`Note ${note}/10`}</span>
      </div>
      <input
        type="range"
        id="noteRange"
        min="0"
        max="10"
        value={note}
        onChange={handleNoteChange}
      />
    </div>
  );
}

export default NoteSelector;
