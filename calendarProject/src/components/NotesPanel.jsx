import { useState, useEffect } from "react";

export default function NotesPanel({ startDate, endDate }) {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes");
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("calendar-notes", notes);
  }, [notes]);

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
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setNotes("")}
          className="px-3 py-1 border rounded"
        >
          Clear
        </button>

        <button className="px-3 py-1 bg-purple-600 text-white rounded">
          Save ✓
        </button>
      </div>
    </div>
  );
}