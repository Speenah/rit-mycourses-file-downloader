var url_path = window.location.pathname;

alert(getFileName());

// Returns true if user is viewing a 
// file to download, false otherwise
function isViewingContent(url_path) {
  // if path contains "viewContent"
  if (url_path.indexOf("viewContent") > -1) {
    return true;
  }
  return false;
}

// Return name of file, no extension
function getFileName() {
  var nametag = document.getElementsByClassName('vui-heading-1')[0];
  return nametag.innerText;
}