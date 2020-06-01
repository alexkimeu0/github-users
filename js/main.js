document.addEventListener("DOMContentLoaded", loadUsers);

const homeURL = "https://api.github.com/users";
let usersDiv = document.getElementById("users");
let title = document.getElementById("page-title");
let form = document.getElementById("searchForm");

form.onsubmit = function (e) {
  let searchTxt = document.getElementById("searchTxt").value;

  e.preventDefault();

  let xhr = new XMLHttpRequest();

  xhr.open("GET", `https://api.github.com/search/users?q=${searchTxt}`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      let res = JSON.parse(this.responseText);

      let users = res.items;

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
                 Profile
                 </a>
                </div>
            </div>
          `;
      }

      if (users.length > 0 && users !== undefined) {
        title.innerHTML = `Search Results for: ${searchTxt}`;
      } else {
        title.innerHTML = `No Results for: ${searchTxt}`;
      }

      usersDiv.innerHTML = output;
    }
  };

  xhr.send();
};

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
                 Profile
                 </a>
                </div>
            </div>
          `;
      }
      title.innerHTML = "First 100 Github Users:";
      usersDiv.innerHTML = output;
    }
  };

  xhr.send();
}
