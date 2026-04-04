import { useEffect, useState } from "react";
import "./HabitTracker.css";

const HabitTracker = () => {
    const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

    const [habits, setHabits] = useState(() => {
        const savedHabits = localStorage.getItem("dashboardHabits");
        if (savedHabits) {
            return JSON.parse(savedHabits);
        } else {
            return [];
        }
    });

    // State for CRUD
    const [newHabitName, setNewHabitName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");

    // Save to localStorage whenever changes occur
    useEffect(() => {
        localStorage.setItem("dashboardHabits", JSON.stringify(habits));
    }, [habits]);

    // Event handling functions
    const toggleHabitDay = (habitId, dayIndex) => {
        const updatedHabits = habits.map((habit) => {
            if (habit.id === habitId) {
                const newDays = [...habit.days];
                newDays[dayIndex] = !newDays[dayIndex];
                return { ...habit, days: newDays };
            }
            return habit;
        });
        setHabits(updatedHabits);
    };

    const handleAddHabit = () => {
        if (newHabitName.trim() === "") return;
        const newHabit = {
            id: Date.now(),
            name: newHabitName,
            days: [false, false, false, false, false, false, false],
        };
        setHabits([...habits, newHabit]);
        setNewHabitName("");
    };

    const handleDeleteHabit = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa thói quen này không?")) {
            setHabits(habits.filter((habit) => habit.id !== id));
        }
    };

    const startEditing = (id, currentName) => {
        setEditingId(id);
        setEditName(currentName);
    };

    const saveEdit = (id) => {
        if (editName.trim() === "") return;
        setHabits(
            habits.map((habit) =>
                habit.id === id ? { ...habit, name: editName } : habit,
            ),
        );
        setEditingId(null);
        setEditName("");
    };

    return (
        <div className="habit-container">
            <div className="habit-header-main">
                <h2 className="habit-title">Theo dõi thói quen</h2>
                <div className="habit-input-group">
                    <input
                        type="text"
                        className="habit-input"
                        placeholder="Thêm thói quen mới..."
                        value={newHabitName}
                        onChange={(e) => setNewHabitName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddHabit();
                            }
                        }}
                    />
                    <button
                        className="btn-action add-habit-btn"
                        onClick={handleAddHabit}
                    >
                        Thêm
                    </button>
                </div>
            </div>

            <div className="habit-grid">
                <div className="habit-header-row">
                    <div className="habit-name-header">Thói quen</div>
                    <div className="habit-days-header">
                        {daysOfWeek.map((day, index) => (
                            <span key={index} className="day-label">
                                {day}
                            </span>
                        ))}
                    </div>
                </div>

                {habits.map((habit) => (
                    <div key={habit.id} className="habit-row">
                        <div className="habit-name-container">
                            {editingId === habit.id ? (
                                <div className="habit-edit-mode">
                                    <input
                                        type="text"
                                        className="habit-input edit-habit-input"
                                        value={editName}
                                        onChange={(e) =>
                                            setEditName(e.target.value)
                                        }
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                e.target.blur();
                                                saveEdit(habit.id);
                                            }
                                        }}
                                    />
                                    <div className="habit-action-btns">
                                        <button
                                            className="icon-btn save"
                                            onClick={() => saveEdit(habit.id)}
                                        >
                                            ✅
                                        </button>
                                        <button
                                            className="icon-btn cancel"
                                            onClick={() => setEditingId(null)}
                                        >
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="habit-name">
                                        {habit.name}
                                    </div>
                                    <div className="habit-action-btns">
                                        <button
                                            className="icon-btn edit"
                                            onClick={() =>
                                                startEditing(
                                                    habit.id,
                                                    habit.name,
                                                )
                                            }
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="icon-btn delete"
                                            onClick={() =>
                                                handleDeleteHabit(habit.id)
                                            }
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* <div className="habit-name">{habit.name}</div> */}

                        <div className="habit-days">
                            {habit.days.map((isCompleted, index) => (
                                <div
                                    key={index}
                                    className={`habit-box ${isCompleted ? "completed" : ""}`}
                                    onClick={() =>
                                        toggleHabitDay(habit.id, index)
                                    }
                                >
                                    {isCompleted && "✓"}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HabitTracker;
