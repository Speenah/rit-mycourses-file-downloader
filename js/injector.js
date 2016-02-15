/////////////////////////////////
// Dropbox injection functions //
/////////////////////////////////

Dropbox.appKey = "8oj6dw6o6urk6wn";

function addDropboxButton(cookies) {
  var options = {
    success: function () {
        console.log("File saved to Dropbox");
    },
    error: function (errorMessage) {
      console.log(errorMessage);
    }
  };
  
  var button = Dropbox.createSaveButton(getDownloadLink(cookies), 
    getFileName(), options);
  $("div[class^=d2l_1] > div.d2l-left").append(button);
}

function addDriveButton(cookies) {
  $("head").append(
    '<script src="https://apis.google.com/js/platform.js" async defer></script>'
  );
  
  var drive_div = document.createElement("div");
  
  $(drive_div).addClass("g-savetodrive vui-button d2l-button space-out");
  $(drive_div).attr({
    "role": "button",
    "data-src": getDownloadLink(cookies),
    "data-filename": getFileName(),
    "data-sitename": "RIT MyCourses"
  });
  
  $("div[class^=d2l_1] > div.d2l-left").append(drive_div);
}