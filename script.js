
window.onload = function () {
    main();
}

function main() {
    const date = new Date();

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
            "Januar", "Februar", "März", "April", "Mai", "Juni",
            "Juli", "August", "September", "Oktober", "November", "Dezember"
        ]; // Ein Array für die Namen der Monate als Strings
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


function daysInMonth (month, year) {
    switch (month) {
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
            return (year % 4 ===0 && (year % 100 != 0 || year % 400 ===0)) ? 29: 28;
        default:
            return -1;

    }

}

function getNthWeekdayInMonth(year, month, weekday, occurrence) {
    // weekday: 0 = Sunday, 1 = Monday, etc.
    // occurrence: 1 = first, 2 = second, etc.
    
    const firstDay = new Date(year, month - 1, 1);
    const firstWeekday = firstDay.getDay();
    
    // Calculate the first occurrence of the target weekday
    let firstOccurrence = 1 + (weekday - firstWeekday + 7) % 7;
    
    // Calculate the Nth occurrence
 /* The line `const nthOccurrence = firstOccurrence + (occurrence - 1) * 7;` is calculating the date of
 the Nth occurrence of a specific weekday in a given month. */
    const nthOccurrence = firstOccurrence + (occurrence - 1) * 7;
    
    // Check if the date exists in the month
    const daysInMonth = new Date(year, month, 0).getDate();
    if (nthOccurrence <= daysInMonth) {
        return nthOccurrence;
    } else {
        return null; // Nth occurrence doesn't exist in this month
    }
    }
    


}

