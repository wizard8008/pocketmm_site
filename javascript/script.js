const toggle = document.getElementById('theme-toggle');

function setTheme(isDark) {
    if (isDark) {
        document.body.style.background = '#2a2932';
        document.body.style.color = '#fffbf5';
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    } else {
        document.body.style.background = '#fffbf5';
        document.body.style.color = '#000';
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    }

    if (toggle) {
        toggle.checked = isDark;
    }
}

const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme ? savedTheme === 'dark' : true);

if (toggle) {
    toggle.addEventListener('change', () => {
        const isDark = toggle.checked;
        setTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}


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
    const fallDuration = Math.random() * 30 + 20; // длительность падения от 20 до 50 секунд
    const swayDuration = Math.random() * 8 + 5; // длительность покачивания от 5 до 13 секунд

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

// Запускаем генерацию снежинок каждые 500 мс
let snowInterval = setInterval(createSnowflake, 500);

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
        snowInterval = setInterval(createSnowflake, 500); // Включаем снова генерацию снежинок
    }
});

