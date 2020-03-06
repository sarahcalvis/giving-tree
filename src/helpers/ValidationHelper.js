export const validateField = (name, value) => {
  switch (name) {
    case 'title':
      return validateTitle(value);
    case 'desc':
      return validateDesc(value);
    case 'nonprofit_name':
      return validateNonprofit(value);
    case 'address':
      return validateAddress(value);
    case 'date_deadline':
      return validateDeadline(value);
    case 'goal_amt':
      return validateGoal(value);
    case 'email':
    case 'public_email':
    case 'personal_email':
      return validateEmail(value);
    case 'public_phone':
    case 'personal_phone':
    case 'number':
      return validatePhone(value);
    case 'foundation_url':
    case 'url':
      return validateUrl(value);
    case 'name':
    case 'fname_contact':
    case 'lname_contact':
      return validateName(value);
    case 'passwordOne':
      return validatePassword(value);
    default:
      return '';
  }
}

export const confirmMatching = (passwordOne, passwordTwo) => {
  return (
    passwordOne.localeCompare(passwordTwo) !== 0 ? '*Passwords do not match.' : ''
  );
}

export const validateEmail = (email) => {
  let errorMsg = "";

  if (email === "") {
    errorMsg = "*Please enter your email.";
  }
  else if (typeof email !== "undefined") {
    //regular expression for email validation
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(email)) {
      errorMsg = "*Please enter a valid email.";
    }
  }

  return errorMsg;
}

const validateTitle = (title) => {
  let errorMsg = '';
  
  if (title === '') errorMsg = '*Please enter a grant title.';

  if (title.length > 60) errorMsg = '*Grant title must be less than 60 characters.'

  return errorMsg;
}

const validateDesc = (desc) => {
  let errorMsg = '';
  
  if (desc === '') errorMsg = '*Please enter a grant description.';

  return errorMsg;
}

const validateNonprofit = (nonprofit) => {
  let errorMsg = '';
  
  if (nonprofit === '') errorMsg = '*Please select a nonprofit or add a new one.';

  return errorMsg;
}

const validateAddress = (address) => {
  let errorMsg = '';
  
  if (address === '') errorMsg = '*Please select a grant location.';

  return errorMsg;
}

const validateDeadline = (deadline) => {
  let errorMsg = '';
  
  if (deadline === '') errorMsg = '*Please select a grant deadline.'
  
  if (parseFloat(deadline) < (new Date() / 1000)) errorMsg = '*Please choose a deadline that is in the future.'

  return errorMsg;
}

const validateGoal = (goal) => {
  let errorMsg = '';
  
  let pattern = new RegExp(/^\d+(?:\.\d{2})?$/);
  
  if (goal === '') errorMsg = '*Please enter a goal amount.';
  
  if (!pattern.test(goal)) errorMsg = '*Please enter a valid money amount.';

  if (parseFloat(goal) <= 0) errorMsg = '*Goal must be positive.';

  return errorMsg;
}

const validateName = (name) => {
  let errorMsg = "";

  if (name === "") {
    errorMsg = "*Please enter a name.";
  }

  return errorMsg;
}

const validateUrl = (url) => {
  let errorMsg = "";

  if (url === "") {
    errorMsg = "*Please enter the foundation website URL.";
  }
  else if (typeof url !== "undefined") {
    //regular expression for email validation
    var pattern = new RegExp("^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$");
    if (!pattern.test(url)) {
      errorMsg = "*Please enter a valid URL.";
    }
  }

  return errorMsg;
}

const validatePhone = (phone) => {
  let errorMsg = "";

  if (phone === "") {
    errorMsg = "*Please enter your phone number.";
  }
  else if (typeof phone !== "undefined") {
    //regular expression for email validation
    var pattern = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    if (!pattern.test(phone)) {
      errorMsg = "*Please enter a valid phone number.";
    }
  }

  return errorMsg;
}

const validatePassword = (password) => {
  let errorMsg = "";

  if (password === "") {
    errorMsg = "*Please enter your password.";
  }
  else if (typeof password !== "undefined") {
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/)) {
      errorMsg = "*Password fails the following requirements: ";

      if (!password.match(/^.{8,}$/)) {
        errorMsg += "a minimum of 8 characters";
      }
      if (!password.match(/\d/)) {
        errorMsg += ", a number";
      }
      if (!password.match(/[a-z]/)) {
        errorMsg += ", a lowercase letter";
      }
      if (!password.match(/[A-Z]/)) {
        errorMsg += ", an uppercase letter";
      }
      if (!password.match(/\W/)) {
        errorMsg += ", a special character (e.g. !@#$%^&*)";
      }

      //Fix potentially ugly string syntax
      errorMsg = errorMsg.replace(": ,", ":");
    }
  }

  return errorMsg;
}