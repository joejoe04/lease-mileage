



const createLeaseCalcHTML = (e) => {

  e.preventDefault();

  let leaseCalcHTML = [

    '<div class="lc-ctnr">',
      '<form action="" id="lc-form" class="lc-form">',
        '<div class="lc-input-ctnr">',
          '<label for="lc-start-date">Lease Start Date (MM/DD/YYYY)</label>',
          '<input type="date" name="lc-start-date" id="lc-start-date" value="2018-03-18">',
        '</div>',
        '<div class="lc-input-ctnr">',
          '<label for="lc-duration-years">Lease Duration (years)</label>',
          '<input type="text" name="lc-duration-years" id="lc-duration-years" value="3">',
        '</div>',
        '<div class="lc-input-ctnr">',
          '<label for="lc-miles-per-year">Miles Allowed Per Year</label>',
          '<input type="text" name="lc-miles-per-year" id="lc-miles-per-year" value="12000">',
        '</div>',
        '<div class="lc-input-ctnr">',
          '<label for="lc-current-mileage">Current Mileage on Car</label>',
          '<input type="text" name="lc-current-mileage" id="lc-current-mileage" value="25740">',
        '</div>',
        '<div class="lc-input-ctnr">',
          '<label for="lc-mileage-before-lease">Miles on car before lease started</label>',
          '<input type="text" name="lc-mileage-before-lease" id="lc-mileage-before-lease" value="400">',
        '</div>',
      '<input class="lc-lease-calc-trigger" type="submit" id="lc-submit" value="Calculate"></input>',
      '</form>',
      '<div class="lc-results">',
        '<p class="lc-miles-over-under" id="lc-miles-over-under"></p>',
        '<p class="lc-orig-miles-per-day" id="lc-orig-miles-per-day"></p>',
        '<p class="lc-adjusted-miles-per-day" id="lc-adjusted-miles-per-day"></p>',
      '</div>',
      '<div class="lc-close"></div>',
    '</div>',
  ].join('');

  let lcDarken = document.createElement('div');
  lcDarken.id = 'lc-darken';
  lcDarken.classList.add('lc-darken');
  let lcFrag = document.createDocumentFragment();
  lcDarken.innerHTML = leaseCalcHTML;
  lcFrag.appendChild(lcDarken);
  document.body.appendChild(lcFrag);

  const leaseCalcTriggers = document.getElementsByClassName('lc-lease-calc-trigger');

  for (let i = 0; i < leaseCalcTriggers.length; i++) {

    leaseCalcTriggers[i].addEventListener('click', calculateLeaseInfo);
  }
};

const leaseDisplayTriggers = document.getElementsByClassName('lc-lease-display-trigger');

for (let i = 0; i < leaseDisplayTriggers.length; i++) {

  leaseDisplayTriggers[i].addEventListener('click', createLeaseCalcHTML);
}



const calculateLeaseInfo = (e) => {

  e.preventDefault();

  const leaseStartDate = new Date(document.getElementById('lc-start-date').value).valueOf();
  const leaseDurationYears = parseInt(document.getElementById('lc-duration-years').value, 10);
  const leaseTotalDays = 365 * leaseDurationYears;
  const leaseMilesPerYear = parseInt(document.getElementById('lc-miles-per-year').value, 10);
  const leaseTotalMiles = leaseMilesPerYear * leaseDurationYears;
  const origMilesPerDay = leaseTotalMiles / leaseTotalDays;

  const currentDate = (new Date()).valueOf();
  const currentMileage = parseFloat(document.getElementById('lc-current-mileage').value);
  const mileageBeforeLease = parseFloat(document.getElementById('lc-mileage-before-lease').value);
  const leaseMileageUsed = currentMileage - mileageBeforeLease;
  const leaseDaysUsed = (currentDate - leaseStartDate) / (24 * 60 * 60 * 1000);
  const leaseDaysLeft = leaseTotalDays - leaseDaysUsed;
  const leaseMileageLeft = leaseTotalMiles - leaseMileageUsed;

  const leaseMilesOnSchedule = origMilesPerDay * leaseDaysUsed;
  const milesOverUnder = leaseMileageUsed - leaseMilesOnSchedule;
  const leaseAdjustedMilesPerDay = leaseMileageLeft / leaseDaysLeft;

  let leaseMilesOverUnderMsg = '';

  if (milesOverUnder < 0) {

    leaseMilesOverUnderMsg = 'Good news! You are on pace to be under your mileage limit when your lease is up. You are currently ' + Math.abs(milesOverUnder).toFixed(2) + ' under the mileage break-even pace your lease details dictate.';
  }
  else if (milesOverUnder === 0) {

    leaseMilesOverUnderMsg = 'Congrats! You have somehow managed to drive at the exact pace set in your lease agreement.';
  }
  else {
    leaseMilesOverUnderMsg = 'Unfortunately, you have driven ' + Math.abs(milesOverUnder).toFixed(2) + ' more miles than you should have at this point. In order to end your lease under your mileage limit, adjust your average daily mileage to the value below.';
  }
  document.getElementById('lc-miles-over-under').innerText = leaseMilesOverUnderMsg;

  const origMilesPerDayMsg = 'According to the terms of your lease, you were alloted about ' + origMilesPerDay.toFixed(2) + ' miles per day on average in order to avoid going over your limit.';

  document.getElementById('lc-orig-miles-per-day').innerText = origMilesPerDayMsg;
  
  const leaseAdjustedMilesPerDayMsg = 'At this point, you can drive about an average of ' + leaseAdjustedMilesPerDay.toFixed(2) + ' miles per day and return your car at your lease\'s mileage limit.';

  document.getElementById('lc-adjusted-miles-per-day').innerText = leaseAdjustedMilesPerDayMsg;
};