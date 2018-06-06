$(document).ready(function() {

  // Home
  $('#home').on('click', goHome);

  // Services
  $('#services').on('click', goServices);

  // Registration
  $('#registration').on('click', goRegistration);

  // login
  $('#sendMessageButton').on('click', Login);

});

function goHome(event) {
  event.preventDefault();
  window.location = "/";
}

function goServices(event) {
  event.preventDefault();
  window.location = "/services";
}

function goRegistration(event) {
  event.preventDefault();
  window.location = "/registration";
}

function Login(event) {
  event.preventDefault();
  var username = $('#username').val();
  var password = $('#pass').val();
  var status = '';
  $.getJSON('/users/userlist', function(data) {
    // Stick our user data array into a userlist variable in the global object
    userListData = data;
    var un = false;
    var ps = false;
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      if (this.username == username) {
        un = true;
        if (this.password == password) {
          ps = true;
          status = this.status;
        }
      }
    });
    if (un) {
      if (ps) {
        document.cookie = "username=" + username;
        document.cookie = "status=" + status;
        window.location = "/";
      } else {
        alert("Невірний пароль!");
        $('#pass').val('');
      }
    } else {
      alert("Невірне ім'я користувача!");
      $('#pass').val('');
    }
  });
}
