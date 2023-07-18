import React, { useState } from 'react';
import './NoteSelector.scss';

const NoteSelector = () => {
  const [note, setNote] = useState(5); 

  const handleNoteChange = (event) => {
    const selectedNote = parseInt(event.target.value);
    setNote(selectedNote);
  };

  return (
    <div>
      <span>{`Note ${note}/10`}</span>
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
};

export default NoteSelector;
