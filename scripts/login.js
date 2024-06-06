const checkUsername = () => {
  const username = document.getElementById("username").value;
  let isValid = false;

  if (username.length === 0) {
    document.getElementById("error-username").textContent =
      "* Username is required";
    document.getElementById("error-username").style.display = "block";
  } else if (username.length > 15) {
    document.getElementById("error-username").textContent =
      "* Invalid username";
    document.getElementById("error-username").style.display = "block";
  } else {
    document.getElementById("error-username").textContent = "";
    document.getElementById("error-username").style.display = "none";
    isValid = true;
  }

  return isValid;
};

const checkPassword = () => {
  const password = document.getElementById("password").value;
  let isValid = false;

  if (password.length === 0) {
    document.getElementById("error-password").textContent =
      "* Password is required.";
    document.getElementById("error-password").style.display = "block";
  } else {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,15}$)");
    isValid = regex.test(password);

    if (!isValid) {
      document.getElementById("error-password").textContent =
        "* Invalid password";
      document.getElementById("error-password").style.display = "block";
    } else {
      document.getElementById("error-password").textContent = "";
      document.getElementById("error-password").style.display = "none";
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((r) => {
        if (r["success"]) {
          document.getElementById("errorForm").textContent = "";
          window.location.href = "./home.html";
        } else {
          document.getElementById("errorForm").textContent =
            "Invalid username or password";
        }
      });
  }
}

document.getElementById("login-btn").addEventListener("click", login);
