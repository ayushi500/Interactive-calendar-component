import { useState, useEffect } from "react";

export default function NotesPanel({ startDate, endDate, clearSelection, notes, setNotes }) {
  const [text, setText] = useState("");


  const handleSaveNote = () => {
    if (!startDate) return;

    const key = startDate.toDateString();
    const updated = { ...notes };

    if (text.trim() === "") {
      delete updated[key];   // 🔥 remove if empty
    } else {
      updated[key] = text;
    }

    setNotes(updated);
    localStorage.setItem("calendar-notes", JSON.stringify(updated));
  };

  useEffect(() => {
    if (startDate) {
      const key = startDate.toDateString();
      setText(notes[key] || "");
    }
  }, [startDate, notes]);



  return (
    <div>
      <h3 className="font-semibold mb-2">NOTES</h3>

      <p className="text-sm text-purple-600 mb-2">
        {startDate && endDate
          ? `${startDate.toDateString()} → ${endDate.toDateString()}`
          : "Select a date range"}
      </p>

      <textarea
        className="w-full h-40 border rounded p-2 bg-[repeating-linear-gradient(white,white_24px,#eee_25px)]"
        placeholder="Write your notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex justify-between items-center mt-4">

        {/* CLEAR NOTE */}
        <button
          onClick={() => {
            if (!startDate) return;

            const key = startDate.toDateString();

            const updated = { ...notes };
            delete updated[key];   // ✅ delete note properly

            setNotes(updated);
            localStorage.setItem("calendar-notes", JSON.stringify(updated));

            setText("");
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700
          hover:bg-gray-100 active:scale-95 transition"
        >
          ✖ Clear Note
        </button>



        {/* SAVE */}
        <button
          onClick={handleSaveNote}
          className="px-5 py-2 rounded-lg text-white font-medium
          bg-gradient-to-r from-purple-600 to-indigo-700
          hover:from-purple-700 hover:to-indigo-800
          active:scale-95 shadow-md transition"
        >
          💾 Save ✓
        </button>


      </div>
    </div>
  );
}