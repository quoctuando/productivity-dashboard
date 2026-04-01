import { useEffect, useState } from "react";
import "./PomodoroTimer.css";

const PomodoroTimer = () => {
    let pomodoroDuration = 25;

    // Initialize state
    const [timeLeft, setTimeLeft] = useState(pomodoroDuration * 60);
    const [isRunning, setIsRunning] = useState(false);

    // Countdown logic using useEffect
    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(intervalId);
                        setIsRunning(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning]);

    // Function to convert seconds into MM:SS format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainSeconds = seconds % 60;
        // Add a leading zero if seconds are less than 10 (e.g., 09 instead of 9)
        return `${minutes.toString().padStart(2, "0")}:${remainSeconds.toString().padStart(2, "0")}`;
    };

    // Event handling functions
    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(pomodoroDuration * 60);
    };

    return (
        <div className="pomodoro-container">
            <h2 className="pomodoro-title">Đồng hồ Pomodoro</h2>
            <div className="time-display">{formatTime(timeLeft)}</div>
            <div className="pomodoro-controls">
                <button
                    className={`btn-primary ${isRunning ? "pause" : "start"}`}
                    onClick={toggleTimer}
                >
                    {isRunning ? "Tạm dừng" : "Bắt đầu"}
                </button>
                <button className="btn-secondary" onClick={resetTimer}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;
