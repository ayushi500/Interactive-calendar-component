import { useState, useEffect } from "react";

export default function NotesPanel({
  startDate,
  endDate,
  notes,
  setNotes,
  clearSelection
}) {
  const [text, setText] = useState("");

  // Load note when date changes
  useEffect(() => {
    let key;

    if (startDate) {
      key = startDate.toDateString();
    } else {
      key = "general-note"; // ✅ no date case
    }

    setText(notes[key] || "");

  }, [startDate, notes]);



  // SAVE NOTE
  const handleSaveNote = () => {

    let key;

    if (startDate) {
      key = startDate.toDateString();
    } else {
      key = "general-note"; // ✅ no date case
    }

    setNotes(prev => {
      const updated = { ...prev };

      if (text.trim() === "") {
        delete updated[key];
      } else {
        updated[key] = text;
      }

      localStorage.setItem(
        "calendar-notes",
        JSON.stringify(updated)
      );

      return updated;
    });
  };



  // CLEAR NOTE
  const handleClearNote = () => {

    let key;

    if (startDate) {
      key = startDate.toDateString();
    } else {
      key = "general-note"; // ✅ allow clearing without date
    }

    setNotes(prev => {
      const updated = { ...prev };

      delete updated[key];

      localStorage.setItem(
        "calendar-notes",
        JSON.stringify(updated)
      );

      return updated;
    });

    setText("");

    clearSelection(); // safe even if no date
  };



  return (
    <div>

      <h3 className="font-semibold mb-2">NOTES</h3>

      <p className="text-sm text-purple-600 mb-2">
        {startDate && endDate
          ? `${startDate.toDateString()} → ${endDate.toDateString()}`
          : startDate
          ? startDate.toDateString()
          : "General Notes"}
      </p>



      <textarea
        className="w-full h-40 border rounded p-2
        bg-[repeating-linear-gradient(white,white_24px,#eee_25px)]"
        placeholder="Write your notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />



      <div className="flex justify-between items-center mt-4">

        {/* CLEAR */}
        <button
          onClick={handleClearNote}
          className="px-4 py-2 rounded-lg border border-gray-300
          text-gray-700 hover:bg-gray-100 transition"
        >
          ✖ Clear Note
        </button>



        {/* SAVE */}
        <button
          onClick={handleSaveNote}
          className="px-5 py-2 rounded-lg text-white font-medium
          bg-gradient-to-r from-purple-600 to-indigo-700
          hover:from-purple-700 hover:to-indigo-800
          shadow-md transition"
        >
          💾 Save ✓
        </button>

      </div>

    </div>
  );
}