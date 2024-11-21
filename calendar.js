const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Get the first and last days of the current month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Get the number of days in the previous month
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    // Set the month and year in the header
    const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    monthYearElement.textContent = monthYearString;

    // Clear previous dates
    let datesHTML = '';

    // Add trailing days from the previous month
    for (let i = firstDay; i > 0; --i) {
        datesHTML += `<div class="date inactive">${prevMonthDays - i + 1}</div>`;
    }

    // Add the current month's days
    for (let i = 1; i <= totalDays; ++i) {
        const isToday = currentYear === new Date().getFullYear() &&
                        currentMonth === new Date().getMonth() &&
                        i === new Date().getDate();
        const activeClass = isToday ? 'active' : '';
        datesHTML += `<div class="date ${activeClass}">${i}</div>`;
    }

    // Add leading days from the next month to fill the row
    const nextDays = (7 - ((firstDay + totalDays) % 7)) % 7;
    for (let i = 1; i <= nextDays; ++i) {
        datesHTML += `<div class="date inactive">${i}</div>`;
    }

    // Update the dates container
    datesElement.innerHTML = datesHTML;
};

// Handle navigation
prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

// Initialize the calendar on page load
updateCalendar();
