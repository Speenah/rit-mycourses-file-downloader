////////////////////
// FILE FUNCTIONS //
////////////////////

// Returns the download link
function getDownloadLink(cookies) {
  var prefix = "https://mycourses.rit.edu/content/enforced2/";
  
  var cookie_suffix = "?";
  // d2lSecureSessionVal must come first
  cookie_suffix += "d2lSecureSessionVal=" + cookies["d2lSecureSessionVal"] +
    "&" + "d2lSessionVal=" + cookies["d2lSessionVal"];
  
  course_id_suffix = "&ou=" + getCourseIdNumber();
  
  var link = prefix + getCourseIdNumber() + "-" + getCourseLabel() + "/" + 
  getFileName().replace(/ /g, "%20") + cookie_suffix + course_id_suffix;
  return link;
}

// Return name of file, no extension
function getFileName() {
  var nametag = document.getElementsByClassName("vui-heading-1")[0];
  var no_preview = isNoPreviewFile();
  if (no_preview) {
    return no_preview;
  }
  
  var name = nametag.innerText;
  var ext = determineExt();
  
  return name + ext;
}

// Returns extension as string
// Ex: .pdf
// Or empty string if it's an other file
function determineExt() {
  var ext;
  
  if (isPDF()) {
    ext = ".pdf";
  } else if (isDOCX()) {
    ext = ".docx";
  } else if (isTXT()) {
    ext = ".txt";
  } else if (isHTML()) {
    ext = ".html";
  } else {
    ext = "";
  }
  return ext;
}

/*****************************************
 * TODO: Use regex instead of so many is...()
 *****************************************/

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

// Returns true if viewing a .txt file
function isTXT() {
  var txt = document.getElementsByClassName("d2l-fileviewer-text");
  if (txt.length == 1) {
    if (txt[0].getAttribute("data-location").indexOf(".txt") != -1) {
      return true;
    } return false;
  }
  return false;
}

function isHTML() {
  var html = document.getElementsByClassName("d2l-fileviewer-text");
  if (html.length == 1) {
    if (html[0].getAttribute("data-location").indexOf(".html") != -1) {
      return true;
    } return false;
  }
  return false;
}

// Returns file name if it is a no preview file
// Returns null otherwise
function isNoPreviewFile() {
  var div = document.getElementsByClassName("d2l-textblock d2l-textblock-strong d2l-left")[0];
  if (div) {
    return div.innerText;
  } 
  if (determineExt() === "") {
    console.error("Could not get file name!");
  }
  return null;
}

// Returns the mycourses course id number
function getCourseIdNumber() {
  return url_path.split("/")[4];
}

// Returns the mycourses course label
function getCourseLabel() {
  var regex = /\(([^)]+)\)/;
  var title = document.getElementsByClassName("d2l-navbar-title")[0].innerText;
  var label = regex.exec(title);
  return label[1];
}