$(document).ready(function() {

  // Populate the user table on initial page load
  populateServiceTable();

  // Home
  $('#_126').on('click', goHome);

  // Services
  $('#_127').on('click', goServices);

  // Bids
  $('#_128').on('click', goBids);

  // log out
  $('#_129').on('click', goLogout);

  // bidform
  $('#_131').on('click', goBidform);

  // Update status
  $('#_226').on('click', UpStat);

});

// Fill table with data
function populateServiceTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON('/bid/bidlist', function(data) {

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      if (this.status == "прийнято") {
        tableContent += '<tr>';
        tableContent += '<td>' + this._id + '</td>';
        tableContent += '<td>' + this.service + '</td>';
        tableContent += '<td>' + this.car + '</td>';
        tableContent += '<td>' + this.time + '</td>';
        tableContent += '</tr>';
      }
    });

    // Inject the whole content string into our existing HTML table
    $('#_132 tbody').html(tableContent);
  });
};

function UpStat(event) {
  event.preventDefault();
  var newData = {
    'status': $('#_225').val()
  }
  // Use AJAX to post the object to our adduser service
  $.ajax({
    type: 'PUT',
    data: newData,
    url: '/bid/updatebid/' + $('#_223').val(),
  }).done(function(){
    alert("статус оновлено");
    populateServiceTable();
    $('#_223').val('');
    $('#_225').val('');
  });
}

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
