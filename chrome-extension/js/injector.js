/////////////////////////////////
// Dropbox injection functions //
/////////////////////////////////

Dropbox.appKey = "8oj6dw6o6urk6wn";

function addDropboxButton(cookies) {
  console.log("Adding Dropbox button");
  var options = {
    success: function () {
        console.log("File saved to Dropbox");
    },
    error: function (errorMessage) {
      console.error(errorMessage);
    }
  };
  
  var button = Dropbox.createSaveButton(getDownloadLink(cookies), 
    getFileName(), options);
  $("div[class^=d2l_1] > div.d2l-left").append(button);
  console.log("Dropbox button added!");
}

function addDriveButton(cookies) {
  console.log("Adding drive button");
  $("head").append(
    '<script src="https://apis.google.com/js/platform.js" async defer></script>'
  );
  
  var drive_div = document.createElement("div");
  
  $(drive_div).addClass("g-savetodrive");
  $(drive_div).attr({
    "role": "button",
    "data-src": getDownloadLink(cookies),
    "data-filename": getFileName(),
    "data-sitename": "RIT MyCourses"
  });
  
  
  // g-savetodrive removes all other classes
  var drive_style = document.createElement("span");
  $(drive_style).addClass("space-out");
  
  $(drive_style).append(drive_div);
  
  $("div[class^=d2l_1] > div.d2l-left").append(drive_style);
  console.log("Drive button added!");
}