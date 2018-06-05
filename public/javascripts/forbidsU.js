$(document).ready(function() {

  // Populate the user table on initial page load
  populateServiceTable();

  // Home
  $('#_59').on('click', goHome);

  // Services
  $('#_60').on('click', goServices);

  // Bids
  $('#_61').on('click', goBids);

  // log out
  $('#_62_1').on('click', goLogout);

  // bidform
  $('#_64').on('click', goBidform);

});

// Fill table with data
function populateServiceTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON('/bid/bidlist', function(data) {

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      if (this.username == get_cookie("username")) {
        tableContent += '<tr>';
        tableContent += '<td>' + this._id + '</td>';
        tableContent += '<td>' + this.service + '</td>';
        tableContent += '<td>' + this.car + '</td>';
        tableContent += '<td>' + this.status + '</td>';
        tableContent += '<td>' + this.explain + '</td>';
        tableContent += '</tr>';
      }
    });

    // Inject the whole content string into our existing HTML table
    $('#_65 tbody').html(tableContent);
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

function goLogout(event) {
  event.preventDefault();
  document.cookie = "username=" + '';
  document.cookie = "status=" + '';
  window.location = "/";
}

function goBidform(event) {
  event.preventDefault();
  window.location = "/bids/bidform";
}

function get_cookie(cookie_name) {
  var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

  if (results)
    return (unescape(results[2]));
  else
    return null;
}
