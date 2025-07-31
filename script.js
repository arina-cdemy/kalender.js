
window.onload = function() {
    main();
}
function main() {
    

    let tag  = new Date();
    let heute = tag.getDate(); 

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
}

const date = new Date();

document.getElementById("kalender-datum").innerText = getDateGerman(date);      

const aktuellesDatumElem = document.getElementById("aktuelles-datum");
if (aktuellesDatumElem) {
    aktuellesDatumElem.textContent = getDateGerman(date);
}

const wochentag1Elem = document.getElementById("wochentag1");
if (wochentag1Elem) {
    wochentag1Elem.innerText = getWeekdayGerman(date.getDay());
}   
const wochentag2Elem = document.getElementById ("wochentag2");
if (wochentag2Elem) {
    wochentag2Elem.innerText = getWeekdayGerman (date.getDay())
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
} // Id's sind definiert


} // hier endet die Funktion und kann durchgeführt werden  