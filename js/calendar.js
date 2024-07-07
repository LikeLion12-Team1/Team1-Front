const date = new Date();
const currYear = date.getFullYear(),
    currMonth = date.getMonth();

console.log(date);
console.log(currYear);
console.log(currMonth);

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

console.log(months[currMonth]);
const currentDate = document.querySelector('.current-date');
currentDate.innerHTML = `${currYear} ${months[currMonth]}`;
