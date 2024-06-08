function checkUser(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username.length === 0 || password.length === 0) {
    // Display error messages for empty fields
    if (username.length === 0) {
      document.getElementById("error-username").textContent =
        "* Username is required";
      document.getElementById("error-username").style.display = "block";
    } else {
      document.getElementById("error-username").textContent = "";
      document.getElementById("error-username").style.display = "none";
    }

    if (password.length === 0) {
      document.getElementById("error-password").textContent =
        "* Password is required.";
      document.getElementById("error-password").style.display = "block";
    } else {
      document.getElementById("error-password").textContent = "";
      document.getElementById("error-password").style.display = "none";
    }

    return; // Exit the function if fields are empty
  } else {
    document.getElementById("error-username").textContent = "";
    document.getElementById("error-username").style.display = "none";
    document.getElementById("error-password").textContent = "";
    document.getElementById("error-password").style.display = "none";
  }

  // If fields are not empty, proceed with fetching data
  let array = [username, password];
  console.log(array);
  fetch("./models/login_user.php?variableName=" + array)
    .then((response) => response.text())
    .then((data) => {
      // Handle the text response
      if (data) {
        // Successful authentication
        console.log(data);
        console.log("Authentication successful");
        document.getElementById("error-password").textContent = "";
        document.getElementById("error-password").style.display = "none";
      } else {
        // Error message
        document.getElementById("error-password").textContent =
          "Invalid username or password";
        document.getElementById("error-password").style.display = "block";
      }
    })
    .catch((error) => {
      // Handle fetch error
      console.error("There was a problem with the fetch operation:", error);
    });
}

document.getElementById("login-btn").addEventListener("click", checkUser);
