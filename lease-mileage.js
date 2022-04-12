



const createLeaseCalcHTML = (e) => {

  e.preventDefault();

  let leaseCalcHTML = [

    '<div class="lc-ctnr">',
    '<h2>Lease Mileage Calculator</h2>',
      '<form action="" id="lc-form" class="lc-form">',
        '<div id="lc-start-date-ctr" class="lc-input-ctnr">',
          '<label for="lc-start-date">Lease Start Date</label>',
          '<input type="date" name="lc-start-date" id="lc-start-date" value="" placeholder="08/16/2021">',
        '</div>',
        '<div id="lc-duration-years-ctr" class="lc-input-ctnr">',
          '<label for="lc-duration-years">Lease Duration (years)</label>',
          '<input type="text" name="lc-duration-years" id="lc-duration-years" value="3" placeholder="3">',
        '</div>',
        '<div id="lc-miles-per-year-ctr" class="lc-input-ctnr">',
          '<label for="lc-miles-per-year">Miles Allowed Per Year</label>',
          '<input type="text" name="lc-miles-per-year" id="lc-miles-per-year" value="12000" placeholder="12000">',
        '</div>',
        '<div id="lc-current-mileage-ctr" class="lc-input-ctnr">',
          '<label for="lc-current-mileage">Current Mileage</label>',
          '<input type="text" name="lc-current-mileage" id="lc-current-mileage" value="" placeholder="25700">',
        '</div>',
        '<div id="lc-mileage-before-lease-ctr" class="lc-input-ctnr lc-input-ctnr--last">',
          '<label for="lc-mileage-before-lease">Mileage before lease start</label>',
          '<input type="text" name="lc-mileage-before-lease" id="lc-mileage-before-lease" value="12" placeholder="12">',
        '</div>',
      '<input class="lc-lease-calc-trigger lc-submit" type="submit" id="lc-submit" value="Calculate"></input>',
      '</form>',
      '<div class="lc-results">',
        '<p class="lc-miles-over-under" id="lc-miles-over-under"></p>',
        '<p class="lc-orig-miles-per-day" id="lc-orig-miles-per-day"></p>',
        '<p class="lc-adjusted-miles-per-day" id="lc-adjusted-miles-per-day"></p>',
        '<p class="lc-form-invalid-msg" id="lc-form-invalid-msg"></p>',
      '</div>',
      '<div id="lc-close" class="lc-close"></div>',
    '</div>',
  ].join('');

  let lcDarken = document.createElement('div');
  lcDarken.id = 'lc-darken';
  lcDarken.classList.add('lc-darken');
  let lcFrag = document.createDocumentFragment();
  lcDarken.innerHTML = leaseCalcHTML;
  lcFrag.appendChild(lcDarken);
  document.body.appendChild(lcFrag);

  document.getElementById('lc-start-date').addEventListener('blur', validateStartDate, false);
  document.getElementById('lc-duration-years').addEventListener('blur', validateDuration, false);
  document.getElementById('lc-miles-per-year').addEventListener('blur', validateMilesPerYear, false);
  document.getElementById('lc-current-mileage').addEventListener('blur', validateCurrentMileage, false);
  document.getElementById('lc-mileage-before-lease').addEventListener('blur', validateMileageBeforeLease, false);

  document.getElementById('lc-darken').addEventListener('click', closeLeaseMileage, false);
  document.getElementById('lc-close').addEventListener('click', closeLeaseMileage, false);

  const leaseCalcTriggers = document.getElementsByClassName('lc-lease-calc-trigger');

  for (let i = 0; i < leaseCalcTriggers.length; i++) {

    leaseCalcTriggers[i].addEventListener('click', calculateLeaseInfo);
  }
};

const leaseDisplayTriggers = document.getElementsByClassName('lc-lease-display-trigger');

for (let i = 0; i < leaseDisplayTriggers.length; i++) {

  leaseDisplayTriggers[i].addEventListener('click', createLeaseCalcHTML);
}

const validateStartDate = () => {

  const field = document.getElementById('lc-start-date');
  const fieldParent = field.parentElement;
  const val = field.value;
  const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/g;
  const isValid = regex.test(val);

  isValid ? fieldParent.classList.remove('lc-not-valid') : fieldParent.classList.add('lc-not-valid');
  
  return isValid;
};

const validateDuration = () => {

  const field = document.getElementById('lc-duration-years');
  const fieldParent = field.parentElement;
  const trimRegex = /[.,-\s]/g;
  const val = field.value.replace(trimRegex, '');
  field.value = val;
  const regex = /^[0-9]{1}$/g;
  const isValid = regex.test(val);

  isValid ? fieldParent.classList.remove('lc-not-valid') : fieldParent.classList.add('lc-not-valid');
  
  return isValid;
};

const validateMilesPerYear = () => {

  const field = document.getElementById('lc-miles-per-year');
  const fieldParent = field.parentElement;
  const trimRegex = /[.,-\s]/g;
  const val = field.value.replace(trimRegex, '');
  field.value = val;
  const regex = /^[0-9]+$/g;
  const isValid = regex.test(val);

  isValid ? fieldParent.classList.remove('lc-not-valid') : fieldParent.classList.add('lc-not-valid');
  
  return isValid;
};

const validateCurrentMileage = () => {

  const field = document.getElementById('lc-current-mileage');
  const fieldParent = field.parentElement;
  const trimRegex = /[.,-\s]/g;
  const val = field.value.replace(trimRegex, '');
  field.value = val;
  const regex = /^[0-9]+$/g;
  const isValid = regex.test(val);

  isValid ? fieldParent.classList.remove('lc-not-valid') : fieldParent.classList.add('lc-not-valid');
  
  return isValid;
};

const validateMileageBeforeLease = () => {

  const field = document.getElementById('lc-mileage-before-lease');
  const fieldParent = field.parentElement;
  const trimRegex = /[.,-\s]/g;
  const val = field.value.replace(trimRegex, '');
  field.value = val;
  const regex = /^[0-9]+$/g;
  const isValid = regex.test(val);

  isValid ? fieldParent.classList.remove('lc-not-valid') : fieldParent.classList.add('lc-not-valid');
  
  return isValid;
};


const validateForm = () => {

  const testResults = [];
  let formIsValid = true;

  testResults.push(validateStartDate());
  testResults.push(validateDuration());
  testResults.push(validateMilesPerYear());
  testResults.push(validateCurrentMileage());
  testResults.push(validateMileageBeforeLease());

  for (let i = 0; i < testResults.length; i++) {

    if (testResults[i] === false) {

      formIsValid = false;

      return formIsValid;
    }
  }
};



const calculateLeaseInfo = (e) => {

  e.preventDefault();

  const formIsValid = validateForm();

  if (false === formIsValid) {

    document.getElementById('lc-miles-over-under').innerText = '';
    document.getElementById('lc-orig-miles-per-day').innerText = '';
    document.getElementById('lc-adjusted-miles-per-day').innerText = '';

    document.getElementById('lc-form-invalid-msg').innerText = 'One or more of the form fields have been filled out incorrectly. Please follow the suggestions and then try again.';

    return;
  }

  const leaseStartDate = new Date(document.getElementById('lc-start-date').value).valueOf();
  const leaseDurationYears = parseFloat(document.getElementById('lc-duration-years').value);
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
  
  const leaseAdjustedMilesPerDayMsg = 'Given your current mileage, you can drive an average of ' + leaseAdjustedMilesPerDay.toFixed(2) + ' miles per day and return your car at your lease\'s mileage limit.';

  document.getElementById('lc-adjusted-miles-per-day').innerText = leaseAdjustedMilesPerDayMsg;

  document.getElementById('lc-form-invalid-msg').innerText = '';
};

const closeLeaseMileage = (e) => {

  const close = document.getElementById('lc-close');
  const darken = document.getElementById('lc-darken');

  if (e.target !== close && e.target !== darken) { return; }

  document.body.removeChild(document.getElementById('lc-darken'));
};