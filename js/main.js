var url_path = window.location.pathname;

/*
console.log("Is viewing content: " + isViewingContent(url_path));
console.log("File name: " + getFileName());
console.log("Is a PDF: " + isPDF());
console.log("Is a DOCX: " + isDOCX());
console.log("Is a TXT: " + isTXT());
console.log("Course ID Number: " + getCourseIdNumber());
console.log("Course Label: " + getCourseLabel());
console.log("Download link: " + getDownloadLink());
*/

if (isViewingContent(url_path)) {
  //addDropboxScriptTag();
  //addDropboxButton();
  getCookies();
}

function getCookies() {
  chrome.runtime.sendMessage({want: "cookies"}, function(response) {
    console.log(response.cookies);
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

