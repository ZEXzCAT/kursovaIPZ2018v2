$(document).ready(function() {

  // Populate the user table on initial page load
  populateServiceTable();

  // Home
  $('#home').on('click', goHome);

  // Services
  $('#services').on('click', goServices);

  // Bids
  $('#_22_1').on('click', goBids);

  // login
  $('#_23').on('click', goLogin);

  // Registration
  $('#_24').on('click', goRegistration);

  // log out
  $('#_24_1').on('click', goLogout);

});

// Fill table with data
function populateServiceTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON('/services/serviceslist', function(data) {

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      tableContent += '<tr>';
      tableContent += '<td>' + this.servicename + '</td>';
      tableContent += '<td>' + this.review + '</td>';
      tableContent += '<td>' + this.time + '</td>';
      tableContent += '<td>' + this.price + '</td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#servicetable tbody').html(tableContent);
  });
};

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
