const checkUsername = () => {
  const username = document.getElementById("username").value;
  let isValid = false;

  if (username.length === 0) {
    document.getElementById("error-username").textContent =
      "* полето е задължително";
  } else if (username.length > 15) {
    document.getElementById("error-username").textContent =
      "* невалидно потребителско име";
  } else {
    document.getElementById("error-username").textContent = "";
    isValid = true;
  }

  return isValid;
};

const checkPassword = () => {
  const password = document.getElementById("password").value;
  let isValid = false;

  if (password.length === 0) {
    document.getElementById("error-password").textContent =
      "* полето е задължително.";
  } else {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15}$)");
    isValid = regex.test(password);

    if (!isValid) {
      document.getElementById("error-password").textContent =
        "* невалидна парола";
    } else {
      document.getElementById("error-password").textContent = "";
    }
  }

  return isValid;
};

function login(event) {
  event.preventDefault();

  const isUsernameValid = checkUsername();
  const isPasswordValid = checkPassword();

  if (isUsernameValid && isPasswordValid) {
    const userData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    fetch("./php/Session.php", {
      method: "POST",
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((r) => {
        if (r["success"]) {
          document.getElementById("errorForm").textContent = "";
          window.location.href = "./home.html";
        } else
          document.getElementById("errorForm").textContent =
            "Невалидно потребителско име или парола";
      });
  }
}

document.getElementById("login-btn").addEventListener("click", login);
