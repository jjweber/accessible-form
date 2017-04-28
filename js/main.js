// Creating variables
const submit = document.querySelector('button');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const passField = document.querySelector('#password');

// No validations needed. Only storing for resetting
const phoneField = document.querySelector('#phone');
const countryDropdown = document.querySelector('#country');

var error = document.querySelector('.error');

// Creating function that passes each input to my clearfield function and resets the form.
function resetform() {
  clearField(nameField);
  clearField(emailField);
  clearField(passField);
  clearField(phoneField);

  // Will reset dropdown for country to default
  countryDropdown.selectedIndex = null;
}

// Creating function that takes in an input and resets it to null or default
function clearField(input) {
  input.value = '';
}

// Creating my validity class

class CheckValidity {
  constructor(input, type) {
    this.input = input;
    this.type = type;
    this.errors = [];
  };

  // Creating function to give me the current number of errors.
  currentErrorCount() {
    return this.errors.length;
  }

  // Creating function to push my messages to the errors array
  addError(message) {
    this.errors.push(message);
  };

  // Creating error messages
  getMessages() {
    const status = this.input.validity;

    if (status.valueMissing) {
      this.addError('This field is required to submit');
    }

    if (status.typeMismatch) {
      this.addError('Entry does not match the field type');
    }

    if (status.tooLong) {
      this.addError('Entry is too long');
    }

    // Modified message to show the remaining number of letters needed to validate.
    if (status.tooShort) {
      let minLength = this.input.minLength;
      let currentInputLength = this.input.value.length;
      let charsNeededForMin = minLength - currentInputLength;
      let errorText = charsNeededForMin + " more characters needed. ";

      if(this.type == "password") {
        errorText += "Password must be 8 characters";
      }
      else {
        errorText += "Entry is too short";
      }

      this.addError(errorText);
    }

    if (this.type == "name" && !this.input.value.match(/[A-Z]/g)) {
      this.addError('Must contain at least one uppercase letter');
    }

    if (this.type == "password" && !this.input.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)) {
      this.addError('Must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character');
    }

    if (this.type == "password" && this.input.value == "password") {
      this.addError('Password cannot be "password"');
    }

    if (this.type == "phone") {

    }

    return this.errors;
  }

};


function validateField(input, type) {
  let validateName = new CheckValidity(input, type);

  let errorElements = input.parentNode.getElementsByClassName("error");
  let errorMessages = validateName.getMessages();
  let currentErrorCount = errorElements.length;

  // Keep removing error elements until they are all gone. Only want 1 showing
  while (errorElements.length > 0) {
    errorElements[0].parentNode.removeChild(errorElements[0]);
  }

  errorMessages.forEach( (err) => {
    input.insertAdjacentHTML('afterend', '<p class="error">' + err + '</p>');
  });
}

function showRulesForField(input, type) {
  //let fieldRules
  //input.insertAdjacentHTML('afterend', '<p class="rules">' + err + '</p>');
}

// Setting up my event listeners

// nameField events
nameField.addEventListener("keyup", (event) => {
  validateField(nameField, "name");
}, false);

/*nameField.addEventListener("focus", (event) => {
  console.log("Show rules for this field..");
  showRulesForField(nameField, "name");
}, false);*/


// emailField events
emailField.addEventListener("keyup", (event) => {
  validateField(emailField, "email");
}, false);


// passField events
passField.addEventListener("keyup", (event) => {
  validateField(passField, "password");
}, false);


function checkForValidForm() {
  let validForm = true;

  // force validation on each of the fields
  validateField(nameField, "name");
  validateField(emailField, "email");
  validateField(passField, "password");

  let errorElements = document.getElementsByClassName("error");
  if(errorElements.length) validForm = false;

  return validForm;
}

// Set up submit listener
submit.addEventListener("click", (event) => {
  event.preventDefault(); // this will stop the standard form submission.

  if (checkForValidForm()) {
    // returns true if the form was valid
    alert("Form Submitted. Reseting form.");
    resetform();
  }

});
