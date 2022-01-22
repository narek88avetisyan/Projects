const loginBtn = document.getElementById("login");
const userName = document.getElementById("userName");
const password = document.getElementById("password");

async function getUsers() {
   return await fetch("https://invoicesapi20210913135422.azurewebsites.net/users")
                  .then(response => response.json())
                  .then(data => data.value)
}

loginBtn.addEventListener("click", () => {
   getUsers().then(users => {
      let isNotLogin = true;
      users.forEach(user => {
         if(userName.value === user.Name && password.value === user.Password) {
            localStorage.setItem("userName", user.Name);
            localStorage.setItem("userId", user.UserId);
            isNotLogin = false;
            document.location.href = "product_page.html";
         }
      });
      if(isNotLogin) {
         alert("Incorrect login or password");
      }
   })
});
