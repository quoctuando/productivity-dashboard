import { useState, useEffect, useRef } from "react";
import "./App.css";
import PomodoroTimer from "./PomodoroTimer";
import HabitTracker from "./HabitTracker";
import HydrationTracker from "./HydrationTracker";

function App() {
    // 1. Khởi tạo state chứa danh sách công việc
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("dashboardTasks");

        // Nếu có dữ liệu cũ, chuyển từ chuỗi JSON về mảng JS.
        // Nếu chưa có, dùng mảng mặc định.
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

    // 2. Khởi tạo state để theo dõi ô nhập liệu
    const [inputValue, setInputValue] = useState("");

    // 3. Sử dụng useEffect để tự động lưu dữ liệu mỗi khi mảng 'tasks' thay đổi
    useEffect(() => {
        // Biến mảng tasks thành chuỗi JSON
        // và lưu vào localStorage với tên 'dashboardTasks'
        localStorage.setItem("dashboardTasks", JSON.stringify(tasks));
    }, [tasks]); // [tasks] ở đây có nghĩa là: "Chỉ chạy đoạn code trên khi 'tasks' bị thay đổi"

    const inputRef = useRef();

    // Hàm xử lý khi bấm nút "Thêm"
    const handleAddTask = () => {
        if (inputValue.trim() === "") return;

        const newTask = {
            id: Date.now(),
            text: inputValue,
            completed: false,
        };

        // Cập nhật danh sách: copy mảng cũ (...tasks) và thêm task mới vào cuối
        setTasks([...tasks, newTask]);
        setInputValue("");
        inputRef.current.focus();
    };

    // Hàm xử lý khi đánh dấu hoàn thành (tick vào ô checkbox)
    const handleToggleTask = (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    // Hàm xử lý khi bấm nút "Xóa"
    const handleDeleteTask = (taskId) => {
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(filteredTasks);
    };

    // Cho phép nhấn Enter để thêm công việc
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
