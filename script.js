// --- КОНФИГУРАЦИЯ ДАТ И ПЛАНА ---
const SCHEDULE_START_STR = "2026-01-19";
const SCHEDULE_END_STR = "2026-02-19";
const TRAINING_START_STR = "2026-01-21";

// Преобразуем в объекты Date для расчетов (устанавливаем на начало дня)
const START_DATE_OBJ = new Date(SCHEDULE_START_STR); START_DATE_OBJ.setHours(0,0,0,0);
const END_DATE_OBJ = new Date(SCHEDULE_END_STR); END_DATE_OBJ.setHours(23,59,59,999);
const TRAINING_START_OBJ = new Date(TRAINING_START_STR); TRAINING_START_OBJ.setHours(0,0,0,0);


// --- БАЗЫ ДАННЫХ ТРЕНИРОВОК И ПИТАНИЯ ---
const WORKOUT_A = {
    title: "🔥 Тренировка А (Грудь/Плечи/Трицепс)",
    desc: "Отжимания (медленно!), Жим гантелей лежа, Махи в стороны, Разгибание на трицепс. В конце Планка.",
};

const WORKOUT_B = {
    title: "💪 Тренировка Б (Спина/Бицепс/Ноги)",
    desc: "Приседания, Тяга гантели в наклоне (спина прямая!), Бицепс стоя, Молотки, Лодочка.",
};

// Базовое меню (шаблон)
const BASE_MEAL_PLAN = [
    { time: "09:00", title: "Подъем", desc: "Стакан воды + 5г креатина." },
    { time: "09:30", title: "Завтрак", desc: "Овсянка + 2-3 яйца (вареные/жареные без масла)." },
    { time: "13:30", title: "Обед", desc: "Гречка/Рис + Куриная грудка + Много овощей." },
    { time: "17:00", title: "Полдник", desc: "Пачка творога или пара яблок." },
    // В 19:00 будет слот для тренировки или прогулки
    { time: "20:30", title: "Ужин", desc: "Курица/Рыба + Овощной салат (минимум углей)." },
    { time: "23:30", title: "Отбой", desc: "Убираем телефон, готовимся ко сну." }
];

// --- ГЕНЕРАТОР РАСПИСАНИЯ НА МЕСЯЦ ---
function generateMonthSchedule() {
    const schedule = {};
    let loaderDate = new Date(START_DATE_OBJ);
    let workoutToggle = true; // true = A, false = B

    while (loaderDate <= END_DATE_OBJ) {
        const dateKey = formatDateISO(loaderDate);
        let dailyTasks = JSON.parse(JSON.stringify(BASE_MEAL_PLAN)); // Копируем шаблон
        let activitySlot = { time: "19:00", title: "Прогулка / Отдых", desc: "Ходьба 40 мин или полный отдых." };

        // Логика определения типа дня
        if (loaderDate < TRAINING_START_OBJ) {
            // Дни подготовки (19-20 янв)
            activitySlot.title = "Подготовка";
            activitySlot.desc = "Закупка еды, проверка гантелей, настрой на режим.";
        } else {
            // Считаем дни от начала тренировок для чередования
            const diffTime = loaderDate - TRAINING_START_OBJ;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays % 2 === 0) {
                // День Тренировки (четный день от старта)
                activitySlot = { 
                    time: "19:00", 
                    title: workoutToggle ? WORKOUT_A.title : WORKOUT_B.title, 
                    desc: workoutToggle ? WORKOUT_A.desc : WORKOUT_B.desc,
                    isWorkout: true
                };
                workoutToggle = !workoutToggle; // Меняем тип следующей тренировки
            } else {
                // День Отдыха
                activitySlot.title = "Восстановление";
                activitySlot.desc = "Обязательная прогулка 40-60 мин. В питание больше овощей.";
            }
        }

        // Вставляем активность в нужное место по времени
        dailyTasks.push(activitySlot);
        dailyTasks.sort((a, b) => a.time.localeCompare(b.time));

        schedule[dateKey] = dailyTasks;
        loaderDate.setDate(loaderDate.getDate() + 1); // Следующий день
    }
    return schedule;
}

const FULL_SCHEDULE = generateMonthSchedule();

// --- УПРАВЛЕНИЕ СОСТОЯНИЕМ ПРИЛОЖЕНИЯ ---
// Получаем реальную сегодняшнюю дату
const now = new Date();
now.setHours(0,0,0,0);
const REAL_TODAY_ISO = formatDateISO(now);

// Состояние приложения
let appState = {
    // Дата, которую пользователь сейчас просматривает
    viewingDateISO: REAL_TODAY_ISO,
    // Сохраненные выполненные задачи (загружаем из памяти телефона)
    tasksDoneMap: JSON.parse(localStorage.getItem('zapFitTasksDone')) || {}
};

// --- ОСНОВНЫЕ ФУНКЦИИ ---

function initApp() {
    // При запуске проверяем, не вышли ли мы за границы плана
    ensureDateBoundaries();
    renderUI();
}

// Главная функция отрисовки всего
function renderUI() {
    updateHeaderUI();
    renderTasksForViewingDate();
    updateTodayProgressBar(); // Прогресс бар всегда показывает СЕГОДНЯШНИЙ день
}

// Обновление шапки (даты и стрелок)
function updateHeaderUI() {
    const viewDateObj = new Date(appState.viewingDateISO);
    
    // Форматирование даты для заголовка
    const dateOptions = { month: 'long', day: 'numeric' };
    let dateText = viewDateObj.toLocaleDateString('ru-RU', dateOptions);
    
    // Если смотрим сегодня - добавляем пометку
    if (appState.viewingDateISO === REAL_TODAY_ISO) {
        dateText += " (Сегодня)";
    }
    
    document.getElementById('viewingDateText').textContent = dateText;
    document.getElementById('viewingDayOfWeek').textContent = viewDateObj.toLocaleDateString('ru-RU', { weekday: 'long' });

    // Блокировка стрелок на границах плана
    const prevBtn = document.getElementById('prevDayBtn');
    const nextBtn = document.getElementById('nextDayBtn');
    
    // Проверка на начало плана (сравниваем timestamps)
    prevBtn.disabled = viewDateObj.getTime() <= START_DATE_OBJ.getTime();
    // Проверка на конец плана
    nextBtn.disabled = viewDateObj.getTime() >= END_DATE_OBJ.getTime();
}

// Отрисовка списка задач
function renderTasksForViewingDate() {
    const tasksContainer = document.getElementById('tasksList');
    const statusMessage = document.getElementById('dayStatusMessage');
    tasksContainer.innerHTML = '';

    const tasks = FULL_SCHEDULE[appState.viewingDateISO];

    if (!tasks) {
        tasksContainer.innerHTML = '<div style="text-align:center; padding:20px; opacity:0.6">План на этот день не найден.</div>';
        return;
    }

    // Определение режима: "Только чтение" или "Активный"
    const isViewingToday = appState.viewingDateISO === REAL_TODAY_ISO;

    if (isViewingToday) {
        tasksContainer.classList.remove('read-only');
        statusMessage.className = 'day-status-hidden';
    } else {
        // Если смотрим не сегодня - включаем режим "только чтение"
        tasksContainer.classList.add('read-only');
        statusMessage.className = 'day-status-visible';
        // Текст статуса зависит от того, прошлое это или будущее
        statusMessage.textContent = (appState.viewingDateISO < REAL_TODAY_ISO) 
            ? "Этот день уже прошел. Изменения закрыты." 
            : "Этот день еще не наступил. Просто просмотр.";
    }

    // Генерация карточек задач
    tasks.forEach((task, index) => {
        // Уникальный ID задачи: ГГГГ-ММ-ДД_номер
        const taskId = `${appState.viewingDateISO}_${index}`;
        const isDone = appState.tasksDoneMap[taskId];

        const taskCard = document.createElement('div');
        taskCard.className = `glass-card task-card ${isDone ? 'completed' : ''}`;
        
        // Вешаем обработчик клика ТОЛЬКО если это сегодня (на всякий случай, хотя CSS pointer-events тоже блокирует)
        if (isViewingToday) {
           taskCard.onclick = () => toggleTaskStatus(taskId, taskCard);
        }

        taskCard.innerHTML = `
            <div class="task-time">${task.time}</div>
            <div class="task-details">
                <span class="task-title">${task.title}</span>
                <span class="task-desc">${task.desc}</span>
            </div>
            <div class="task-check">
                <span class="material-icons-round check-icon">done</span>
            </div>
        `;
        tasksContainer.appendChild(taskCard);
    });
}

// Обработка нажатия на задачу (работает только сегодня)
function toggleTaskStatus(taskId, cardElement) {
    // Дополнительная проверка безопасности
    if (appState.viewingDateISO !== REAL_TODAY_ISO) return;

    // Вибрация для приятного отклика (если поддерживается)
    if (navigator.vibrate) navigator.vibrate(40);

    if (appState.tasksDoneMap[taskId]) {
        // Если было выполнено - отменяем
        delete appState.tasksDoneMap[taskId];
        cardElement.classList.remove('completed');
    } else {
        // Если не выполнено - отмечаем
        appState.tasksDoneMap[taskId] = true;
        cardElement.classList.add('completed');
    }

    // Сохраняем в память телефона
    localStorage.setItem('zapFitTasksDone', JSON.stringify(appState.tasksDoneMap));
    
    // Обновляем прогресс бар
    updateTodayProgressBar();
}

// Обновление главного кольца прогресса (Всегда для REAL_TODAY_ISO)
function updateTodayProgressBar() {
    const tasksToday = FULL_SCHEDULE[REAL_TODAY_ISO];
    if (!tasksToday) return;

    let total = tasksToday.length;
    let doneCount = 0;
    
    tasksToday.forEach((_, index) => {
        if (appState.tasksDoneMap[`${REAL_TODAY_ISO}_${index}`]) {
            doneCount++;
        }
    });

    const percent = Math.round((doneCount / total) * 100);
    
    // Анимация кольца SVG
    const circle = document.getElementById('todayProgressCircle');
    // Длина окружности при радиусе 42 = 2 * PI * 42 ≈ 263.89
    const circumference = 263; 
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    // Текст и цвет
    document.getElementById('todayProgressPercent').textContent = `${percent}%`;
    const motivation = document.getElementById('motivationText');
    const progressTitle = document.getElementById('progressTitle');

    if (percent === 0) {
        motivation.textContent = "Спина ровная? Начинай день!";
        circle.style.stroke = "#0a84ff"; // Синий
    } else if (percent < 100) {
        motivation.textContent = "Процесс идет. Не останавливайся.";
        circle.style.stroke = "#0a84ff";
    } else {
        motivation.textContent = "Ты машина! План на сегодня закрыт.";
        circle.style.stroke = "#32d74b"; // Зеленый
        progressTitle.textContent = "День завершен! 🎉";
        // Запускаем конфетти только если только что закончили последнюю задачу
        // (простая реализация - если открыли приложение и уже 100%, конфетти не будет, только при клике)
    }
}

// Функция для стрелок навигации
function changeViewingDay(offset) {
    const currentViewDate = new Date(appState.viewingDateISO);
    currentViewDate.setDate(currentViewDate.getDate() + offset);
    
    // Обновляем дату просмотра в состоянии
    appState.viewingDateISO = formatDateISO(currentViewDate);
    
    // Перерисовываем интерфейс
    renderUI();
}

// Вспомогательная: Проверка, чтобы viewingDate не улетела за границы плана при старте
function ensureDateBoundaries() {
    let viewDate = new Date(appState.viewingDateISO);
    if (viewDate < START_DATE_OBJ) appState.viewingDateISO = SCHEDULE_START_STR;
    if (viewDate > END_DATE_OBJ) appState.viewingDateISO = SCHEDULE_END_STR;
}

// Вспомогательная: Форматирует дату в строку "ГГГГ-ММ-ДД" (для ключей объекта)
function formatDateISO(dateObj) {
    const offset = dateObj.getTimezoneOffset();
    dateObj = new Date(dateObj.getTime() - (offset*60*1000));
    return dateObj.toISOString().split('T')[0];
}

// --- ЗАПУСК ---
// Ждем полной загрузки страницы, чтобы на iOS все скрипты точно прогрузились
document.addEventListener('DOMContentLoaded', initApp);
