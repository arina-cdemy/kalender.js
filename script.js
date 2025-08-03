
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
}


function getDateGerman(date) {
    let tag = date.getDate();
    let monat = date.getMonth() + 1; // weil die Monate mit 0 anfangen
    let jahr = date.getFullYear();
    if (String(tag).length == 1) {
        tag = "0" + tag; // formatieren
    }
    if (String(monat).length == 1) {
        monat = "0" + monat; // Monat im Format 01-12
    }
    return `${tag}.${monat}.${jahr}`;
}

function getWeekdayGerman(wochentag) {
    if (wochentag == 0) {
        return "Sonntag";
    } else if (wochentag == 1) {
        return "Montag";
    } else if (wochentag == 2) {
        return "Dienstag";
    } else if (wochentag == 3) {
        return "Mittwoch";
    } else if (wochentag == 4) {
        return "Donnerstag";
    } else if (wochentag == 5) {
        return "Freitag";
    } else if (wochentag == 6) {
        return "Samstag";
    }

    

function getEasterSunday(year) {    //Diese Funktion verwendet die Gaußsche Osterformel,
                                    //  um das Datum des Ostersonntags zu berechnen. Die Formel wurde von Carl Friedrich Gauß 
                                    // entwickelt und berücksichtigt die Mondphasen und den Frühlingsanfang. 
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
    const p = (h + l - 7 * m + 114) % 31;

    const day = p + 1;
    const month = n;

    return new Date(year, month - 1, day);
}

const easter2025 = getEasterSunday(2025);
console.log(easter2025)
}
