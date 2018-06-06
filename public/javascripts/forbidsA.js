$(document).ready(function() {

  // Populate the user table on initial page load
  populateBidsTable();

  populateDoneBidsTable();

  // Home
  $('#home').on('click', goHome);

  // Services
  $('#services').on('click', goServices);

  // Bids
  $('#bids').on('click', goBids);

  // log out
  $('#logout').on('click', goLogout);

  // Tools
  $('#tools').on('click', goTools);

  // Accept
  $('#sendMessageAccept').on('click', Accept);

  // Cancel
  $('#sendMessageCancel').on('click', Cancel);

  // Report
  $('#report').on('click', Report);

  // Check
  $('#check').on('click', Check);

});

// Fill table with data
function populateBidsTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON('/bid/bidlist', function(data) {

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      if (this.status == "очікується") {
        tableContent += '<tr>';
        tableContent += '<td>' + this._id + '</td>';
        tableContent += '<td>' + this.username + '</td>';
        tableContent += '<td>' + this.reason + '</td>';
        tableContent += '<td>' + this.car + '</td>';
        tableContent += '<td>' + this.date + '</td>';
        tableContent += '<td>' + this.time + '</td>';
        tableContent += '</tr>';
      }
    });

    // Inject the whole content string into our existing HTML table
    $('#bidstable tbody').html(tableContent);
  });
};

function populateDoneBidsTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON('/bid/bidlist', function(data) {

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      if (this.status == "виконано") {
        tableContent += '<tr>';
        tableContent += '<td>' + this._id + '</td>';
        tableContent += '<td>' + this.username + '</td>';
        tableContent += '<td>' + this.reason + '</td>';
        tableContent += '<td>' + this.service + '</td>';
        tableContent += '<td>' + this.car + '</td>';
        tableContent += '<td>' + this.date + '</td>';
        tableContent += '<td>' + this.time + '</td>';
        tableContent += '</tr>';
      }
    });

    // Inject the whole content string into our existing HTML table
    $('#donebidtable tbody').html(tableContent);
  });
};

function Accept(event) {
  event.preventDefault();
  $.getJSON('/bid/bidlist', function(data) {
    var id = false;
    $.each(data, function() {
      if (this._id == $('#bidid').val()) {
        id = true;
      }
    });
    if (id) {
      var newData = {
        'status': 'прийнято',
        'service': $('#explain').val()
      }
      // Use AJAX to post the object to our adduser service
      $.ajax({
        type: 'PUT',
        data: newData,
        url: '/bid/updatebid/' + $('#bidid').val(),
      }).done(function() {
        alert("Заявку прийнято");
        populateBidsTable();
        $('#bidid').val('');
        $('#explain').val('');
      });
    } else alert("Заявки з таким id не існує!");
  });
}

function Cancel(event) {
  event.preventDefault();
  $.getJSON('/bid/bidlist', function(data) {
    var id = false;
    $.each(data, function() {
      if (this._id == $('#bidid').val()) {
        id = true;
      }
    });
    if (id) {
      var newData = {
        'status': 'відхилено',
        'explain': $('#explain').val()
      }
      // Use AJAX to post the object to our adduser service
      $.ajax({
        type: 'PUT',
        data: newData,
        url: '/bid/updatebid/' + $('#bidid').val(),
      }).done(function() {
        alert("Заявку відхилено");
        populateBidsTable();
        $('#bidid').val('');
        $('#explain').val('');
      });
    } else alert("Заявки з таким id не існує!");
  });
}

function Report(event) {
  event.preventDefault();
  var Content = "";
  // jQuery AJAX call for JSON
  $.getJSON('/bid/bidlist', function(data) {
    var now = new Date();
    var f = false;
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      var d = parseInt(this.date[3] + this.date[4]) - 1;
      if (d == now.getMonth()) {
        Content += this._id + ' ';
        Content += this.username + ' ';
        Content += this.reason + ' ';
        Content += this.service + ' ';
        Content += this.car + ' ';
        Content += this.date + ' ';
        Content += this.time + ' ';
        Content += this.status + '\n';
      }
      f = true;
    });
    if (f) {
      var contentlist = {
        'data': Content
      }
      // Use AJAX to post the object to our adduser service
      $.ajax({
        type: 'POST',
        data: contentlist,
        url: '/bid/report', //+ $('#_223').val(),
        dataType: 'JSON'
      }).done();
      alert("Звіт створено.");
    }
  });
}

function Check(event) {
  event.preventDefault();
  var Content = "";
  var name = "";
  var serv = "";
  var price = "";
  var fullname = "";
  $.when($.getJSON('/bid/bidlist'), $.getJSON('/services/serviceslist'), $.getJSON('/users/userlist')).done(function(data1, data2, data3) {
    var id = false;
    $.each(data1[0], function() {
      if (this._id == $('#bidid').val()) {
        id = true;
        name = this.username;
        serv = this.service;
      }
    });
    if (!id) {
      alert("Заявки з таким id не існує!");
      return;
    }
    $.each(data2[0], function() {
      if (this.servicename == serv) {
        price = this.price;
      }
    });
    $.each(data3[0], function() {
      if (this.username == name) {
        fullname = this.fullname;
        if (this.reqcount >= 3)
          price = parseInt(price) * 0.9;
      }
    });
    $.each(data1[0], function() {
      if (this._id == $('#bidid').val()) {
        Content += fullname + ' ';
        Content += this.reason + ' ';
        Content += this.service + ' ';
        Content += this.car + ' ';
        Content += this.date + ' ';
        Content += this.time + ' ';
        Content += price + 'грн' + '\n';
      }
    });
    var contentlist = {
      'data': Content
    }
    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: contentlist,
      url: '/bid/check',
      dataType: 'JSON'
    }).done();
    alert("Чек створено.");
    $('#bidid').val('');
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

function goTools(event) {
  event.preventDefault();
  window.location = "/bids/tools";
}
