function getEasterSunday(year) {    //Diese Funktion verwendet die Gaußsche Osterformel,
                                    //  um das Datum des Ostersonntags zu berechnen. Die Formel wurde von Carl Friedrich Gauß 
    let year = getFullYear()                                // entwickelt und berücksichtigt die Mondphasen und den Frühlingsanfang. 
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
console.log(easter2025);



import {isHoliday, getHolidays} from "feiertagejs";
const today = new Date();
const isHessenHoliday = isHoliday(today, "HE")
console.log("Is heute ein Feiertag in Hessen ?" ${isHessenHoliday}`);





