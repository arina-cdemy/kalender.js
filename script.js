window.onload = function () {
  main();
};
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
  let year = date.getFullYear();
  let month = date.getMonth();
  let prevMonthOverlap = getRestOfPrevMonth(year, month);
  let prevMonthDays = daysInMonth(year, month - 1);
  let daysOfMonth = daysInMonth(year, month);
  let ncells =
    prevMonthOverlap + daysOfMonth + getOverlappingDaysOfNextMonth(year, month);
    console.log('ncells == ', ncells);
console.log('In blah ', prevMonthOverlap, daysOfMonth, getOverlappingDaysOfNextMonth(year, month));
  for (let i = 0; i < ncells; i++) {
    if (i < prevMonthOverlap) {
      let day = new Date(year, month, prevMonthDays - prevMonthOverlap + 1 + i);
        console.log('Adding grey', prevMonthDays - prevMonthOverlap + 1 + i);
      addGreyCell(grid, day);
    } else if (i - prevMonthOverlap > daysOfMonth) {
        console.log('Here ', i, daysOfMonth);
      let day = new Date(year, month, i - daysOfMonth);
          console.log('Adding grey', i - daysOfMonth);
      addGreyCell(grid, day);
    } else {
      let day = new Date(year, month, i - prevMonthOverlap + 1);
          console.log('Adding normal' , i - prevMonthOverlap + 1);
      addNormalCell(grid, day);
    }
  }
}

function addGreyCell(grid, day) {
  let newDiv = document.createElement("div");
  let newContent = document.createTextNode(day.getDate());
  newDiv.appendChild(newContent);
  grid.appendChild(newDiv);
  //element.classList.add("overlap");
}

function addNormalCell(grid, day) {
  let newDiv = document.createElement("div");
  let newContent = document.createTextNode(day.getDate());
  newDiv.appendChild(newContent);
  grid.appendChild(newDiv);
}

function getCalendarGrid() {

  /*let grid = document.getElementsByClassName("date-grid");
  if (!grid) {
    alert("Grid is not found");
    return null;
  }
  for (var i = 0, len = grid.length; i < len; i++) {
    grid[i].remove();
  }
  console.log(grid);
*/
  let grid = document.querySelector(".date-grid");
   if (!grid) {
    alert("Grid is not found2");

    return null;
  }
   grid.innerHTML = "";
  return grid;
}


  const fixedHolidays = [
    {holidayDate:"01.01.2025", holidayName:"Neujahr"};
    {holidayDate:"01.05.2025", holidayName:"Tag der Arbeit"};
    {holidayDate:"03.10.2025", holidayName: "Tag der Deutschen Einheit"};
    {holidayDate:"25.12.2025", holidayName: "1. Weihnachtstag"};
    {holidayDate:"26.12.2025", holidayName: "2. Weihnachtstag"};
    
  ]
  
  function isTodayHoliday(holidayArray) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() +1).padStart(2, "0");
    const day = String(today:getDate()).padStart(2, "0");
    const todayStr = `${day}.${month}.${year}`;
    const holiday = holidayArray.find(holiday => holiday.holidayDate === todayStr); 
      return holiday ? holiday.holidayName : false;
    const holidayName = isTodayHolliday(fixedHollidays);
    const holidayDate = isTodayHoliday(fixedHollidays);
    if (holidayName){
      console.log ("Heute ist ein Feiertag" + holidayDate + holidayName);
    } else {
      console.log("Heute ist kein Feiertag")
    }
    }

  }
  





function main() {
  const date = new Date();
  console.log(getRestOfPrevMonth(2025, 7));
  console.log(getOverlappingDaysOfNextMonth(2025, 7));
  getCalendarGrid();
  createCalendar(date);

  document.getElementById("kalender-datum").innerText = getDateGerman(date);

  const aktuellesDatumElem = document.getElementById("aktuelles-datum");
  if (aktuellesDatumElem) {
    aktuellesDatumElem.textContent = getDateGerman(date);
  }

  const wochentag1Elem = document.getElementById("wochentag1");
  let wochentagGerman = getWeekdayGerman(date.getDay());
  if (wochentag1Elem) {
    wochentag1Elem.innerText = wochentagGerman;
  }
  const wochentag2Elem = document.getElementById("wochentag2");
  if (wochentag2Elem) {
    wochentag2Elem.innerText = wochentagGerman;
  }
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

  const datum1Elem = document.getElementById("datum1");
  if (datum1Elem) {
    datum1Elem.innerText = getDateGerman(date);
  }
  const jahrElem = document.getElementById("jahr");
  if (jahrElem) {
    jahrElem.innerText = date.getFullYear();
  }
}
