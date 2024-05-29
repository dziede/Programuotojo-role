function notification(text, title, color, icon, duration) {
    var sound = new Audio('./sound.mp3');
    sound.volume = 0.2;

    const notificationContainer = document.querySelector('.notifications-wrapper');

    const createNotificationElement = () => {
        const notification = document.createElement('div');

        sound.play();

        notification.innerHTML = `
            <div class="notify-box">
                <div class="progressbar-container">
                    <div class="progressbar"></div>
                </div>
                <div class="contents-wrapper">
                    <span class="_title">${title}</span>
                    <span class="_text">${text}</span>
                </div>
            </div>
        `;

        notification.style.opacity = 0;
        notification.style.transition = 'opacity 0.5s ease-in';

        notification.offsetHeight;

        notification.style.opacity = 1;

        return notification;
    };

    const removeNotification = (notification) => {
        notification.style.opacity = 0;

        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 500); 
    };

    const newNotification = createNotificationElement();
    notificationContainer.appendChild(newNotification);

    duration = duration || 5;
    const durationMs = duration * 1000;

    const MainProgressBar = newNotification.querySelector('.progressbar');
    MainProgressBar.innerHTML = '';

    const progressBar = new ProgressBar.Circle(MainProgressBar, {
        color: color,
        strokeWidth: 4,
        trailColor: '#777777',
        trailWidth: 4,
        duration: 1000 * duration,
        text: {
            value: '<span class="_icon ' + icon + '"></span>',
            className: 'progressbar-text'
        },

        afterCreate: (bar) => {
            const iconElement = bar.svg.querySelector('.progressbar-text');
            bar.svg.appendChild(iconElement);
        }
    });

    progressBar.animate(1);

    setTimeout(() => {
        removeNotification(newNotification);
    }, durationMs);
}

window.addEventListener('message', (event) => {
    const data = event.data;
    const styledText = applyStyling(data.text);
    notification(styledText, data.title, data.color, data.icon, data.duration);
});

function applyStyling(text) {
    return text.replace(/(~[a-zA-Z]+~)([^~]+)(~[a-zA-Z]+~)/g, (match, startMarker, content, endMarker) => {
        switch (startMarker) {
            case '~r~':
                return `<span style="color: red;">${content}</span>`;
            case '~b~':
                return `<span style="color: blue;">${content}</span>`;
            case '~g~':
                return `<span style="color: green;">${content}</span>`;
            case '~y~':
                return `<span style="color: yellow;">${content}</span>`;
            case '~m~':
                return `<span style="color: magenta;">${content}</span>`;
            case '~c~':
                return `<span style="color: cyan;">${content}</span>`;
            case '~bold~':
                return `<span style="font-weight: bold; color:#b6b9be">${content}</span>`;
            // Add more cases for other styling markers if needed :)
            default:
                return content;
        }
    });
}

