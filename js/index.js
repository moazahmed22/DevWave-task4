"use strict";
// quiery selectors
const signupForm = document.querySelector("#registration form ");
const loginForm = document.querySelector("#login form");
const errorFields = {
  userNameError: signupForm.querySelector("#userNameError"),
  emailError: signupForm.querySelector("#emailError"),
  passwordError: signupForm.querySelector("#passwordError"),
  loginEmailError: loginForm.querySelector("#emailError"),
  loginPasswordError: loginForm.querySelector("#passwordError"),
  userNotFoundError: loginForm.querySelector("#loginError"),
};
const signupFields = [
  signupForm.querySelector("#floatingName"),
  signupForm.querySelector("#signupEmail"),
  signupForm.querySelector("#signupPassword"),
];
const loginFields = [
  loginForm.querySelector("#loginEmail"),
  loginForm.querySelector("#loginPassword"),
];

//  reset form
const resetForms = (form) => {
  form.reset();
  Array.from(form.querySelectorAll("input")).forEach((input) => {
    input.classList.remove("is-valid");
    input.classList.remove("is-invalid");
  });
};

//  validate form inputs
const validateForm = (fields) => {
  let valid = false;
  let regex;
  fields.forEach((input) => {
    switch (input.id) {
      case "floatingName":
        regex = /^[a-zA-Z]{3,20}$/;
        if (regex.test(input.value)) {
          errorFields.userNameError.textContent = "";
          input.classList.add("is-valid");
          input.classList.remove("is-invalid");
        } else {
          errorFields.userNameError.textContent =
            "username not valid 'must be 3-20 characters with no spaces'";
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
        }
        break;

      case "signupEmail":
        regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (regex.test(input.value)) {
          errorFields.emailError.textContent = "";
          input.classList.add("is-valid");
          input.classList.remove("is-invalid");
        } else {
          errorFields.emailError.textContent = "email not valid";
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
        }
        break;

      case "signupPassword":
        regex = /^[a-zA-Z0-9]{8,20}$/;
        if (regex.test(input.value)) {
          errorFields.passwordError.textContent = "";
          input.classList.add("is-valid");
          input.classList.remove("is-invalid");
        } else {
          errorFields.passwordError.textContent =
            "password not valid 'must be 8-20 characters'";
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
        }
        break;

      case "loginEmail":
        regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (regex.test(input.value)) {
          errorFields.loginEmailError.textContent = "";
          input.classList.add("is-valid");
          input.classList.remove("is-invalid");
        } else {
          errorFields.loginEmailError.textContent = "email not valid";
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
        }
        break;

      case "loginPassword":
        regex = /^[a-zA-Z0-9]{8,20}$/;
        regex.test(input.value);
        if (regex.test(input.value)) {
          errorFields.loginPasswordError.textContent = "";
          input.classList.add("is-valid");
          input.classList.remove("is-invalid");
        } else {
          errorFields.loginPasswordError.textContent =
            "password not valid 'must be 8-20 characters'";
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
        }
        break;

      default:
        break;
    }
  });
  fields.some((input) => input.classList.contains("is-invalid"))
    ? (valid = false)
    : (valid = true);
  return valid;
};

// add user to the local storage
const addUser = (inputField) => {
  let emailDublicate = false;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userObject = {
    userName: inputField[0].value,
    email: inputField[1].value,
    password: inputField[2].value,
  };
  emailDublicate = users.some((user) => user.email === userObject.email);
  if (!emailDublicate) {
    users.push(userObject);
    localStorage.setItem("users", JSON.stringify(users));
    resetForms(signupForm);
  } else {
    errorFields.emailError.textContent = "email already exists";
  }
};

// query user from the local storage
const queryUser = (inputField) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userInput = {
    email: inputField[0].value,
    password: inputField[1].value,
  };
  let foundUser = null;
  users.forEach((user) => {
    if (
      user.email === userInput.email &&
      user.password === userInput.password
    ) {
      foundUser = user;
    }
  });
  foundUser
    ? (errorFields.userNotFoundError.textContent = "")
    : (errorFields.userNotFoundError.textContent =
        "email or password is incorrect");
  return foundUser;
};

// handle form submission
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = validateForm(signupFields);
  if (isValid) {
    addUser(signupFields);
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = validateForm(loginFields);
  let foundUser = null;

  if (isValid) {
    foundUser = queryUser(loginFields);
    console.log(foundUser);
  }
  if (foundUser) {
    localStorage.setItem("loggedUser", JSON.stringify(foundUser));
    window.location.href = "profile.html";
  }
});
