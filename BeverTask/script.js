const loginBtn = document.getElementById("login");
const userName = document.getElementById("userName");
const password = document.getElementById("password");

loginBtn.addEventListener("click", () => {
   fetch("https://invoicesapi20210913135422.azurewebsites.net/users")
      .then(response => response.json())
      .then(data => {
         data.value.forEach(user => {
            if(userName.value === user.Name && password.value === user.Password) {
               localStorage.setItem("userName", user.Name);
               localStorage.setItem("userId", user.UserId);
               document.location.href = "user_page.html";
            }
         })
      })
});
