const checkFullname = () => {
  const fullname = document.getElementById("fullname").value;
  let isValid = false;

  if (fullname.length === 0) {
    document.getElementById("error-fullname").textContent =
      "* Full name is required.";
    document.getElementById("error-fullname").style.display = "block";
  } else if (!/^[A-Z]/.test(fullname)) {
    document.getElementById("error-fullname").textContent =
      "* Full name must start with a capital letter.";
    document.getElementById("error-fullname").style.display = "block";
  } else {
    document.getElementById("error-fullname").textContent = "";
    document.getElementById("error-fullname").style.display = "none";
    isValid = true;
  }

  return isValid;
};

const checkUsername = () => {
  const username = document.getElementById("username").value;
  let isValid = false;

  if (username.length === 0) {
    document.getElementById("error-username").textContent =
      "* Username is required.";
    document.getElementById("error-username").style.display = "block";
  } else if (username.length > 15) {
    document.getElementById("error-username").textContent =
      "* Invalid username.";
    document.getElementById("error-username").style.display = "block";
  } else {
    document.getElementById("error-username").textContent = "";
    document.getElementById("error-username").style.display = "none";
    isValid = true;
  }

  return isValid;
};

// const checkPassword = () => {
//   const password = document.getElementById("password").value;
//   let isValid = false;

//   if (password.length === 0) {
//     document.getElementById("error-password").textContent =
//       "* Password is required.";
//     document.getElementById("error-password").style.display = "block";
//   } else {
//     const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15}$)");
//     isValid = regex.test(password);

//     if (!isValid) {
//       document.getElementById("error-password").textContent =
//         "* Invalid password.";
//       document.getElementById("error-password").style.display = "block";
//     } else {
//       document.getElementById("error-password").textContent = "";
//       document.getElementById("error-password").style.display = "none";
//     }
//   }

//   return isValid;
// };

const checkConfirmPassword = () => {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  let isValid = false;

  if (confirmPassword.length === 0) {
    document.getElementById("error-confirm-password").textContent =
      "* Confirm password is required.";
    document.getElementById("error-confirm-password").style.display = "block";
  } else if (password !== confirmPassword) {
    document.getElementById("error-confirm-password").textContent =
      "* Passwords do not match.";
    document.getElementById("error-confirm-password").style.display = "block";
  } else {
    document.getElementById("error-confirm-password").textContent = "";
    document.getElementById("error-confirm-password").style.display = "none";
    isValid = true;
  }

  return isValid;
};

function register(event) {
  event.preventDefault();

  const isFullnameValid = checkFullname();
  const isUsernameValid = checkUsername();
  //const isPasswordValid = checkPassword();
  const isConfirmPasswordValid = checkConfirmPassword();

  if (
    isFullnameValid &&
    isUsernameValid &&
    //isPasswordValid &&
    isConfirmPasswordValid
  ) {
    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = `${username},${fullname},${password}`;

    fetch(`./register_user.php?variableName=${encodeURIComponent(userData)}`)
      .then((response) => response.text())
      .then((r) => {
        if (r === "User registered successfully") {
          document.getElementById("errorForm").textContent = "";
          window.location.href = "./home.html";
        } else {
          document.getElementById("errorForm").textContent = r;
        }
      })
      .catch((error) => {
        document.getElementById("errorForm").textContent =
          "Registration failed. Please try again.";
      });
  }
}

document.getElementById("register-btn").addEventListener("click", register);
