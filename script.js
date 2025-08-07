window.onload = function () {
  main(new Date());
};

let date = new Date();

function getDateGerman(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1; // weil die Monate mit 0 anfangen
  let year = date.getFullYear();
  if (String(day).length == 1) {
    day = "0" + day; // formatieren
  }
  if (String(month).length == 1) {
    month = "0" + month; // Monat im Format 01-12
  }
  return `${day}.${month}.${year}`;
}

function getWeekdayGerman(weekday) {
  if (weekday == 0) {
    return "Sonntag";
  } else if (weekday == 1) {
    return "Montag";
  } else if (weekday == 2) {
    return "Dienstag";
  } else if (weekday == 3) {
    return "Mittwoch";
  } else if (weekday == 4) {
    return "Donnerstag";
  } else if (weekday == 5) {
    return "Freitag";
  } else if (weekday == 6) {
    return "Samstag";
  }
}

function daysInMonth(year, month) {
  switch (month + 1) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      return year % 4 === 0 && (year % 100 != 0 || year % 400 === 0) ? 29 : 28;
    default:
      return -1;
  }
}

document.getElementsByClassName("monthChangeButtons")[0].addEventListener("click", () => {
  changeDateByOneMonth()
})
document.getElementsByClassName("monthChangeButtons")[1].addEventListener("click", () => {
  changeDateByOneMonth()
})

function changeDateByOneMonth (){
  date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  main(date);
}



function getRestOfPrevMonth(year, month) {
  let date = new Date(year, month, 1);
  return (date.getDay() + 6) % 7;
}

function getOverlappingDaysOfNextMonth(year, month) {
  console.log(daysInMonth(2025, 7));
  let date = new Date(year, month, daysInMonth(year, month));
  return 6 - ((date.getDay() + 6) % 7);
}

function createCalendar(date) {
  let grid = getCalendarGrid();
  let day = date.getDate();
  let year = date.getFullYear();
  let month = date.getMonth();
  let prevMonthOverlap = getRestOfPrevMonth(year, month);
  let prevMonthDays = daysInMonth(year, month - 1);
  let daysOfMonth = daysInMonth(year, month);
  let ncells =
    prevMonthOverlap + daysOfMonth + getOverlappingDaysOfNextMonth(year, month);
  console.log("ncells == ", ncells);
  console.log(
    "In blah ",
    prevMonthOverlap,
    daysOfMonth,
    getOverlappingDaysOfNextMonth(year, month)
  );
  for (let i = 0; i < ncells; i++) {
    if (i < prevMonthOverlap) {
      let day = new Date(year, month, prevMonthDays - prevMonthOverlap + 1 + i);
      console.log("Adding grey", prevMonthDays - prevMonthOverlap + 1 + i);
      addGreyCell(grid, day);
    } else if (i - prevMonthOverlap > daysOfMonth) {
      console.log("Here ", i, daysOfMonth);
      let day = new Date(year, month, i - daysOfMonth);
      console.log("Adding grey", i - daysOfMonth);
      addGreyCell(grid, day);
    } else if (i - prevMonthOverlap + 1 === day) {
      console.log("Adding today");
      addCurrentDateCell(grid, day);
    } else {
      let day = new Date(year, month, i - prevMonthOverlap + 1);
      console.log("Adding normal", i - prevMonthOverlap + 1);
      addNormalCell(grid, day);
    }
  }
}

function addGreyCell(grid, day) {
  let newDiv = document.createElement("div");
  let newContent = document.createTextNode(day.getDate());

  newDiv.appendChild(newContent);
  grid.appendChild(newDiv);

  newDiv.classList.add("overlap");
}

function addNormalCell(grid, day) {
  let newDiv = document.createElement("div");
  let newContent = document.createTextNode(day.getDate());
  newDiv.appendChild(newContent);
  grid.appendChild(newDiv);
}

function addCurrentDateCell(grid, day) {
  console.log("Today");
  let newDiv = document.createElement("div");
  newDiv.classList.add("today");
  let newContent = document.createTextNode(day);
  newDiv.appendChild(newContent);
  grid.appendChild(newDiv);
}

function getCalendarGrid() {
  let grid = document.querySelector(".date-grid");
  if (!grid) {
    alert("Grid is not found2");

    return null;
  }
  grid.innerHTML = "";
  return grid;
}

const fixedHolidays = [
  { day: 1, month: 0, holidayName: "Neujahr" },
  { day: 1, month: 4, holidayName: "Tag der Arbeit" },
  { day: 1, month: 9, holidayName: "Tag der Deutschen Einheit" },
  { day: 25, month: 11, holidayName: "1. Weihnachtstag" },
  { day: 26, month: 11, holidayName: "2. Weihnachtstag" },
  { day: 7, month: 7, holidayName: "Andres Geburtstag" },
];

const churchHolidays = [
  { easterOffset: 39, holidayName: "Christi Himmelfahrt" },
];

// Calculate Easter Sunday using the Spencer algorithm.
function calculateEasterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = Math.floor((h + l - 7 * m + 114) / 31);
  const o = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, n - 1, o);
}

function isChurchHoliday() {
  const today = new Date();
  const easterSunday = calculateEasterSunday(today.getFullYear());
  for (let i = 0; i < churchHolidays.length; i++) {
    const r = churchHolidays[i];
    const holiday = new Date(
      easterSunday.getFullYear(),
      easterSunday.getMonth(),
      easterSunday.getDate() + r.easterOffset
    );
    console.log(holiday);
    if (
      holiday.getDate() == today.getDate() &&
      holiday.getMonth() == today.getMonth()
    )
      return true;
  }
  return false;
}
function isTodayHoliday() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  let r = fixedHolidays.find(
    (entry) => entry.day == day && entry.month == month
  );

  if (r !== undefined) return true;
  return isChurchHoliday();
}

function weekOfTheMonth(date) {
  const day = date.getDate();
  const weekDay = date.getDay();
  let week = Math.ceil(day / 7);

  const ordinal = [
    "erste",
    "zweite",
    "dritte",
    "vierte",
    "fünfte",
    "sechste",
    "siebte",
  ];
  // Check the next day of the week and if it' on the same month, if not, respond with "Last"
  const nextWeekDay = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 7);
  if (nextWeekDay.getMonth() !== date.getMonth()) {
    week = 5;
  }
  return `${ordinal[week - 1]}`;
}
const days = [new Date("2021-05-14"), new Date("26 July 2010")];

for (let i = 0; i < days.length; i += 1) {
  const d = days[i];
  console.log(d, weekOfTheMonth(d));
}




function main(date) {

  console.log(getRestOfPrevMonth(2025, 7));
  console.log(getOverlappingDaysOfNextMonth(2025, 7));
  getCalendarGrid();
  createCalendar(date);
  weekOfTheMonth(date);
  isTodayHoliday();


  document.getElementById("holidayCheck").textContent = isTodayHoliday()
    ? "ein Feiertag"
    : "kein Feiertag";
  document.getElementById("feld1").textContent = weekOfTheMonth(date);

  isChurchHoliday();
  console.log(calculateEasterSunday(date.getFullYear()));

  document.getElementById("kalender-datum").innerText = getDateGerman(date);

  document.getElementById("aktuelles-datum").textContent = getDateGerman(date);

  let wochentagGerman = getWeekdayGerman(date.getDay());
  document.getElementById("wochentag1").innerText = wochentagGerman;
  document.getElementById("wochentag2").innerText = wochentagGerman;

  const monat1Elem = document.getElementById("monat1");
  if (monat1Elem) {
    const monate = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];
    monat1Elem.innerText = monate[date.getMonth()];
  }

  document.getElementById("datum1").innerText = getDateGerman(date);

  document.getElementById("jahr").innerText = date.getFullYear();
}
