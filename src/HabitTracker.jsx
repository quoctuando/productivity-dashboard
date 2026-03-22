import { useEffect, useState } from "react";
import "./HabitTracker.css";

const HabitTracker = () => {
    const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

    const [habits, setHabits] = useState(() => {
        const savedHabits = localStorage.getItem("dashboardHabits");
        if (savedHabits) {
            return JSON.parse(savedHabits);
        } else {
            return [
                {
                    id: 1,
                    name: "Không uống nước ngọt",
                    days: [false, false, false, false, false, false, false],
                },
                {
                    id: 2,
                    name: "Ngủ trước 23h00",
                    days: [false, false, false, false, false, false, false],
                },
                {
                    id: 3,
                    name: "Tập giãn cơ, Cobra pose",
                    days: [false, false, false, false, false, false, false],
                },
            ];
        }
    });

    // Lưu vào localStorage mỗi khi có thay đổi
    useEffect(
        () => {
            localStorage.setItem('dashboardHabits',JSON.stringify(habits))
        }, [habits]
    )

    // Hàm xử lý khi click vào một ô ngày của một thói quen
    const toggleHabitDay = (habitId,dayIndex) => {
        const updatedHabits = habits.map(
            habit => {
                if (habit.id === habitId){
                    const newDays= [...habit.days];
                    newDays[dayIndex] = !newDays[dayIndex]
                    return {...habit,days:newDays};
                } 
                return habit
            }
        )
        setHabits(updatedHabits);
    }

    return (
        <div className="habit-container">
            <h2 className="habit-title">Theo dõi thói quen</h2>
            <div className="habit-grid">
                {/* Hàng tiêu đề các ngày trong tuần */}
                <div className="habit-header-row">
                    <div className="habit-name-header">
                        Thói quen
                    </div>
                    <div className="habit-days-header">
                        {
                            daysOfWeek.map(
                                (day,index) => (
                                    <span 
                                    key={index} className="day-label">{day}</span>
                                )
                            )
                        }
                    </div>
                </div>

                {/* Danh sách các thói quen */}
                {
                    habits.map(
                        habit => (
                            <div key={habit.id} className="habit-row">
                                <div className="habit-name">
                                    {habit.name}
                                </div>
                                <div className="habit-days">
                                    {
                                        habit.days.map(
                                            (isCompleted, index) => (
                                                <div
                                                    key={index}
                                                    className={`habit-box ${isCompleted ? 'completed' : ''}`}
                                                    onClick={() => toggleHabitDay(habit.id,index)}
                                                >
                                                    {isCompleted && '✓'}
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
};

export default HabitTracker;
