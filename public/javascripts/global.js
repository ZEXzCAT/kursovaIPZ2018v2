// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  populateUserTable();

  // Username link click
  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

  // Add User button click
  $('#btnAddUser').on('click', addUser);

  // login
  $('#btnLogIn').on('click', Login);

  // Delete User link click
  $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

  // Populate the user table on initial page load
  populateBidTable();

  // Add User button click
  $('#btnAddBid').on('click', addBid);

  $('#btnComp').on('click', comporation);

});

// Functions =============================================================

// Fill table with data
function populateUserTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON('/users/userlist', function(data) {

    // Stick our user data array into a userlist variable in the global object
    userListData = data;

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
      tableContent += '<td>' + this.email + '</td>';
      //tableContent += '<td>' + this.number + '</td>';
      //tableContent += '<td>' + this.password + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#userList table tbody').html(tableContent);
  });
};

// Show User Info
function showUserInfo(event) {

  // Prevent Link from Firing
  event.preventDefault();

  // Retrieve username from link rel attribute
  var thisUserName = $(this).attr('rel');

  // Get Index of object based on id value
  var arrayPosition = userListData.map(function(arrayItem) {
    return arrayItem.username;
  }).indexOf(thisUserName);

  // Get our User Object
  var thisUserObject = userListData[arrayPosition];

  //Populate Info Box
  $('#userInfoName').text(thisUserObject.fullname);
  $('#userInfoNumber').text(thisUserObject.number);
  $('#userInfoPassword').text(thisUserObject.password);
  $('#userInfoAge').text(thisUserObject.age);
  $('#userInfoGender').text(thisUserObject.gender);
  $('#userInfoLocation').text(thisUserObject.location);

};

// Add User
function addUser(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#addUser input').each(function(index, val) {
    if ($(this).val() === '') {
      errorCount++;
    }
  });

  // Check and make sure errorCount's still at zero
  if (errorCount === 0) {

    // If it is, compile all user info into one object
    var newUser = {
      'username': $('#addUser fieldset input#inputUserName').val(),
      'email': $('#addUser fieldset input#inputUserEmail').val(),
      'number': $('#addUser fieldset input#inputUserNumber').val(),
      'password': $('#addUser fieldset input#inputUserPassword').val(),
      'fullname': $('#addUser fieldset input#inputUserFullname').val(),
      'age': $('#addUser fieldset input#inputUserAge').val(),
      'location': $('#addUser fieldset input#inputUserLocation').val(),
      'gender': $('#addUser fieldset input#inputUserGender').val(),
      'status': 'user'
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function(response) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addUser fieldset input').val('');

        // Update the table
        populateUserTable();

      } else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  } else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};

// Login
function Login(event) {
  event.preventDefault();
  var username = $('#logIn fieldset input#inputUserName').val();
  var password = $('#logIn fieldset input#inputUserPassword').val();
  $.getJSON('/users/userlist', function(data) {
    // Stick our user data array into a userlist variable in the global object
    userListData = data;
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      if ((this.username == username) && (this.password == password)) {
        document.cookie = "username=" + this.username;
        document.cookie = "status=" + this.status;
        /*if (this.status == "user") {
          window.location = "/";
        }
        else if (this.status == "admin") {
          window.location = "/bid";
        }*/

        window.location = "/";
        console.log('ura');
      }
    });
  });
}

// Delete User
function deleteUser(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this user?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/users/deleteuser/' + $(this).attr('rel')
    }).done(function(response) {

      // Check for a successful (blank) response
      if (response.msg === '') {} else {
        alert('Error: ' + response.msg);
      }

      // Update the table
      populateUserTable();

    });

  } else {

    // If they said no to the confirm, do nothing
    return false;

  }

};

// Fill table with data
function populateBidTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON('/bid/bidlist', function(data) {

    // Stick our user data array into a userlist variable in the global object
    bidListData = data;

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
      tableContent += '<td>' + this.id + '</td>';
      tableContent += '<td>' + this.service + '</td>';
      tableContent += '<td>' + this.car + '</td>';
      tableContent += '<td>' + this.time + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#bidList table tbody').html(tableContent);
  });
};

function addBid(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#addBid input').each(function(bid, val) {
    if ($(this).val() === '') {
      errorCount++;
    }
  });

  // Check and make sure errorCount's still at zero
  if (errorCount === 0) {

    // If it is, compile all user info into one object
    var newBid = {
      'username': $('#addBid fieldset input#inputUserName').val(),
      'id': $('#addBid fieldset input#inputUserId').val(),
      'service': $('#addBid fieldset input#inputUserService').val(),
      'car': $('#addBid fieldset input#inputUserCar').val(),
      'time': $('#addBid fieldset input#inputUserTime').val(),
    }

    // Use AJAX to post the object to our addBid service
    $.ajax({
      type: 'POST',
      data: newBid,
      url: '/bid/addBid',
      dataType: 'JSON'
    }).done(function(response) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addBid fieldset input').val('');

        // Update the table
        populateBidTable();

      } else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  } else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};

function comporation() {

  // Empty content string
  var tableContent = '';
  var l1 = '';

  $.getJSON('/bid/bidlist', function(data) {
    l1 = data[0].username;
    console.log(l1);
  });

  // jQuery AJAX call for JSON
  $.getJSON('/users/userlist', function(data) {

    // Stick our user data array into a userlist variable in the global object
    userListData = data;

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      if (this.username == l1) console.log('ura');
      /*tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
      tableContent += '<td>' + this.email + '</td>';
      //tableContent += '<td>' + this.number + '</td>';
      //tableContent += '<td>' + this.password + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';*/
    });

    // Inject the whole content string into our existing HTML table
    $('#userList table tbody').html(tableContent);
  });
};
