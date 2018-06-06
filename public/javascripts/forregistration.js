$(document).ready(function() {
  // Home
  $('#home').on('click', goHome);

  // Services
  $('#services').on('click', goServices);

  // login
  $('#login').on('click', goLogin);

  // Registrate
  $('#sendMessageButton').on('click', goRegistrate);

});

function goHome(event) {
  event.preventDefault();
  window.location = "/";
}

function goServices(event) {
  event.preventDefault();
  window.location = "/services";
}

function goLogin(event) {
  event.preventDefault();
  window.location = "/login";
}

function goRegistrate(event) {
  event.preventDefault();
  var newUser = {
    'username': $('#username').val(),
    'fullname': $('#pib').val(),
    'email': $('#email').val(),
    'number': $('#phone').val(),
    'password': $('#pass').val(),
    'address': $('#address').val(),
    'status': 'user',
    'reqcount': 0
  }
  console.log(newUser);
  // Use AJAX to post the object to our adduser service
  /*$.ajax({
    type: 'POST',
    data: newUser,
    url: '/users/adduser',
    dataType: 'JSON'
  }).done(function() {
    alert("Реєстрація успішна");
    document.cookie = "username=" + $('#_240_1').val();
    document.cookie = "status=" + "user";
    window.location = "/";
  });*/
}
