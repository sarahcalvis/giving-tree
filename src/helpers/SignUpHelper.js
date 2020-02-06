
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

export const validatePassword = (password) => {
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

export const confirmMatching = (passwordOne, passwordTwo) => {
    return (
        passwordOne.localeCompare(passwordTwo) !== 0 ? '*Passwords do not match.' : ''
    );
}