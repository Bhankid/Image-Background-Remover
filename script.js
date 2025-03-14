let imageURL;

document.getElementById("file").addEventListener("change", async function () {
  const fileInput = document.getElementById("file");
  const image = fileInput.files[0];

  document.querySelector(".custom-file-upload").style.display = "none";
  document.querySelector(".p").style.display = "none";
  document.querySelector(".removing").style.display = "";

  // Multipart file
  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");

  const apiKey = "TTgsrzdurPdLNWJsYdyBzdpL";

  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: formData,
  })
    .then(function (response) {
      return response.blob();
    })
    .then(function (blob) {
      const url = URL.createObjectURL(blob);
      imageURL = url;
      const resultImage = document.getElementById("resultImage");
      resultImage.src = url;
      document.querySelector(".removing").style.display = "none";
      document.querySelector(".result").style.display = "";
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert(
        "Failed to remove background. Please Check the Internet Connection"
      );
    });
});

function downloadFile() {
  if (!imageURL) {
    alert("No image to download!");
    return;
  }
  var a = document.createElement("a");
  a.href = imageURL;
  a.download = "background_removed_image.png";
  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
}
