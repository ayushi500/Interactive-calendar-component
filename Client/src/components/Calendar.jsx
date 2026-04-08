import { useState } from "react";
import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    format,
    addMonths,
    subMonths,
} from "date-fns";
import { motion } from "framer-motion";
import NotesPanel from "./NotesPanel";

const themes = [
    {
        name: "Ocean Blue",
        gradient: "bg-gradient-to-b from-blue-600 to-cyan-900",
        color: "bg-blue-600",
        light: "bg-blue-200",
        border: "border-blue-500",
    },
    {
        name: "Forest Green",
        gradient: "bg-gradient-to-b from-green-600 to-emerald-900",
        color: "bg-green-600",
        light: "bg-green-200",
        border: "border-green-500",
    },
    {
        name: "Dusk Purple",
        gradient: "bg-gradient-to-b from-purple-700 to-indigo-900",
        color: "bg-purple-600",
        light: "bg-purple-200",
        border: "border-purple-500",
    },
    {
        name: "Ember Red",
        gradient: "bg-gradient-to-b from-red-600 to-rose-900",
        color: "bg-red-600",
        light: "bg-red-200",
        border: "border-red-500",
    },
];

const holidays = {
    "01-26": "Republic Day",
    "08-15": "Independence Day",
    "10-02": "Gandhi Jayanti",
    "12-25": "Christmas",
};

const monthImages = [
    "https://images.unsplash.com/photo-1549887534-3ec93abae58c", // Jan
    "https://images.unsplash.com/photo-1519681393784-d120267933ba", // Feb
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470", // Mar
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d", // Apr
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e", // May
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429", // Jun
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", // Jul
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // Aug
    "https://images.unsplash.com/photo-1500534623283-312aade485b7", // Sep
    "https://images.unsplash.com/photo-1470770903676-69b98201ea1c", // Oct
    "https://images.unsplash.com/photo-1482192505345-5655af888cc4", // Nov
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66", // Dec
];

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [hoverDate, setHoverDate] = useState(null);
    const [theme, setTheme] = useState(themes[0]);

    const days = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
    });

    const handleClick = (day) => {
        if (!startDate) setStartDate(day);
        else if (!endDate) setEndDate(day);
        else {
            setStartDate(day);
            setEndDate(null);
        }
        setHoverDate(null);
    };

    const isInRange = (day) => {
        if (startDate && endDate) return day >= startDate && day <= endDate;
        if (startDate && hoverDate) return day >= startDate && day <= hoverDate;
        return false;
    };



    return (
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">

            {/* HERO */}
            <div className={`h-56 ${theme.gradient} text-white relative overflow-hidden`}>

                {/* IMAGE */}
                <img
                    src={monthImages[currentDate.getMonth()]}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                {/* NAV BUTTONS */}
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                    <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="bg-white/30 px-2 rounded">◀</button>
                    <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="bg-white/30 px-2 rounded">▶</button>
                </div>

                {/* TEXT */}
                <div className="relative z-10 flex items-end h-full p-6">
                    <div>
                        <p className="text-sm opacity-80">{format(currentDate, "yyyy")}</p>
                        <h1 className="text-4xl font-bold">{format(currentDate, "MMMM")}</h1>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div className="flex flex-col md:flex-row">

                {/* NOTES */}
                <div className="w-full md:w-1/3 border-r p-4">
                    <NotesPanel startDate={startDate} endDate={endDate} />
                </div>

                {/* CALENDAR */}
                <div className="w-full md:w-2/3 p-4">

                    {/* NAVIGATION */}
                    <div className="flex justify-between mb-4">
                        <button
                            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                            className="px-3 py-1 border rounded"
                        >
                            ◀
                        </button>

                        <h2 className="font-semibold">
                            {format(currentDate, "MMMM yyyy")}
                        </h2>

                        <button
                            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                            className="px-3 py-1 border rounded"
                        >
                            ▶
                        </button>
                    </div>

                    {/* WEEKDAYS */}
                    <div className="grid grid-cols-7 text-sm text-gray-500 mb-2">
                        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
                            <div key={d} className="text-center">{d}</div>
                        ))}
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-7 gap-2">


                        {/* EMPTY SPACES */}
                        {Array.from({
                            length: (startOfMonth(currentDate).getDay() + 6) % 7,
                        }).map((_, i) => (
                            <div key={"empty-" + i}></div>
                        ))}

                        {days.map((day) => {
                            const key = `${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
                            const holiday = holidays[key];
                            const isStart =
                                startDate?.toDateString() === day.toDateString();
                            const isEnd =
                                endDate?.toDateString() === day.toDateString();
                            const isToday =
                                new Date().toDateString() === day.toDateString();
                            const dayOfWeek = day.getDay();

                            return (
                                <motion.div
                                    key={day}
                                    title={holiday || ""}
                                    onClick={() => handleClick(day)}
                                    onMouseEnter={() => setHoverDate(day)}
                                    whileHover={{ scale: 1.1 }}
                                    className={`relative p-2 text-center rounded-lg cursor-pointer

    ${isInRange(day) ? theme.light : ""}
    ${isStart ? `${theme.color} text-white rounded-l-full` : ""}
    ${isEnd ? `${theme.color} text-white rounded-r-full` : ""}
    ${isToday ? `border-2 ${theme.border}` : ""}

    ${dayOfWeek === 0 ? "text-red-500" : ""}
  ${dayOfWeek === 6 ? "text-blue-500" : ""}
  `}
                                >
                                    {format(day, "d")}

                                    {/* 🪔 Holiday Dot */}
                                    {holiday && (
                                        <div className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"></div>
                                    )}

                                    {/* 🔵 Today Dot */}
                                    {isToday && (
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mx-auto mt-1"></div>
                                    )}

                                </motion.div>
                            );
                        })}
                    </div>


                    <div className="flex justify-end mt-6">
                        <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl px-4 py-3 flex items-center gap-3 border">

                            <p className="text-sm text-gray-600 font-medium">🎨 Theme</p>

                            <div className="flex gap-2">
                                {themes.map((t) => (
                                    <div
                                        key={t.name}
                                        onClick={() => setTheme(t)}
                                        className={`w-6 h-6 rounded-full cursor-pointer transition
          ${t.color}
          ${theme.name === t.name ? "ring-2 ring-black scale-110" : "hover:scale-110"}`}
                                    />
                                ))}
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}