var url_path = window.location.pathname;

alert(isViewingContent(url_path));

// Returns true if user isviewing a 
// file to download, false otherwise
function isViewingContent(url_path) {
  // if path contains "viewContent"
  if (url_path.indexOf("viewContent") > -1) {
    return true;
  }
  return false;
}