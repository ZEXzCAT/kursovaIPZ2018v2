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

  jQuery(function($) {
    $('#date').mask('99.99.9999');
    $('#time').mask('29:59');
  });

  // Home
  $('#home').on('click', goHome);

  // Services
  $('#services').on('click', goServices);

  // Bids
  $('#bids').on('click', goBids);

  // log out
  $('#logout').on('click', goLogout);

  // log out
  $('#sendMessageButton').on('click', goSendForm);

});

function goHome(event) {
  event.preventDefault();
  window.location = "/";
}

function goServices(event) {
  event.preventDefault();
  window.location = "/services";
}

function goBids(event) {
  event.preventDefault();
  window.location = "/bids";
}

function goLogout(event) {
  event.preventDefault();
  document.cookie = "username=" + '';
  document.cookie = "status=" + '';
  window.location = "/";
}

function goSendForm(event) {
  event.preventDefault();
  $.getJSON('/users/userlist', function(data) {
    var un = false;
    $.each(data, function() {
      if (this.username == $('#username').val()) {
        un = true;
      }
    });
    if (un) {
      var newBid = {
        'username': $('#username').val(),
        'reason': $('#reason').val(),
        'service': $('#service').val(),
        'car': $('#car').val(),
        'date': $('#date').val(),
        'time': $('#time').val(),
        'status': 'прийнято'
      }
      // Use AJAX to post the object to our adduser service
      $.ajax({
        type: 'POST',
        data: newBid,
        url: '/bid/addBid',
        dataType: 'JSON'
      }).done(function() {
        alert("Заявку відправлено");
        window.location = "/bids";
      });
    } else {
      alert("Такого користувача не існує!");
      return;
    }
    $.each(data, function() {
      if (this.username == $('#username').val()) {
        var newData = {
          'reqcount': parseInt(this.reqcount) + 1
        }
        // Use AJAX to post the object to our adduser service
        $.ajax({
          type: 'PUT',
          data: newData,
          url: '/users/updateuser/' + this._id,
        }).done();
      }
    });
  });
}
