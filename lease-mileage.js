const leaseStartDate = (new Date(2018,03,18)).valueOf();
const totalLeaseDays = 365 * 3;
const totalLeaseMiles = 12000 * 3;
const milesPerDayAllowed = totalLeaseMiles / totalLeaseDays;

const currentDate = (new Date()).valueOf();
const leaseMilesUsed = (prompt('Current Mileage?') - 400);
const leaseDaysUsed = (currentDate - leaseStartDate) / (24 * 60 * 60 * 1000);
const leaseDaysLeft = totalLeaseDays - leaseDaysUsed;
const leaseMilesLeft = totalLeaseMiles - leaseMilesUsed;

const targetLeaseMiles = milesPerDayAllowed * leaseDaysUsed;
const milesOverLimit = leaseMilesUsed - targetLeaseMiles;
const milesPerDayAdjusted = leaseMilesLeft / leaseDaysLeft;

console.log(totalLeaseMiles / totalLeaseDays)
console.log("Miles over limit to date: " + milesOverLimit);
console.log("Adjusted allowed miles per day: " + milesPerDayAdjusted);