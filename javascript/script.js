const toggle = document.getElementById('theme-toggle');

function setTheme(isDark) {
    if (isDark) {
         document.body.style.background = 'radial-gradient(ellipse at bottom,rgb(37, 37, 37) 0%,rgb(0, 0, 0) 100%)';
        //document.body.style.background = 'radial-gradient(circle at center,rgb(110, 110, 110), #000000)';
        document.body.style.color = '#fffbf5';
    } else {
        document.body.style.background = '#fffbf5';
        document.body.style.color = '#000';
    }
    toggle.checked = isDark;
}

// Проверяем, сохранено ли предпочтение темы в localStorage
const savedTheme = localStorage.getItem('theme');

// Если предпочтение есть, применяем его, иначе по умолчанию тёмная тема
if (savedTheme) {
    setTheme(savedTheme === 'dark');
} else {
    setTheme(true);
}

toggle.addEventListener('change', () => {
    const isDark = toggle.checked;
    setTheme(isDark);
    // Сохраняем выбранную тему: 'dark' или 'light'
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// SNOW //

// SNOW //

let snowActive = localStorage.getItem('snowActive') === 'false' ? false : true; // Если в localStorage нет 'false', снег по умолчанию включен

function createSnowflake() {
    if (!snowActive) return; // Если снег выключен, не генерируем снежинки

    // Создаем контейнер для снежинки
    const container = document.createElement("div");
    container.classList.add("snowflake-container");

    // Создаем внутренний элемент снежинки
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    // Вложим снежинку в контейнер
    container.appendChild(snowflake);

    // Задаем случайные параметры
    const size = Math.random() * 8 + 4; // размер от 4px до 12px
    const leftPosition = Math.random() * window.innerWidth;
    const fallDuration = Math.random() * 20 + 10; // длительность падения от 5 до 13 секунд
    const swayDuration = Math.random() * 8 + 5; // длительность покачивания от 2 до 5 секунд

    // Применяем стили
    container.style.left = leftPosition + "px";
    container.style.animationDuration = fallDuration + "s";
    snowflake.style.width = size + "px";
    snowflake.style.height = size + "px";
    snowflake.style.animationDuration = swayDuration + "s";

    // Добавляем контейнер в документ
    document.body.appendChild(container);

    // Удаляем контейнер после завершения анимации падения
    setTimeout(() => {
        container.remove();
    }, fallDuration * 1000);
}

// Запускаем генерацию снежинок каждые 150 мс
let snowInterval = setInterval(createSnowflake, 150);

// SNOW TOGGLE //

document.getElementById('snow-toggle-input').checked = snowActive; // Устанавливаем состояние слайдера на основе сохранённого флага

document.getElementById('snow-toggle-input').addEventListener('change', function() {
    snowActive = this.checked; // Изменяем флаг на основе состояния слайдера

    // Сохраняем состояние флага в localStorage
    localStorage.setItem('snowActive', snowActive);

    // Если снег выключен, останавливаем создание снежинок
    if (!snowActive) {
        clearInterval(snowInterval); // Останавливаем создание новых снежинок
    } else {
        snowInterval = setInterval(createSnowflake, 150); // Включаем снова генерацию снежинок
    }
});

