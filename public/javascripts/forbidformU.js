$(document).ready(function() {
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

  var newBid = {
    'username': get_cookie("username"),
    'reason': $('#reason').val(),
    'car': $('#car').val(),
    'date': $('#date').val(),
    'time': $('#time').val(),
    'status': 'очікується'
  }
  $.getJSON('/users/userlist', function(data) {
    $.each(data, function() {
      if (this.username == get_cookie("username")) {
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
  // Use AJAX to post the object to our adduser service
  $.ajax({
    type: 'POST',
    data: newBid,
    url: '/bid/addBid',
    dataType: 'JSON'
  }).done(function(){
    alert("Заявку відправлено");
    window.location = "/bids";
  });
}

function get_cookie(cookie_name) {
  var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

  if (results)
    return (unescape(results[2]));
  else
    return null;
}
