var url_path = window.location.pathname;

if (isViewingContent(url_path)) {
  getCookies();
}

function getCookies() {
  chrome.runtime.sendMessage({want: "cookies"}, function(response) {
    addButtons(response.cookies);
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

