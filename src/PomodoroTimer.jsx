import { useEffect, useState } from "react";
import "./PomodoroTimer.css";

const PomodoroTimer = () => {
    let pomodoroDuration = 25;

    // 1. Khởi tạo State
    const [timeLeft, setTimeLeft] = useState(pomodoroDuration * 60);
    const [isRunning, setIsRunning] = useState(false);

    // 2. Logic đếm ngược với useEffect
    // useEffect(() => {
    //     let intervalId;

    //     // Nếu đồng hồ đang chạy và thời gian vẫn lớn hơn 0
    //     if (isRunning && timeLeft > 0) {
    //         intervalId = setInterval(() => {
    //             setTimeLeft((prevTime) => prevTime - 1);
    //         }, 1000);
    //     } else if (timeLeft === 0) {
    //         // TODO: Tối ưu lại chỗ này để tránh cascading renders khi có thời gian
    //         setIsRunning(false);
    //     }
    //     return () => clearInterval(intervalId);
    // }, [isRunning, timeLeft]);
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

    // 4. Hàm chuyển đổi giây thành định dạng MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainSeconds = seconds % 60;
        // Thêm số 0 ở trước nếu số giây < 10 (ví dụ: 09 thay vì 9)
        return `${minutes.toString().padStart(2, "0")}:${remainSeconds.toString().padStart(2, "0")}`;
    };

    // 5. Các hàm xử lý nút bấm
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
