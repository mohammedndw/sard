const events = [
    { date: '2025-12-19', title: 'ورشة موسيقية', desc: 'ورشة لتعلم العزف على الآلات الموسيقية' },
    { date: '2025-12-12', title: 'فعالية ثقافية', desc: 'أمسية فنية ضمن فعاليات مركز سرد' },
    { date: '2025-12-20', title: 'ورشة فنية', desc: 'ورشة للرسم والفن التشكيلي' }
];

let currentDate = new Date();
const calendarGrid = document.getElementById('calendarGrid');
const eventPopup = document.getElementById('eventPopup');
const eventTitle = document.getElementById('eventTitle');
const eventDesc = document.getElementById('eventDesc');

function renderCalendar() {
    calendarGrid.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarGrid.appendChild(emptyCell);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day');
        dayCell.textContent = d;

        const fullDate = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const dayEvents = events.filter(e => e.date === fullDate);
        if (dayEvents.length) {
            const dot = document.createElement('div');
            dot.classList.add('event-dot');
            dayCell.appendChild(dot);
        }

        dayCell.addEventListener('click', () => {
            if(dayEvents.length){
                eventTitle.textContent = dayEvents[0].title;
                eventDesc.textContent = dayEvents[0].desc;
                eventPopup.classList.add('active');
            }
        });

        calendarGrid.appendChild(dayCell);
    }
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

document.getElementById('closePopup').addEventListener('click', () => {
    eventPopup.classList.remove('active');
});

renderCalendar();
