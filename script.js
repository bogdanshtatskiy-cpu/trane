// --- КОНФИГУРАЦИЯ ---
// Дата начала активных тренировок
const START_TRAINING_DATE = new Date("2026-01-21"); 
const END_DATE = new Date("2026-02-19");

// Структура тренировок
const WORKOUT_A = {
    title: "Тренировка А (Верх)",
    desc: "Отжимания (4хМакс), Жим гантелей (4х15), Махи (4х15), Планка (3х40сек)",
    type: "workout"
};

const WORKOUT_B = {
    title: "Тренировка Б (Спина/Бицепс)",
    desc: "Присед (4х20), Тяга в наклоне (4х15), Бицепс (4х15), Лодочка (3х15)",
    type: "workout"
};

const REST_DAY = {
    title: "Отдых и восстановление",
    desc: "Прогулка 40 мин, растяжка, легкая активность.",
    type: "rest"
};

// Меню (упрощено для чередования)
const MEAL_PLAN_TRAINING = [
    { time: "09:30", title: "Подъем + Вода + Креатин", desc: "5г креатина, 500мл воды" },
    { time: "10:00", title: "Завтрак", desc: "Овсянка на воде + 2 яйца" },
    { time: "14:00", title: "Обед", desc: "Гречка/Рис + Куриная грудка + Овощи" },
    { time: "17:00", title: "Полдник", desc: "Яблоко или Творог" },
    { time: "19:00", title: "Время тренировки!", desc: "См. задание ниже" },
    { time: "20:30", title: "Ужин", desc: "Курица/Рыба + Овощи + Протеин" },
    { time: "23:30", title: "Отбой гаджетов", desc: "Подготовка ко сну" },
    { time: "00:00", title: "Сон", desc: "Восстановление ЦНС" }
];

const MEAL_PLAN_REST = [
    { time: "09:30", title: "Подъем + Вода + Креатин", desc: "5г креатина, 500мл воды" },
    { time: "10:00", title: "Завтрак", desc: "Овсянка + 2 яйца" },
    { time: "14:00", title: "Обед", desc: "Гречка (меньше) + Курица + Овощи (больше)" },
    { time: "17:00", title: "Полдник", desc: "Творог" },
    { time: "19:00", title: "Прогулка", desc: "Минимум 40 минут пешком" },
    { time: "20:30", title: "Ужин", desc: "Салат + Курица" },
    { time: "00:00", title: "Сон", desc: "Восстановление ЦНС" }
];

// --- ГЕНЕРАТОР ПЛАНА (19 Января - 19 Февраля) ---
function generateSchedule() {
    const schedule = {};
    let currentDate = new Date("2026-01-19");
    let workoutToggle = true; // True = A, False = B

    while (currentDate <= END_DATE) {
        const dateKey = currentDate.toISOString().split('T')[0];
        let tasks = [];
        let isTrainingDay = false;

        // Логика распределения дней
        if (currentDate < START_TRAINING_DATE) {
            // Дни до старта (19, 20)
            tasks = [...MEAL_PLAN_REST];
            tasks[4] = { time: "19:00", title: "Подготовка", desc: "Закупка продуктов, проверка снаряжения" };
        } else {
            // Чередование: Треня - Отдых - Треня - Отдых
            const diffTime = Math.abs(currentDate - START_TRAINING_DATE);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays % 2 === 0) {
                // День Тренировки
                isTrainingDay = true;
                const workout = workoutToggle ? WORKOUT_A : WORKOUT_B;
                workoutToggle = !workoutToggle; // Смена А на Б
                
                // Собираем задачи
                tasks = JSON.parse(JSON.stringify(MEAL_PLAN_TRAINING)); // Глубокая копия
                // Вставляем конкретную тренировку в слот 19:00
                const workoutTaskIndex = tasks.findIndex(t => t.time === "19:00");
                if(workoutTaskIndex !== -1) {
                    tasks[workoutTaskIndex] = { 
                        time: "19:00", 
                        title: workout.title, 
                        desc: workout.desc,
                        isWorkout: true 
                    };
                }
            } else {
                // День Отдыха
                tasks = JSON.parse(JSON.stringify(MEAL_PLAN_REST));
            }
        }

        schedule[dateKey] = tasks;
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return schedule;
}

const FULL_SCHEDULE = generateSchedule();

// --- STATE MANAGEMENT ---
const APP_STATE = {
    today: new Date().toISOString().split('T')[0],
    tasksDone: JSON.parse(localStorage.getItem('zapFitTasks')) || {}
};

// --- DOM ELEMENTS ---
const elements = {
    date: document.getElementById('currentDate'),
    day: document.getElementById('currentDay'),
    taskList: document.getElementById('tasksList'),
    progressRing: document.querySelector('.progress-ring__circle'),
    progressText: document.getElementById('progressPercent'),
    motivation: document.getElementById('motivationText'),
    totalDone: document.getElementById('totalTasksDone'),
    main: document.getElementById('mainContent'),
    stats: document.getElementById('statsView')
};

// --- INITIALIZATION ---
function init() {
    updateDateHeader();
    renderTasks();
    updateProgress();
    updateStats();
}

function updateDateHeader() {
    const now = new Date();
    const options = { month: 'long', day: 'numeric' };
    const dayName = { weekday: 'long' };
    
    elements.date.textContent = now.toLocaleDateString('ru-RU', options);
    elements.day.textContent = now.toLocaleDateString('ru-RU', dayName);
}

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    if (tab === 'today') {
        elements.main.classList.remove('hidden');
        elements.stats.classList.add('hidden');
    } else {
        elements.main.classList.add('hidden');
        elements.stats.classList.remove('hidden');
        updateStats();
    }
}

// --- RENDERING TASKS ---
function renderTasks() {
    const dateKey = APP_STATE.today;
    const tasks = FULL_SCHEDULE[dateKey];
    elements
