const d = new Date(2025, 6, 14, 0, 0); // July is month 6 (zero-based index)
const date = d.getDate();
const month = d.getMonth() + 1; // Months are zero-based in JavaScript
const year = d.getFullYear();
const formattedDate = `${date}.${month}.${year}`;


console.log(formattedDate); // Outputs: 14.7.2025

window.onload = function() {
    main();
};

function main() {
    // Your main code logic here
}

