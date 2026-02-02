import { useState, useEffect } from 'react'
import '../styles/calendar.css'

const events = [
  { date: '2025-12-19', title: 'ورشة موسيقية', desc: 'ورشة لتعلم العزف على الآلات الموسيقية' },
  { date: '2025-12-12', title: 'فعالية ثقافية', desc: 'أمسية فنية ضمن فعاليات مركز سرد' },
  { date: '2025-12-20', title: 'ورشة فنية', desc: 'ورشة للرسم والفن التشكيلي' }
]

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ]

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`}></div>)
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const dayEvents = events.filter(e => e.date === fullDate)
    
    days.push(
      <div 
        key={d} 
        className={`day ${dayEvents.length ? 'has-event' : ''}`}
        onClick={() => dayEvents.length && setSelectedEvent(dayEvents[0])}
      >
        {d}
        {dayEvents.length > 0 && <div className="event-dot"></div>}
      </div>
    )
  }

  return (
    <section className="calendar-section" style={{ paddingTop: '100px' }}>
      <h2>التقويم</h2>
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth} id="prevMonth">&lt;</button>
          <span>{monthNames[month]} {year}</span>
          <button onClick={nextMonth} id="nextMonth">&gt;</button>
        </div>
        <div className="calendar-grid" id="calendarGrid">
          {days}
        </div>
      </div>

      {selectedEvent && (
        <div className="event-popup active" id="eventPopup">
          <h3 id="eventTitle">{selectedEvent.title}</h3>
          <p id="eventDesc">{selectedEvent.desc}</p>
          <button id="closePopup" onClick={() => setSelectedEvent(null)}>إغلاق</button>
        </div>
      )}
    </section>
  )
}

export default Calendar
