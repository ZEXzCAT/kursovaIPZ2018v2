$(document).ready(function() {
  // Home
  $('#_234').on('click', goHome);

  // Services
  $('#_235').on('click', goServices);

  // Registrate
  $('#_239').on('click', goRegistrate);

});

function goHome(event) {
  event.preventDefault();
  window.location = "/";
}

function goServices(event) {
  event.preventDefault();
  window.location = "/services";
}

function goRegistrate(event) {
  event.preventDefault();
  var newUser = {
    'username': $('#_240_1').val(),
    'fullname': $('#_240').val(),
    'email': $('#_241').val(),
    'number': $('#_242').val(),
    'password': $('#_243').val(),
    'address': $('#_243_1').val(),
    'status': 'user',
    'reqcount': 0
  }
  console.log(newUser);
  // Use AJAX to post the object to our adduser service
  $.ajax({
    type: 'POST',
    data: newUser,
    url: '/users/adduser',
    dataType: 'JSON'
  }).done(function() {
    alert("Реєстрація успішна");
    document.cookie = "username=" + $('#_240_1').val();
    document.cookie = "status=" + "user";
    window.location = "/";
  });
}
