let local = JSON.parse(localStorage.getItem("items")) || [];
function signup(e) {
  let name = document.querySelector("#name");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let ID = document.querySelector("#ID");
  let number = document.querySelector("#number");
  let nameValue = name.value;
  let emailValue = email.value;
  let passwordValue = password.value;
  let IDValue = ID.value;
  let numberValue = number.value;
  let uppercase = /[A-Z]/g;
  let lowercase = /[a-z]/g;
  let numb = /[0-9]/g;
  let obj = { nameValue, emailValue, passwordValue, IDValue, numberValue };
  document.querySelector(".fname").innerHTML = "";
  document.querySelector(".mail").innerHTML = "";
  document.querySelector(".pass").innerHTML = "";
  document.querySelector(".iduse").innerHTML = "";
  document.querySelector(".phnumber").innerHTML = "";
  if (nameValue == "") {
    document.querySelector(".fname").innerHTML = "*Enter name";
  } else if (nameValue !== "" && emailValue == "") {
    document.querySelector(".mail").innerHTML = "*Please fill in email";
  } else if (email.length == 0 && passwordValue == "") {
    document.querySelector(".pass").innerHTML = "*Please fill in password";
  } else if (nameValue.length == 0 && passwordValue.length == 0) {
    document.querySelector(".pass").innerHTML =
      "*Please fill in email and password";
  } else if (passwordValue == "") {
    document.querySelector(".pass").innerHTML = "*Enter password";
  } else if (passwordValue.length < 8) {
    document.querySelector(".pass").innerHTML = "*Min of 8";
  } else if (!passwordValue.match(numb)) {
    document.querySelector(".pass").innerHTML = "*Please add 1 number";
  } else if (!passwordValue.match(uppercase)) {
    document.querySelector(".pass").innerHTML =
      "*Please add 1 uppercase letter";
  } else if (!passwordValue.match(lowercase)) {
    document.querySelector(".pass").innerHTML =
      "*Please add 1 lowercase letter";
  } else if (IDValue == "") {
    document.querySelector(".iduse").innerHTML = "*Enter id";
  } else if (numberValue == "") {
    document.querySelector(".phnumber").innerHTML = "*Enter number";
  } else {
    local.push(obj);
    localStorage.setItem("items", JSON.stringify(local));
    alert("Your account has been created");
    window.open("./signIn.html");
  }
  e.preventDefault();
}
function signin(e) {
  e.preventDefault();
  let useremail = document.querySelector("#useremail");
  console.log(useremail);
  let userpassword = document.querySelector("#userpassword");
  console.log(userpassword);
  let user_records = new Array();
  console.log(user_records);
  console.log(user_records);
  user_records = JSON.parse(localStorage.getItem("items"))
    ? JSON.parse(localStorage.getItem("items"))
    : [];
  let userFound = local.filter((elem) => {
    return (
      elem.emailValue === useremail.value &&
      elem.passwordValue === userpassword.value
    );
  });
  if (
    user_records.some((ele) => {
      return (
        ele.emailValue == useremail.value &&
        ele.passwordValue == userpassword.value
      );
    })
  ) {
    alert("User logged in");
    current_user = user_records.filter((ele) => {
      return (
        ele.emailValue == useremail.value &&
        ele.passwordValue == userpassword.value
      );
    })[0];
    localStorage.setItem("name", current_user.nameValue);
    localStorage.setItem("email", current_user.emailValue);
    location.href = "./index.html";
  } else {
    alert("Error on login");
  }
}
document.querySelector(".sidebar-btn").addEventListener("click", function () {
  if (localStorage.getItem("name") === null) {
    window.open("./signIn.html");
  } else {
    alert("Your account has been placed");
  }
});
if (localStorage.getItem("name") === null) {
  window.open("./signIn.html");
} else {
  // alert("Your account has been placed");
  local.forEach((element) => {
    document.querySelector(
      ".user-box"
    ).innerHTML = `<p>${element.nameValue}</p>
    <button class="logout-btn">Logout</button>`;
    let button1 = document.querySelector(".logout-btn");
    button1.addEventListener("click", () => {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      window.location.href = "./index.html";
    });
  });
}
