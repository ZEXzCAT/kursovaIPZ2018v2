$(document).ready(function() {
  // Home
  $('#home').on('click', goHome);

  // Services
  $('#services').on('click', goServices);

  // Bids
  $('#bids').on('click', goBids);

  // login
  $('#login').on('click', goLogin);

  // Registration
  $('#registration').on('click', goRegistration);

  // log out
  $('#logout').on('click', goLogout);

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

function goLogin(event) {
  event.preventDefault();
  window.location = "/login";
}

function goLogout(event) {
  event.preventDefault();
  document.cookie = "username=" + '';
  document.cookie = "status=" + '';
  window.location = "/";
}

function goRegistration(event) {
  event.preventDefault();
  window.location = "/registration";
}
