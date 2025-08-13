const today = new Date();
let currentDate = today;
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
window.onload = function () {
  main(currentDate);
};

function updateCalendar(date) {
  getCalendarGrid();
  createCalendar(date);
  updateHolidayText(date);
  updateWeekdayNumberText(date);
  updateFormattedDateText(date);
  updateWeekdayText(date);
  updateCurrentDateInGermanText(date);
}

function getFormattedDate(date) {
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

function getGermanWeekday(weekday) {
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
    case 0:
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
  let calendarFirst = new Date(
    year,
    month,
    1 - getRestOfPrevMonth(year, month)
  );
  console.log("calendarFirst: ", calendarFirst);
  let monthLast = new Date(year, month + 1, 0);
  let calendarLast = new Date(
    year,
    month,
    monthLast.getDate() + getOverlappingDaysOfNextMonth(year, month)
  );
  console.log("calendarLast: ", calendarLast);
  for (
    let d = calendarFirst;
    d <= calendarLast;
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
  ) {
    console.log(d);
    let cell = document.createElement("div");
    cell.textContent = d.getDate();
    if (d.getMonth() !== month) {
      markAsOtherMonth(cell);
    }
    if (areDatesEqual(d, date)) {
      cell.classList.add("today");
    }
    if (isDateHoliday(d)) {
      cell.classList.add("holiday");
    }
    if (d.getDay() === 6) {
      cell.classList.add("saturday");
    } else if (d.getDay() === 0) {
      cell.classList.add("sunday");
    }
    grid.appendChild(cell);
  }

  // let prevMonthOverlap = getRestOfPrevMonth(year, month);
  // let prevMonthDays = daysInMonth(year, month - 1);
  // console.log("prevMonthDays == ", prevMonthDays);
  // let daysOfMonth = daysInMonth(year, month);
  // let nextMonthOverlap = getOverlappingDaysOfNextMonth(year, month);
  // let ncells = prevMonthOverlap + daysOfMonth + nextMonthOverlap;
  // console.log("ncells == ", ncells);
  // console.log("In blah ", prevMonthOverlap, daysOfMonth, nextMonthOverlap);
  // for (let i = 0; i < ncells; i++) {
  //   if (i < prevMonthOverlap) {
  //     let day = new Date(
  //       year,
  //       month - 1,
  //       prevMonthDays - prevMonthOverlap + 1 + i
  //     );
  //     console.log("Adding grey prev month ", day);
  //     addGreyCell(grid, day);
  //   } else if (i - prevMonthOverlap >= daysOfMonth) {
  //     const dayNumberNext = i - prevMonthOverlap - daysOfMonth + 1;
  //     let day = new Date(year, month, dayNumberNext);
  //     console.log("Adding grey next month", day);
  //     addGreyCell(grid, day);
  //   } else if (i - prevMonthOverlap + 1 === day) {
  //     console.log("Adding today");
  //     addCurrentDateCell(grid, day);
  //   } else {
  //     let day = new Date(year, month, i - prevMonthOverlap + 1);
  //     console.log("Adding normal day", i - prevMonthOverlap + 1);
  //     addNormalCell(grid, day);
  //   }
  // }
}

function areDatesEqual(datum1, datum2) {
  if (datum1.getFullYear() !== datum2.getFullYear()) return false;
  if (datum1.getMonth() !== datum2.getMonth()) return false;
  if (datum1.getDate() !== datum2.getDate()) return false;
  return true;
}

function markAsOtherMonth(newDiv) {
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
  let newContent = document.createTextNode(day.getDate());
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

function isChurchHoliday(date) {
  const easterSunday = calculateEasterSunday(date.getFullYear());
  for (let i = 0; i < churchHolidays.length; i++) {
    const r = churchHolidays[i];
    const holiday = new Date(
      easterSunday.getFullYear(),
      easterSunday.getMonth(),
      easterSunday.getDate() + r.easterOffset
    );
    console.log(holiday);
    if (
      holiday.getDate() == date.getDate() &&
      holiday.getMonth() == date.getMonth()
    )
      return true;
  }
  return false;
}
function isDateHoliday(date) {
  const day = date.getDate();
  const month = date.getMonth();
  let r = fixedHolidays.find(
    (entry) => entry.day == day && entry.month == month
  );

  if (r !== undefined) return true;
  return isChurchHoliday(date);
}

function weekOfTheMonth(date) {
  const day = date.getDate();
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

function updateWeekdayNumberText(date) {
  document.getElementById("feld1").textContent = weekOfTheMonth(date);
}

//for (let i = 0; i < days.length; i += 1) {
//const d = days[i];
//  console.log(d, weekOfTheMonth(d));

function updateHolidayText(date) {
  document.getElementById("holidayCheck").textContent = isDateHoliday(date)
    ? "ein Feiertag"
    : "kein Feiertag";
}

function updateFormattedDateText(date) {
  document.getElementById("kalender-datum").innerText = getFormattedDate(date);
  document.getElementById("aktuelles-datum").textContent =
    getFormattedDate(date);
}

function updateWeekdayText(date) {
  let wochentagGerman = getGermanWeekday(date.getDay());
  document.getElementById("wochentag1").innerText = wochentagGerman;
  document.getElementById("wochentag2").innerText = wochentagGerman;
}

function updateCurrentDateInGermanText(date) {
  const monat1Elem = document.getElementById("monat1");
  if (monat1Elem) {
    monat1Elem.innerText = monate[date.getMonth()];
  }
  document.getElementById("datum1").innerText = getFormattedDate(date);
  document.getElementById("jahr").innerText = date.getFullYear();
}

async function getData(month, day) {
  const url = `https://history.muffinlabs.com/date/${month}/${day}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function updateHistoryList(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let response = await getData(month, day);
  console.log(response.data.Events);
  let list = getHistoryEventsList();
  list[0].innerHTML = "";
  for (let i = 0; i < 5; i++) {
    let event = response.data.Events[i];
    let li = document.createElement("li");
    li.classList.add("list-item");
    li.innerHTML = `${event.year}: ${event.text}`;
    list[0].appendChild(li);
    console.log(event.year, event.text);
  }
}

function getHistoryEventsList() {
  let container = document.querySelector(".list-container");
  console.log(container);
  return container.getElementsByTagName("ul");
}

function updateDateHistory(date) {
  let day = date.getDay();
  let month = monate[date.getMonth()];

  document.getElementById("data").innerHTML = `${day}. ${month}`;
  console.log(day, month);
}

function main(date) {
  createCalendar(date);
  updateHolidayText(date);
  updateWeekdayNumberText(date);
  updateFormattedDateText(date);
  updateWeekdayText(date);
  updateCurrentDateInGermanText(date);
  updateHistoryList(date);
  updateDateHistory(date);

  document
    .getElementsByClassName("monthChangeButtons")[0]
    .addEventListener("click", () => {
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        today.getDate()
      );
      updateCalendar(currentDate);
      console.log("click -1");
    });
  document
    .getElementsByClassName("monthChangeButtons")[1]
    .addEventListener("click", () => {
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        today.getDate()
      );
      updateCalendar(currentDate);
      console.log("click +1");
    });
}
