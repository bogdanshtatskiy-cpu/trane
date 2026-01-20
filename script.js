// --- КОНФИГУРАЦИЯ ---
const SCHEDULE_START_STR = "2026-01-19";
const SCHEDULE_END_STR = "2026-02-19";
const TRAINING_START_STR = "2026-01-21";

const START_DATE_OBJ = new Date(SCHEDULE_START_STR); START_DATE_OBJ.setHours(0,0,0,0);
const END_DATE_OBJ = new Date(SCHEDULE_END_STR); END_DATE_OBJ.setHours(23,59,59,999);
const TRAINING_START_OBJ = new Date(TRAINING_START_STR); TRAINING_START_OBJ.setHours(0,0,0,0);

// --- БАЗА ЗНАНИЙ УПРАЖНЕНИЙ (ОБНОВЛЕНА) ---
const EXERCISE_DB = [
    {
        name: "Тяга гантели одной рукой (с упором)",
        tags: ["Спина", "Осанка", "Безопасно"],
        desc: "Упражнение №1 для сидячей работы. Делаем с опорой о диван/стул, чтобы снять нагрузку с поясницы.",
        steps: [
            "1. Поза 'Тренога': Встань левым коленом и левой рукой на диван. Спина ровная как стол, взгляд вниз.",
            "2. Правая нога на полу. Гантель в правой руке висит вниз.",
            "3. Представь, что заводишь бензопилу: тяни локоть вверх и НАЗАД (к карману джинс).",
            "4. Локоть должен скользить вдоль ребер, не отводи его в сторону.",
            "5. В верхней точке прожми лопатку к центру спины. Плавно опусти.",
            "Сделай нужное кол-во раз, потом поменяй сторону."
        ],
        warning: "Не тяни гантель к груди бицепсом! Тяни локтем к поясу."
    },
    {
        name: "Отжимания (Медленные)",
        tags: ["Грудь", "Руки"],
        desc: "Классика. Главное — контроль тела.",
        steps: [
            "Упор лежа. Ладони чуть шире плеч. Тело — прямая струна.",
            "Напряги пресс и ягодицы, чтобы поясница не провисала.",
            "Медленно (2-3 сек) опускайся вниз.",
            "Мощно (1 сек) выжми себя вверх.",
            "Тяжело? Делай с колен, но держи спину ровно."
        ],
        warning: "Если болит поясница — значит, ты провисаешь. Напряги пресс!"
    },
    {
        name: "Жим гантелей лежа на полу",
        tags: ["Грудь", "Плечи"],
        desc: "Безопаснее для плеч, чем на скамье. Качает объем груди.",
        steps: [
            "Ляг на пол спиной, ноги согни в коленях.",
            "Локти упри в пол под углом 45 градусов к телу (не 90!).",
            "Выжми гантели вверх, сводя их вместе над грудью.",
            "Медленно опусти локти на пол."
        ]
    },
    {
        name: "Махи гантелями в стороны",
        tags: ["Плечи (Ширина)"],
        desc: "Делает плечи визуально шире. Вес не важен, важна техника.",
        steps: [
            "Стоя, гантели в опущенных руках.",
            "Подними руки через стороны ровно до уровня плеч (не выше).",
            "Локти чуть согнуты, кисти развернуты так, будто выливаешь воду из кувшина (мизинец выше большого пальца).",
            "Плавно опусти, но не бросай."
        ]
    },
    {
        name: "Разгибание на трицепс",
        tags: ["Руки (Трицепс)"],
        desc: "Убирает дряблость с задней поверхности руки.",
        steps: [
            "Возьми одну гантель двумя руками, подними над головой.",
            "Прижми локти ближе к ушам.",
            "Опускай гантель за голову, сгибая руки ТОЛЬКО в локтях.",
            "Плечи не двигаются, работают только предплечья."
        ]
    },
    {
        name: "Лодочка",
        tags: ["Поясница"],
        desc: "Укрепляет низ спины, чтобы она не болела от компа.",
        steps: [
            "Ляг на живот на коврик, руки вытяни вперед.",
            "Одновременно оторви от пола руки и прямые ноги.",
            "Держись на животе 1-2 секунды.",
            "Плавно опустись."
        ]
    },
    {
        name: "Приседания",
        tags: ["Ноги", "Тестостерон"],
        desc: "Базовое упражнение. Разгоняет метаболизм.",
        steps: [
            "Ноги на ширине плеч, носки чуть врозь.",
            "Отводи таз назад, будто садишься на невидимый стул.",
            "Спина прямая, пятки приклеены к полу.",
            "Садись до параллели бедра с полом."
        ]
    },
    {
        name: "Велотренажер (Кардио)",
        tags: ["Жиросжигание"],
        desc: "Ровный темп для сжигания жира.",
        steps: [
            "Сиденье по высоте так, чтобы нога внизу почти выпрямлялась.",
            "Спину держи ровно, не наваливайся всем весом на руль.",
            "Крути 35-40 минут в среднем темпе (можно говорить, но сложно петь)."
        ]
    }
];

// --- ПЛАН ТРЕНИРОВОК ---
const WORKOUT_A = {
    title: "🔥 Тренировка А (Верх)",
    desc: "Отжимания, Жим гантелей, Махи, Трицепс. См. 'Инфо' для техники.",
};
const WORKOUT_B = {
    title: "💪 Тренировка Б (База)",
    desc: "Присед, Тяга гантели (с упором!), Бицепс, Лодочка. См. 'Инфо'.",
};

const BASE_MEAL_PLAN = [
    { time: "09:00", title: "Подъем", desc: "Стакан воды + 5г креатина." },
    { time: "09:30", title: "Завтрак", desc: "Овсянка + 2-3 яйца." },
    { time: "13:30", title: "Обед", desc: "Гречка/Рис + Курица + Овощи." },
    { time: "17:00", title: "Полдник", desc: "Творог или яблоко." },
    { time: "20:30", title: "Ужин", desc: "Курица/Рыба + Салат." },
    { time: "23:30", title: "Отбой", desc: "Сон - лучшее лекарство." }
];

// --- ГЕНЕРАЦИЯ ---
function generateMonthSchedule() {
    const schedule = {};
    let loaderDate = new Date(START_DATE_OBJ);
    let workoutToggle = true; 

    while (loaderDate <= END_DATE_OBJ) {
        const dateKey = formatDateISO(loaderDate);
        let dailyTasks = JSON.parse(JSON.stringify(BASE_MEAL_PLAN));
        
        let activitySlot = { 
            time: "19:00", 
            title: "🚴‍♂️ Кардио (Вело)", 
            desc: "35-40 мин. Средний темп, пульс 120-130." 
        };

        if (loaderDate < TRAINING_START_OBJ) {
            activitySlot.title = "Подготовка";
            activitySlot.desc = "Закупка еды, настрой на режим.";
        } else {
            const diffTime = loaderDate - TRAINING_START_OBJ;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays % 2 === 0) {
                activitySlot = { 
                    time: "19:00", 
                    title: workoutToggle ? WORKOUT_A.title : WORKOUT_B.title, 
                    desc: workoutToggle ? WORKOUT_A.desc : WORKOUT_B.desc,
                    isWorkout: true
                };
                workoutToggle = !workoutToggle; 
            } else {
                activitySlot.title = "🚴‍♂️ Активное восстановление";
                activitySlot.desc = "Велотренажер 30-40 мин.";
            }
        }
        dailyTasks.push(activitySlot);
        dailyTasks.sort((a, b) => a.time.localeCompare(b.time));
        schedule[dateKey] = dailyTasks;
        loaderDate.setDate(loaderDate.getDate() + 1); 
    }
    return schedule;
}

const FULL_SCHEDULE = generateMonthSchedule();

// --- STATE ---
const now = new Date(); now.setHours(0,0,0,0);
const REAL_TODAY_ISO = formatDateISO(now);

let appState = {
    viewingDateISO: REAL_TODAY_ISO,
    tasksDoneMap: JSON.parse(localStorage.getItem('zapFitTasksDone')) || {}
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    ensureDateBoundaries();
    renderUI();
    renderInfoContent(); // Pre-load info content
});

function renderUI() {
    updateHeaderUI();
    renderTasksForViewingDate();
    updateTodayProgressBar(); 
}

// --- CORE UI FUNCTIONS ---
function updateHeaderUI() {
    const viewDateObj = new Date(appState.viewingDateISO);
    const dateOptions = { month: 'long', day: 'numeric' };
    let dateText = viewDateObj.toLocaleDateString('ru-RU', dateOptions);
    
    if (appState.viewingDateISO === REAL_TODAY_ISO) dateText += " (Сегодня)";
    
    document.getElementById('viewingDateText').textContent = dateText;
    document.getElementById('viewingDayOfWeek').textContent = viewDateObj.toLocaleDateString('ru-RU', { weekday: 'long' });

    const prevBtn = document.getElementById('prevDayBtn');
    const nextBtn = document.getElementById('nextDayBtn');
    prevBtn.disabled = viewDateObj.getTime() <= START_DATE_OBJ.getTime();
    nextBtn.disabled = viewDateObj.getTime() >= END_DATE_OBJ.getTime();
}

function renderTasksForViewingDate() {
    const tasksContainer = document.getElementById('tasksList');
    const statusMessage = document.getElementById('dayStatusMessage');
    tasksContainer.innerHTML = '';
    const tasks = FULL_SCHEDULE[appState.viewingDateISO];

    if (!tasks) return;

    const isViewingToday = appState.viewingDateISO === REAL_TODAY_ISO;

    if (isViewingToday) {
        tasksContainer.classList.remove('read-only');
        statusMessage.className = 'day-status-hidden';
    } else {
        tasksContainer.classList.add('read-only');
        statusMessage.className = 'day-status-visible';
        statusMessage.textContent = (appState.viewingDateISO < REAL_TODAY_ISO) 
            ? "День прошел." : "День еще не наступил.";
    }

    let currentPeriod = '';
    tasks.forEach((task, index) => {
        const taskId = `${appState.viewingDateISO}_${index}`;
        const isDone = appState.tasksDoneMap[taskId];
        
        // Group Titles
        const hour = parseInt(task.time.split(':')[0]);
        let period = hour < 12 ? "Утро" : (hour < 18 ? "День" : "Вечер");
        if (period !== currentPeriod) {
            const grp = document.createElement('div');
            grp.className = 'task-group-title'; grp.textContent = period;
            tasksContainer.appendChild(grp);
            currentPeriod = period;
        }

        const taskCard = document.createElement('div');
        taskCard.className = `glass-card task-card ${isDone ? 'completed' : ''}`;
        if (isViewingToday) taskCard.onclick = () => toggleTaskStatus(taskId, taskCard);

        taskCard.innerHTML = `
            <div class="task-time">${task.time}</div>
            <div class="task-details">
                <span class="task-title">${task.title}</span>
                <span class="task-desc">${task.desc}</span>
            </div>
            <div class="task-check"><span class="material-icons-round check-icon">done</span></div>
        `;
        tasksContainer.appendChild(taskCard);
    });
}

function toggleTaskStatus(taskId, cardElement) {
    if (appState.viewingDateISO !== REAL_TODAY_ISO) return;
    if (navigator.vibrate) navigator.vibrate(40);

    if (appState.tasksDoneMap[taskId]) {
        delete appState.tasksDoneMap[taskId];
        cardElement.classList.remove('completed');
    } else {
        appState.tasksDoneMap[taskId] = true;
        cardElement.classList.add('completed');
    }
    localStorage.setItem('zapFitTasksDone', JSON.stringify(appState.tasksDoneMap));
    updateTodayProgressBar();
}

function updateTodayProgressBar() {
    const tasksToday = FULL_SCHEDULE[REAL_TODAY_ISO];
    if (!tasksToday) return;
    let doneCount = 0;
    tasksToday.forEach((_, i) => { if (appState.tasksDoneMap[`${REAL_TODAY_ISO}_${i}`]) doneCount++; });
    const percent = Math.round((doneCount / tasksToday.length) * 100);
    
    const circle = document.getElementById('todayProgressCircle');
    circle.style.strokeDashoffset = 263 - (percent / 100) * 263;
    document.getElementById('todayProgressPercent').textContent = `${percent}%`;
    
    const motivation = document.getElementById('motivationText');
    if(percent === 0) motivation.textContent = "Начинай!";
    else if(percent < 100) motivation.textContent = "Процесс идет.";
    else motivation.textContent = "День закрыт! 🎉";
    
    if(percent === 100) circle.style.stroke = "#32d74b"; else circle.style.stroke = "#0a84ff";
}

// --- INFO & MODALS ---
function renderInfoContent() {
    const container = document.getElementById('infoContent');
    container.innerHTML = ''; // Clear previous if any
    EXERCISE_DB.forEach(ex => {
        const card = document.createElement('div');
        card.className = 'info-card';
        let warningHtml = ex.warning ? `<div class="info-warning"><span class="material-icons-round" style="font-size:16px">warning</span>${ex.warning}</div>` : '';
        let stepsHtml = ex.steps.map(s => `• ${s}`).join('<br>');
        
        card.innerHTML = `
            <h4>${ex.name}</h4>
            <div>${ex.tags.map(t => `<span class="info-tag">${t}</span>`).join(' ')}</div>
            <div class="info-text"><i>${ex.desc}</i></div>
            <div class="info-text" style="margin-top:8px">${stepsHtml}</div>
            ${warningHtml}
        `;
        container.appendChild(card);
    });
}

function openStats() {
    // Calculate Stats
    let totalTasks = 0, totalDone = 0, workoutsDone = 0;
    const weeklyData = [0,0,0,0,0,0,0]; // Last 7 days counts
    
    Object.keys(appState.tasksDoneMap).forEach(key => {
        totalDone++;
        const [date, idx] = key.split('_');
        const task = FULL_SCHEDULE[date] ? FULL_SCHEDULE[date][idx] : null;
        if(task && (task.isWorkout || task.title.includes('Кардио'))) workoutsDone++;
    });

    document.getElementById('statTotalDone').textContent = totalDone;
    document.getElementById('statWorkoutsDone').textContent = workoutsDone;

    const chartContainer = document.getElementById('weeklyChart');
    chartContainer.innerHTML = '';
    
    for(let i=6; i>=0; i--) {
        const d = new Date(now); d.setDate(d.getDate() - i);
        const dKey = formatDateISO(d);
        const dayTasks = FULL_SCHEDULE[dKey] || [];
        
        let dDone = 0;
        dayTasks.forEach((_, idx) => { if(appState.tasksDoneMap[`${dKey}_${idx}`]) dDone++; });
        
        const barWrap = document.createElement('div');
        barWrap.className = 'chart-bar-wrap';
        
        const height = dayTasks.length ? (dDone / dayTasks.length * 100) : 0;
        
        barWrap.innerHTML = `
            <div class="chart-bar ${height === 100 ? 'active' : ''}" style="height:${height}%"></div>
            <span class="chart-label">${d.getDate()}</span>
        `;
        chartContainer.appendChild(barWrap);
    }

    openModal('modalStats');
}

function openModal(id) {
    const m = document.getElementById(id);
    m.classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if(id === 'modalInfo') document.querySelectorAll('.nav-btn')[1].classList.add('active');
    if(id === 'modalStats') document.querySelectorAll('.nav-btn')[2].classList.add('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.nav-btn')[0].classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    closeAllModals(); 
}

// --- UTILS ---
function changeViewingDay(offset) {
    const currentViewDate = new Date(appState.viewingDateISO);
    currentViewDate.setDate(currentViewDate.getDate() + offset);
    appState.viewingDateISO = formatDateISO(currentViewDate);
    renderUI();
}
function ensureDateBoundaries() {
    let viewDate = new Date(appState.viewingDateISO);
    if (viewDate < START_DATE_OBJ) appState.viewingDateISO = SCHEDULE_START_STR;
    if (viewDate > END_DATE_OBJ) appState.viewingDateISO = SCHEDULE_END_STR;
}
function formatDateISO(dateObj) {
    const offset = dateObj.getTimezoneOffset();
    dateObj = new Date(dateObj.getTime() - (offset*60*1000));
    return dateObj.toISOString().split('T')[0];
}
