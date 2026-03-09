const loginBtn = document.getElementById("signIn");

loginBtn.addEventListener("click", function () {
  const username = document.getElementById("userName").value;
  const password = document.getElementById("passWord").value;

  if (username === "admin" && password === "admin123") {
    window.location.href = "./home.html";
  } else {
    alert("Your username or password is not valid. Please try again");
  }
});
