document
  .getElementById("upload-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files[0];

    if (!photoFile) {
      document.getElementById("error-photo").textContent =
        "* Please select a photo to upload.";
      document.getElementById("error-photo").style.display = "block";
      return;
    }

    document.getElementById("error-photo").textContent = "";
    document.getElementById("error-photo").style.display = "none";

    const formData = new FormData();
    formData.append("photo", photoFile);

    fetch("./upload_photo.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("upload-status").textContent = data;
      })
      .catch((error) => {
        document.getElementById("upload-status").textContent =
          "Upload failed. Please try again.";
      });
  });
