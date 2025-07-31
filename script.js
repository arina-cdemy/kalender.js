// script.js
// Funktion, um das Datum im deutschen Format zu erhalten

window.onload = function() {
    main();
}

function main() {
    
    const tag  = new Date();
    const heute = tag.getDate(); 

function getDateGerman(date) {
    let tag = date.getDate();
    
    let monat = date.toLocaleDateString("de-DE", { monat: 'long'}  )
    
    let jahr = date.getFullYear();
    let wochentag = date.toLocaleDateString("de-DE", { weekday: 'long' }); // Gibt den Wochentag in Deutsch wieder
    if (String(tag).length == 1) {
        tag = "0" + tag;
    }   
    if (String(monat).length == 1) {
        monat = "0" + monat; // Monat im Format 01-12
    }
    if (String(jahr).length == 2) {
        jahr = "20" + jahr;
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
}

const date = new Date();

document.getElementById("kalender-datum").innerText = getDateGerman(date);      

const aktuellesDatumElem = document.getElementById("aktuelles-datum");
if (aktuellesDatumElem) {
    aktuellesDatumElem.innerText = getDateGerman(date);

}
const wochentagElem = document.getElementById("wochentag");
if (wochentagElem) {
    wochentagElem.innerText = getWeekdayGerman(date.getDay());
}
const wochentag2Elem = document.getElementById("wochentag2");
if (wochentag2Elem) {
    wochentag2Elem.innerText = getWeekdayGerman(date.getDay());
}
const monatElem = document.getElementById("monat1");
if (monatElem) {
    monatElem.innerText = date.getMonth() + 1;
}
const monat2Elem = document.getElementById("monat2");
if (monat2Elem) {
    monat2Elem.innerText = date.getMonth() + 1;
}
const jahrElem = document.getElementById("jahr");
if (jahrElem) {
    jahrElem.innerText = date.getFullYear();
}


console.log("Current date: " + getDateGerman(tag));
console.log(`Aktuelles Datum: ${getDateGerman(tag)}`);
}   