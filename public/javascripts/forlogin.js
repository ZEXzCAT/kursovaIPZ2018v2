$(document).ready(function() {

  // Home
  $('#_258').on('click', goHome);

  // login
  $('#_276').on('click', Login);

});

function goHome(event) {
  event.preventDefault();
  window.location = "/";
}

function Login(event) {
  event.preventDefault();
  var username = $('#_272').val();
  var password = $('#_273').val();
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
