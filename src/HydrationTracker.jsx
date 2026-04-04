import { useEffect, useState } from "react";
import "./HydrationTracker.css";

const HydrationTracker = () => {
    // Initialize state from localStorage
    const [waterCount, setWaterCount] = useState(() => {
        const today = new Date().toDateString();
        const savedDate = localStorage.getItem("lastActiveDate");
        const savedWater = localStorage.getItem("waterCount");

        // If it's a new day, reset to 0 and update the date
        if (today !== savedDate) {
            localStorage.setItem("lastActiveDate", today);
            localStorage.setItem("waterCount", "0");
            return 0;
        }

        // If it's still the same day, use the existing value.
        return savedWater ? parseInt(savedWater, 10) : 0;
    });

    const [noSugarStreak, setNoSugerStreak] = useState(() => {
        const savedStreak = localStorage.getItem("noSugarStreak");
        return savedStreak ? parseInt(savedStreak, 10) : 0;
    });

    const [streakTitle, setStreakTitle] = useState(() => {
        return localStorage.getItem("streakTitle") || "";
    });
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [tempTitle, setTempTitle] = useState("");

    // Save data whenever the state changes
    useEffect(() => {
        localStorage.setItem("waterCount", waterCount.toString());
        localStorage.setItem("noSugarStreak", noSugarStreak.toString());
    }, [waterCount, noSugarStreak]);

    useEffect(() => {
        localStorage.setItem("streakTitle", streakTitle);
    }, [streakTitle]);

    // Event handling functions
    const addWater = () => {
        if (waterCount < 10) {
            setWaterCount((prev) => prev + 1);
        }
    };

    const increaseStreak = () => {
        setNoSugerStreak((prev) => prev + 1);
    };

    const resetStreak = () => {
        if (
            window.confirm(
                `Bạn có chắc chắn muốn làm mới chuỗi "${streakTitle}" và bắt đầu lại từ đầu không?`,
            )
        ) {
            setNoSugerStreak(0);
        }
    };

    return (
        <div className="tracker-container">
            <h2 className="tracker-title">Sức khoẻ & Thói quen</h2>
            <div className="tracker-grid">
                <div className="tracker-card water-card">
                    <h3>Nước lọc (Mục tiêu: 8 ly)</h3>
                    <div className="water-display">
                        <span className="water-number">{waterCount}</span>
                        <span className="water-unit">/ 8 ly</span>
                    </div>
                    <div className="water-visual">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className={`water-drop ${i < waterCount ? "filled" : ""}`}
                            >
                                💧
                            </div>
                        ))}
                    </div>
                    <button className="btn-action water-btn" onClick={addWater}>
                        +1 Ly Nước
                    </button>
                </div>

                <div className="tracker-card sugar-card">
                    <div className="streak-header">
                        {isEditingTitle ? (
                            <input
                                type="text"
                                className="streak-title-input"
                                value={tempTitle}
                                onChange={(e) => setTempTitle(e.target.value)}
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        e.target.blur(); // Ép nhả focus, sẽ tự động kích hoạt sự kiện onBlur bên dưới
                                    }
                                }}
                                onBlur={() => {
                                    setStreakTitle(tempTitle.trim());
                                    setIsEditingTitle(false);
                                }}
                            />
                        ) : (
                            <h3
                                className={`editable-streak-title ${streakTitle === "" ? "empty-title" : ""}`}
                                title="Nhấn để chỉnh sửa"
                                onClick={() => {
                                    setTempTitle(streakTitle);
                                    setIsEditingTitle(true);
                                }}
                            >
                                {streakTitle}{" "}
                                <span className="edit-icon-hint">✏️</span>
                            </h3>
                        )}
                    </div>
                    <div className="streak-display">
                        <span className="streak-icon">🔥</span>
                        <span className="streak-number">{noSugarStreak}</span>
                        <span className="streak-unit">Ngày</span>
                    </div>
                    <div className="streak-actions">
                        <button
                            className="btn-action streak-btn"
                            onClick={increaseStreak}
                        >
                            +1 Ngày thành công
                        </button>
                        <button
                            className="btn-action reset-btn"
                            onClick={resetStreak}
                        >
                            Bắt đầu lại từ đầu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HydrationTracker;
