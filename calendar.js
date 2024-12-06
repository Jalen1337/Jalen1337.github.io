const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const dateInput = document.getElementById('dateInput');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');

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
        const dateValue = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        datesHTML += `<div class="date ${activeClass}" data-date="${dateValue}">${i}</div>`;
    }

    // Add leading days from the next month to fill the row
    const nextDays = (7 - ((firstDay + totalDays) % 7)) % 7;
    for (let i = 1; i <= nextDays; ++i) {
        datesHTML += `<div class="date inactive">${i}</div>`;
    }

    // Update the dates container
    datesElement.innerHTML = datesHTML;

    // Add click event listeners to active dates
    document.querySelectorAll('.date:not(.inactive)').forEach(dateElement => {
        dateElement.addEventListener('click', () => {
            // Get the selected date from the data attribute
            const selectedDate = dateElement.getAttribute('data-date');

            // Update the hidden input and visible date display
            dateInput.value = selectedDate;
            selectedDateDisplay.textContent = `Selected Date: ${selectedDate}`;

            // Highlight the selected date
            document.querySelectorAll('.date.selected').forEach(el => el.classList.remove('selected'));
            dateElement.classList.add('selected');
        });
    });
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
