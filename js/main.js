var url_path = window.location.pathname;

console.log("File name: " + getFileName());
console.log("Is a PDF: " + isPDF());
isDOCX();

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
  var nametag = document.getElementsByClassName("vui-heading-1")[0];
  return nametag.innerText;
}

// Returns true if viewing PDF
function isPDF() {
  var pdfs = document.getElementsByClassName("d2l-fileviewer-pdf");
  if (pdfs.length == 1) {
    return true;
  }
  return false;
}

// Returns true if viewing .docx file
// I really couldn't think of a better way to do this
function isDOCX() {
  var body = document.getElementsByTagName("body")[0].innerHTML;
  if (body.indexOf(".docx") != -1) {
    return true;
  }
  return false;
}