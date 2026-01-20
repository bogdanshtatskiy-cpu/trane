// --- КОНФИГУРАЦИЯ ---
const SCHEDULE_START_STR = "2026-01-19";
const SCHEDULE_END_STR = "2026-02-19";
const TRAINING_START_STR = "2026-01-21";

const START_DATE_OBJ = new Date(SCHEDULE_START_STR); START_DATE_OBJ.setHours(0,0,0,0);
const END_DATE_OBJ = new Date(SCHEDULE_END_STR); END_DATE_OBJ.setHours(23,59,59,999);
const TRAINING_START_OBJ = new Date(TRAINING_START_STR); TRAINING_START_OBJ.setHours(0,0,0,0);

// --- ДЕТАЛЬНЫЕ ПРОГРАММЫ ТРЕНИРОВОК ---
const WORKOUT_A_DATA = {
    title: "🔥 Тренировка А (Верх)",
    desc: "Грудь, Плечи, Трицепс. Жми для старта.",
    routine: [
        {
            name: "0. OstroVit BCAA",
            reps: "5 капсул",
            sets: 1,
            note: "Запей стаканом воды за 15-20 мин до начала.",
            rest: "Готовность"
        },
        {
            name: "1. Отжимания (Медленные)",
            reps: "МАКСИМУМ",
            sets: 4,
            note: "2 сек вниз, 1 сек вверх. Спина прямая!",
            rest: "90 сек"
        },
        {
            name: "2. Жим гантелей лежа на полу",
            reps: "15-20 раз",
            sets: 4,
            note: "Локти касаются пола и сразу вверх.",
            rest: "60 сек"
        },
        {
            name: "3. Махи гантелями в стороны",
            reps: "15-20 раз",
            sets: 4,
            note: "Плечи не задирай к ушам. Локти мягкие.",
            rest: "60 сек"
        },
        {
            name: "4. Разгибание на трицепс",
            reps: "15 раз",
            sets: 3,
            note: "Одна гантель двумя руками из-за головы.",
            rest: "45 сек"
        },
        {
            name: "5. Планка",
            reps: "30-45 сек",
            sets: 3,
            note: "Держись до трясучки. Пресс камень.",
            rest: "30 сек"
        }
    ]
};

const WORKOUT_B_DATA = {
    title: "💪 Тренировка Б (База)",
    desc: "Спина, Ноги, Бицепс. Жми для старта.",
    routine: [
        {
            name: "0. OstroVit BCAA",
            reps: "5 капсул",
            sets: 1,
            note: "Запей водой. Защита мышц от разрушения.",
            rest: "Готовность"
        },
        {
            name: "1. Приседания",
            reps: "20 раз",
            sets: 4,
            note: "Пятки не отрывай. Спина прямая.",
            rest: "60-90 сек"
        },
        {
            name: "2. Тяга гантели (с упором)",
            reps: "15-20 на руку",
            sets: 4,
            note: "Тяни локтем к карману (как бензопилу).",
            rest: "Между руками 30 сек"
        },
        {
            name: "3. Бицепс стоя (Гантели)",
            reps: "15-20 раз",
            sets: 4,
            note: "Локти прижми к корпусу. Не раскачивайся.",
            rest: "60 сек"
        },
        {
            name: "4. Молотки",
            reps: "15 раз",
            sets: 3,
            note: "Ладони смотрят друг на друга.",
            rest: "45 сек"
        },
        {
            name: "5. Лодочка",
            reps: "15 раз (держать 2 сек)",
            sets: 3,
            note: "Супермен на полу. Пауза наверху.",
            rest: "45 сек"
        }
    ]
};

const CARDIO_DATA = {
    title: "🚴‍♂️ Кардио (Вело)",
    desc: "Жиросжигание. BCAA перед стартом!",
    routine: [
        {
            name: "0. OstroVit BCAA",
            reps: "5 капсул",
            sets: 1,
            note: "Выпей перед тем, как сесть на велик.",
            rest: "-"
        },
        {
            name: "Велотренажер",
            reps: "35-40 минут",
            sets: 1,
            note: "Средний темп. Пульс 120-130. Спина ровная.",
            rest: "Без отдыха"
        }
    ]
};

// --- БАЗА ЗНАНИЙ (ОБЪЯСНЯЕМ КАК ДЛЯ НОВИЧКА) ---
const EXERCISE_DB = [
    { 
        name: "Тяга гантели (с упором)", 
        tags: ["Спина", "Осанка"], 
        desc: "Главное лекарство для твоей спины. Убирает сутулость.", 
        steps: [
            "1. Найди диван. Встань на него левым коленом и упрись левой рукой. Ты — устойчивый столик на трех ножках.",
            "2. Спина должна быть прямой и плоской. Не горбись! Смотри в пол.",
            "3. Гантель в правой руке. Тяни её к ЗАДНЕМУ КАРМАНУ джинс (к бедру).",
            "4. Представь, что дергаешь шнур, чтобы завести бензопилу.",
            "5. Локоть скользит по ребрам. В стороны не оттопыривай.",
            "6. Наверху задержи на секунду и почувствуй мышцу под мышкой."
        ],
        warning: "Не тяни бицепсом к плечу! Тяни локтем назад."
    },
    { 
        name: "Отжимания", 
        tags: ["Грудь", "Руки"], 
        desc: "Классика. Если тяжело — делай с колен, никто не осудит.", 
        steps: [
            "1. Упрись руками в пол, ладони чуть шире плеч.",
            "2. Самое важное: СИЛЬНО напряги попу и живот. Твое тело должно быть жестким как доска.",
            "3. Если живот провисает вниз как гамак — ты убиваешь поясницу.",
            "4. Опускайся медленно (считай про себя: и-раз, и-два).",
            "5. Касайся грудью пола (или почти касайся) и мощно толкай себя вверх."
        ],
        warning: "Локти не должны смотреть в стороны под 90 градусов (буквой Т). Прижми их ближе к телу (как стрелочка)."
    },
    { 
        name: "Жим гантелей лежа на полу", 
        tags: ["Грудь", "Безопасно"], 
        desc: "Качает грудь и делает руки толще. На полу делать безопаснее для плеч.", 
        steps: [
            "1. Ложись спиной на пол. Ноги согни в коленях (пятки на полу).",
            "2. Возьми гантели. Локти упри в пол.",
            "3. ВАЖНО: Локти не должны быть на одной линии с плечами. Сдвинь их чуть ниже, к бокам (угол 45 градусов).",
            "4. Выдыхай и толкай гантели вверх, своди их вместе над грудью.",
            "5. Плавно опускай, пока локти не коснутся пола."
        ]
    },
    { 
        name: "Махи гантелями в стороны", 
        tags: ["Плечи"], 
        desc: "Именно это упражнение делает плечи широкими визуально.", 
        steps: [
            "1. Встань ровно. Гантели в руках внизу.",
            "2. Чуть-чуть согни локти (руки не прямые палки, а мягкие).",
            "3. Поднимай руки через стороны до высоты плеч. Выше не надо!",
            "4. Представь, что в руках кувшины и ты выливаешь из них воду (мизинец должен быть чуть ВЫШЕ большого пальца).",
            "5. Опускай плавно, не бросай."
        ],
        warning: "Не раскачивайся корпусом. Стой ровно."
    },
    { 
        name: "Разгибание на трицепс", 
        tags: ["Руки"], 
        desc: "Убирает дряблость с задней части руки.", 
        steps: [
            "1. Возьми одну гантель двумя руками. Подними над головой.",
            "2. Локти должны смотреть ВПЕРЕД, а не в стороны. Прижми их ближе к ушам.",
            "3. Опускай гантель за голову, сгибая руки только в локтях.",
            "4. Плечи не двигаются! Работают только предплечья."
        ]
    },
    { 
        name: "Бицепс стоя", 
        tags: ["Руки"], 
        desc: "Чтобы майка на рукавах трещала.", 
        steps: [
            "1. Стоя, гантели в руках ладонями вперед.",
            "2. Приклей локти к ребрам. Приклей намертво!",
            "3. Поднимай гантели к плечам.",
            "4. Если локти уходят вперед или назад — ты читеришь. Локти неподвижны."
        ]
    },
    { 
        name: "Молотки", 
        tags: ["Руки", "Предплечья"], 
        desc: "Делает руки мощными на вид.", 
        steps: [
            "1. То же самое, что бицепс, только ладони повернуты к телу.",
            "2. Гантель держишь как молоток.",
            "3. Поднимаешь к плечу, опускаешь.",
            "4. Локти всё так же приклеены к корпусу."
        ]
    },
    { 
        name: "Приседания", 
        tags: ["Ноги"], 
        desc: "Разгоняет кровь по всему телу.", 
        steps: [
            "1. Ноги на ширине плеч, носки чуть развернуты в стороны.",
            "2. Начинай движение с того, что отводишь попу назад. Как будто сзади стоит стул, и ты хочешь на него сесть.",
            "3. Пятки НЕ ОТРЫВАТЬ от пола. Пятки приклеены!",
            "4. Спина прямая, смотри вперед.",
            "5. Садись до момента, пока бедра не станут параллельны полу."
        ]
    },
    { 
        name: "Лодочка", 
        tags: ["Спина", "Поясница"], 
        desc: "Чтобы спина не болела после компьютера.", 
        steps: [
            "1. Ложись на живот. Руки вытяни вперед.",
            "2. Напряги спину и подними одновременно руки и прямые ноги вверх.",
            "3. Изобрази Супермена в полете. Замри на 2 секунды.",
            "4. Плавно опустись."
        ]
    },
    { 
        name: "Планка", 
        tags: ["Пресс"], 
        desc: "Укрепляет всё тело сразу.", 
        steps: [
            "1. Встань на локти и носки ног.",
            "2. Твое тело — прямая линия. Попа не торчит вверх и не провисает вниз.",
            "3. Напряги пресс так, будто тебя сейчас ударят в живот.",
            "4. Дыши! Не задерживай дыхание. Терпи."
        ]
    },
    { 
        name: "Велотренажер", 
        tags: ["Кардио"], 
        desc: "Сжигаем жир.", 
        steps: [
            "1. Настрой сиденье. В нижней точке нога должна быть почти прямой (чуть согнутой).",
            "2. Не вцепляйся в руль мертвой хваткой, плечи расслабь.",
            "3. Крути ровно, без рывков. Дыхание должно быть учащенным, но ты должен мочь разговаривать."
        ]
    }
];

// --- ГЕНЕРАТОР ПЛАНА (ОБНОВЛЕН ДЛЯ СПОРТПИТА) ---
const BASE_MEAL_PLAN = [
    { time: "09:00", title: "Подъем", desc: "Вода + 5г Креатина." },
    { time: "09:30", title: "Завтрак", desc: "Овсянка + 2-3 яйца." },
    { time: "13:30", title: "Обед", desc: "Гречка/Рис + Курица + Овощи." },
    { time: "17:00", title: "Полдник", desc: "Творог или яблоко." },
    { time: "20:30", title: "Ужин", desc: "Курица/Рыба + Салат." },
    { time: "23:30", title: "Отбой", desc: "Сон - лучшее лекарство." }
];

function generateMonthSchedule() {
    const schedule = {};
    let loaderDate = new Date(START_DATE_OBJ);
    let workoutToggle = true; 

    while (loaderDate <= END_DATE_OBJ) {
        const dateKey = formatDateISO(loaderDate);
        let dailyTasks = JSON.parse(JSON.stringify(BASE_MEAL_PLAN));
        
        let activitySlot;

        if (loaderDate < TRAINING_START_OBJ) {
            activitySlot = { 
                time: "19:00", 
                title: "Подготовка", 
                desc: "Проверь запасы протеина и BCAA.",
                type: 'info'
            };
        } else {
            const diffTime = loaderDate - TRAINING_START_OBJ;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays % 2 === 0) {
                // ДЕНЬ СИЛОВОЙ
                const wData = workoutToggle ? WORKOUT_A_DATA : WORKOUT_B_DATA;
                activitySlot = { 
                    time: "19:00", 
                    title: wData.title, 
                    desc: "Прими BCAA перед стартом!",
                    isWorkout: true,
                    workoutData: wData
                };
                // Добавляем протеин ПОСЛЕ тренировки
                dailyTasks.push({
                    time: "20:00",
                    title: "💪 ПРОТЕИН",
                    desc: "Выпей коктейль сразу после тренировки (30г)."
                });
                
                workoutToggle = !workoutToggle; 
            } else {
                // ДЕНЬ КАРДИО (ОТДЫХ ОТ ЖЕЛЕЗА)
                activitySlot = {
                    time: "19:00",
                    title: CARDIO_DATA.title,
                    desc: "Крутим педали + BCAA.",
                    isWorkout: true,
                    workoutData: CARDIO_DATA
                };
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
    tasksDoneMap: JSON.parse(localStorage.getItem('zapFitTasksDone')) || {},
    currentWorkoutTaskId: null
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    ensureDateBoundaries();
    renderUI();
    renderInfoContent();
});

function renderUI() {
    updateHeaderUI();
    renderTasksForViewingDate();
    updateTodayProgressBar(); 
}

// --- CORE UI ---
function updateHeaderUI() {
    const viewDateObj = new Date(appState.viewingDateISO);
    const dateOptions = { month: 'long', day: 'numeric' };
    let dateText = viewDateObj.toLocaleDateString('ru-RU', dateOptions);
    if (appState.viewingDateISO === REAL_TODAY_ISO) dateText += " (Сегодня)";
    document.getElementById('viewingDateText').textContent = dateText;
    document.getElementById('viewingDayOfWeek').textContent = viewDateObj.toLocaleDateString('ru-RU', { weekday: 'long' });

    document.getElementById('prevDayBtn').disabled = viewDateObj.getTime() <= START_DATE_OBJ.getTime();
    document.getElementById('nextDayBtn').disabled = viewDateObj.getTime() >= END_DATE_OBJ.getTime();
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
        statusMessage.textContent = (appState.viewingDateISO < REAL_TODAY_ISO) ? "День прошел." : "День еще не наступил.";
    }

    let currentPeriod = '';
    tasks.forEach((task, index) => {
        const taskId = `${appState.viewingDateISO}_${index}`;
        const isDone = appState.tasksDoneMap[taskId];
        
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
        if (task.isWorkout) taskCard.classList.add('is-workout');
        
        // Подсветка для Протеина
        if (task.title.includes('ПРОТЕИН')) taskCard.style.border = "1px solid rgba(255, 215, 0, 0.3)";

        if (isViewingToday) {
            if (task.isWorkout) {
                taskCard.onclick = () => openWorkoutModal(task.workoutData, taskId);
            } else {
                taskCard.onclick = () => toggleTaskStatus(taskId, taskCard);
            }
        }

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

// --- WORKOUT LOGIC ---
function openWorkoutModal(workoutData, taskId) {
    appState.currentWorkoutTaskId = taskId; 
    const modal = document.getElementById('modalWorkout');
    const title = document.getElementById('workoutModalTitle');
    const content = document.getElementById('workoutContent');

    title.textContent = workoutData.title;
    content.innerHTML = '';

    workoutData.routine.forEach((ex, index) => {
        const item = document.createElement('div');
        item.className = 'workout-item';
        
        let setsHtml = '';
        for(let i=1; i<=ex.sets; i++) {
            setsHtml += `<button class="set-btn" onclick="this.classList.toggle('done')">${i}</button>`;
        }

        item.innerHTML = `
            <div class="workout-name">${ex.name}</div>
            <div class="workout-meta">
                <span><i style="color:var(--primary)">•</i> ${ex.reps}</span>
                <span><i style="color:var(--primary)">•</i> Отдых: ${ex.rest}</span>
            </div>
            <div style="font-size:0.85rem; color:rgba(255,255,255,0.5); margin-bottom:10px;">${ex.note}</div>
            <div class="workout-sets">
                ${setsHtml}
            </div>
        `;
        content.appendChild(item);
    });

    openModal('modalWorkout');
}

function finishCurrentWorkout() {
    if (appState.currentWorkoutTaskId) {
        if (!appState.tasksDoneMap[appState.currentWorkoutTaskId]) {
            appState.tasksDoneMap[appState.currentWorkoutTaskId] = true;
            localStorage.setItem('zapFitTasksDone', JSON.stringify(appState.tasksDoneMap));
            triggerConfetti();
        }
        renderTasksForViewingDate();
        updateTodayProgressBar();
    }
    closeModal('modalWorkout');
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
    container.innerHTML = ''; 
    EXERCISE_DB.forEach(ex => {
        const card = document.createElement('div');
        card.className = 'info-card';
        let stepsHtml = ex.steps.map(s => `• ${s}`).join('<br>');
        card.innerHTML = `
            <h4>${ex.name}</h4>
            <div>${ex.tags.map(t => `<span class="info-tag">${t}</span>`).join(' ')}</div>
            <div class="info-text"><i>${ex.desc}</i></div>
            <div class="info-text" style="margin-top:8px">${stepsHtml}</div>
        `;
        container.appendChild(card);
    });
}

function openStats() {
    let totalDone = 0, workoutsDone = 0;
    Object.keys(appState.tasksDoneMap).forEach(key => {
        totalDone++;
        const [date, idx] = key.split('_');
        const task = FULL_SCHEDULE[date] ? FULL_SCHEDULE[date][idx] : null;
        if(task && task.isWorkout) workoutsDone++;
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
        const height = dayTasks.length ? (dDone / dayTasks.length * 100) : 0;
        
        const barWrap = document.createElement('div');
        barWrap.className = 'chart-bar-wrap';
        barWrap.innerHTML = `<div class="chart-bar ${height === 100 ? 'active' : ''}" style="height:${height}%"></div><span class="chart-label">${d.getDate()}</span>`;
        chartContainer.appendChild(barWrap);
    }
    openModal('modalStats');
}

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
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

function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const colors = ['#0a84ff', '#30d158', '#bf5af2', '#ffd60a'];
    
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 10 + 5,
            speed: Math.random() * 5 + 2,
            angle: Math.random() * 360
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;
        particles.forEach(p => {
            p.y += p.speed; p.angle += 2;
            ctx.fillStyle = p.color;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle * Math.PI / 180);
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            ctx.restore();
            if (p.y < canvas.height) active = true;
        });
        if (active) requestAnimationFrame(draw); else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
}
