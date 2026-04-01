import { useState, useEffect, useRef } from "react";
import "./App.css";
import PomodoroTimer from "./PomodoroTimer";
import HabitTracker from "./HabitTracker";
import HydrationTracker from "./HydrationTracker";

function App() {
    // Initialize state to store the task list
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("dashboardTasks");

        // If there is existing data, convert it from a JSON string back into a JavaScript array
        // If not, use the default array
        if (savedTasks) {
            return JSON.parse(savedTasks);
        } else {
            return [
                {
                    id: 1,
                    text: "Học Web Development (7h00 - 15h00)",
                    completed: false,
                },
                {
                    id: 2,
                    text: "Tập giãn cơ, Cobra Pose và bật nhảy",
                    completed: false,
                },
                {
                    id: 3,
                    text: "Chuẩn bị đi ngủ trước 23h00",
                    completed: false,
                },
            ];
        }
    });

    // Initialize state to track the input field
    const [inputValue, setInputValue] = useState("");

    // Use useEffect to automatically save data whenever the tasks array changes
    useEffect(() => {
        // Convert the tasks array into a JSON string
        // and save it to localStorage under the name 'dashboardTasks'
        localStorage.setItem("dashboardTasks", JSON.stringify(tasks));
    }, [tasks]);

    const inputRef = useRef();

    // Event handling functions
    const handleAddTask = () => {
        if (inputValue.trim() === "") return;

        const newTask = {
            id: Date.now(),
            text: inputValue,
            completed: false,
        };

        setTasks([...tasks, newTask]);
        setInputValue("");
        inputRef.current.focus();
    };

    const handleToggleTask = (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (taskId) => {
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(filteredTasks);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    };

    return (
        <div className="todo-app">
            <header className="app-header">
                <h1>Bảng điều khiển năng suất</h1>
                <p>Chào mừng Tuấn Quốc! Hôm nay bạn cần hoàn thành những gì?</p>
            </header>

            <PomodoroTimer />
            <HydrationTracker />
            <HabitTracker />

            <div className="todo-container">
                <h2 className="todo-title">Danh sách công việc</h2>

                <div className="todo-input-group">
                    <input
                        ref={inputRef}
                        type="text"
                        className="todo-input"
                        placeholder="Enter your tasks..."
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="todo-add-btn" onClick={handleAddTask}>
                        Thêm
                    </button>
                </div>

                <ul className="todo-list">
                    {tasks.map((task) => {
                        return (
                            <li
                                key={task.id}
                                className={`todo-item ${task.completed ? "completed" : ""}`}
                            >
                                <div className="todo-item-content">
                                    <input
                                        type="checkbox"
                                        className="todo-checkbox"
                                        checked={task.completed}
                                        onChange={() =>
                                            handleToggleTask(task.id)
                                        }
                                    />
                                    <span className="todo-text">
                                        {task.text}
                                    </span>
                                </div>
                                <button
                                    className="todo-delete-btn"
                                    onClick={() => {
                                        handleDeleteTask(task.id);
                                    }}
                                >
                                    Xóa
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
