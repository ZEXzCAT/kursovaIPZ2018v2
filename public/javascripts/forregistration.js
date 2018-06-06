$(document).ready(function() {

  $('.required').keyup(function() {

    var empty = false;
    $('.required').each(function() {
      if ($(this).val() === '') {
        empty = true;
      }
    });

    if (empty) {
      $('#sendMessageButton').prop('disabled', true);
    } else {
      $('#sendMessageButton').prop('disabled', false);
    }
  });

  $('#email').keyup(function() {
    if ($(this).val() != '') {
      var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
      if (pattern.test($(this).val())) {
        $(this).css({
          'border': '1px solid #569b44'
        });
        $('#valid').text('Верно');
        $('#sendMessageButton').prop('disabled', false);
      } else {
        $(this).css({
          'border': '1px solid #ff0000'
        });
        $('#valid').text('Не верно');
        $('#sendMessageButton').prop('disabled', true);
      }
    } else $('#sendMessageButton').prop('disabled', false);
  });

  jQuery(function($) {
    $('#phone').mask('+38(999) 999-9999');
  });
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
  $.getJSON('/users/userlist', function(data) {
    var un = false;
    $.each(data, function() {
      if (this.username == $('#username').val()) {
        un = true;
      }
    });
    if (!un) {
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
      $.ajax({
        type: 'POST',
        data: newUser,
        url: '/users/adduser',
        dataType: 'JSON'
      }).done(function() {
        alert("Реєстрація успішна");
        document.cookie = "username=" + $('#username').val();
        document.cookie = "status=" + "user";
        window.location = "/";
      });
    } else alert("Такий користувач вже існує!");
  });
}
