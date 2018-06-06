$(document).ready(function() {

  // Populate the user table on initial page load
  populateBidTable();

  // Home
  $('#home').on('click', goHome);

  // Services
  $('#services').on('click', goServices);

  // Bids
  $('#bids').on('click', goBids);

  // log out
  $('#logout').on('click', goLogout);

  // bidform
  $('#bidform').on('click', goBidform);

  // Update status
  $('#sendMessageButton').on('click', UpStat);

});

// Fill table with data
function populateBidTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON('/bid/bidlist', function(data) {

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      if ((this.status != "відхилено") && (this.status != "очікується") && (this.status != "виконано")) {
        tableContent += '<tr>';
        tableContent += '<td>' + this._id + '</td>';
        tableContent += '<td>' + this.service + '</td>';
        tableContent += '<td>' + this.car + '</td>';
        tableContent += '<td>' + this.time + '</td>';
        tableContent += '<td>' + this.status + '</td>';
        tableContent += '</tr>';
      }
    });

    // Inject the whole content string into our existing HTML table
    $('#bidtable tbody').html(tableContent);
  });
};

function UpStat(event) {
  event.preventDefault();
  var id = false;
  var st = false;
  if ($('#bidid').val() != '') {
    id = true;
    if ($('#newstatus').val() != '') {
      st = true;
    }
  }
  if (id) {
    if (st) {
      var newData = {
        'status': $('#newstatus').val()
      }
      // Use AJAX to post the object to our adduser service
      $.ajax({
        type: 'PUT',
        data: newData,
        url: '/bid/updatebid/' + $('#bidid').val(),
      }).done(function() {
        alert("статус оновлено");
        populateBidTable();
        $('#bidid').val('');
        $('#newstatus').val('');
      });
    } else {
      alert("Введіть новий статус!");
    }
  } else {
    alert("Введіть id заявки!");
  }
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
