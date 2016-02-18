var url_path = window.location.pathname;

if (isViewingContent(url_path)) {
  getCookies();
}

function getCookies() {
  chrome.runtime.sendMessage({want: "cookies"}, function(response) {
    console.log("Cookie values: " + response.cookies);
    console.log("Download URL: " + getDownloadLink(response.cookies));
    console.log("File name: " + getFileName());
    console.log("Extension (check js comments): " + determineExt());
    console.log("Course ID: " + getCourseIdNumber());
    console.log("Course Label: " + getCourseLabel());
    addDriveButton(response.cookies);
    addDropboxButton(response.cookies);
  });
}

// Returns true if user is viewing a 
// file to download, false otherwise
function isViewingContent(url_path) {
  // if path contains "viewContent"
  if (url_path.indexOf("viewContent") > -1) {
    return true;
  }
  return false;
}

