document.addEventListener("DOMContentLoaded", loadUsers);

let usersDiv = document.getElementById("users");
document.getElementById("searchForm").addEventListener("submit", searchUser);

const homeURL = "https://api.github.com/users";

function loadUsers() {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", homeURL + "?page=1&per_page=100", true);

  xhr.onload = function () {
    if (this.status == 200) {
      let users = JSON.parse(this.responseText);

      //console.log(users);

      let output = "";

      for (var u in users) {
        output += `
            <div class="col-md-3">
                <div class="card card-body">
                <img src="${users[u].avatar_url}" class="img-fluid">
                <h6><strong>Username:</strong>&nbsp;${users[u].login}</h6>
               <a href="${users[u].html_url}"
                 target="_blank" class="btn btn-secondary">
                 <i class="fas fa-user-circle"></i>
                 View profile
                 </a>
                </div>
            </div>
          `;
      }
      usersDiv.innerHTML = output;
    }
  };

  xhr.send();
}

function searchUser(e) {
  let searchTxt = document.getElementById("searchTxt").value;

  e.preventDefault();

  let xhr = new XMLHttpRequest();

  xhr.open("GET", "https://api.github.com/search/users?q=" + searchTxt, true);

  xhr.onload = function () {
    if (this.status == 200) {
      let users = JSON.parse(this.responseText);
      console.log(users);

      let output = "";

      for (var u in users) {
        output += `
            <div class="col-md-3">
                <div class="card card-body">
                <img src="${users[u].avatar_url}" class="img-fluid">
                <h6>Username:&nbsp;${users[u].login}</h6>
                <h6>Profile:&nbsp;<a href="${users[u].html_url}" target="_blank">${users[u].login}</a></h6>
                </div>
            </div>
          `;
      }
      usersDiv.innerHTML = output;
    } else {
      console.log("Error");
    }
    xhr.send();
  };
}
