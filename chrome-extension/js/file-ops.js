////////////////////
// FILE FUNCTIONS //
////////////////////

function getDownloadLink(cookies) {
  var prefix = "https://mycourses.rit.edu";
  
  var viewer = document.getElementsByClassName("d2l-fileviewer")[0];
  var fileviewer = null;
  var dl_anchor = $("a.vui-button.d2l-button[href]")[0];
  var frame = $("iframe.d2l-iframe.d2l-iframe-offscreen.d2l-iframe-fit-user-content")[0];
  var path = "";
  
  if (viewer) {
    var divs = viewer.getElementsByTagName("div");
    
    for (var i = 0; i < divs.length; i++) {
      if (divs[i].hasAttribute("data-location")) {
        fileviewer = divs[i];
        break;
      }
    }
  }
  
  console.log("Trying to get download link directly");
  
  switch(true) {
    case (fileviewer !== null):
      console.log("Found direct link from viewer");
      path = fileviewer.getAttribute("data-location");
      break;
      
    case (dl_anchor !== undefined):
      console.log("Found direct link from download button");
      path = dl_anchor.getAttribute("href");
      break;
      
    case (frame !== undefined):
      console.log("Found direct link from iframe");
      var frame_link = frame.getAttribute("src");
      console.log("Link:  " + frame_link);
      return frame_link;
      
    default:
      return generateDownloadLink(cookies);
  }

  var path_part = path.split("?");

  var link = prefix + path_part[0] +
             "?d2lSecureSessionVal=" + 
             cookies["d2lSecureSessionVal"] + // SecureSession must be first
             "&" + path_part[1]; // incluces d2lSessionVal and ou

  console.log("Direct link: " + link);
    
  return link;
  
}

/**
 * Generates a download link (should work most of the time)
 * The only time this method should be called is when the user is 
 * viewing a Microsoft document. Microsoft documents don't have
 * the same viewer on MyCourses as every other file that has one.
 */
function generateDownloadLink(cookies) {
  console.log("Attempting to generate download link");
  
  var prefix = "https://mycourses.rit.edu/content/enforced2/";
  
  // make sure d2lSecureSession is first
  var cookie_suffix = "?d2lSecureSessionVal=" + cookies["d2lSecureSessionVal"] +
    "&" + "d2lSessionVal=" + cookies["d2lSessionVal"];
  
  // not sure why this is a parameter but including it anyway
  course_id_suffix = "&ou=" + getCourseIdNumber();
  
  var link = prefix + 
             getCourseIdNumber() + "-" + 
             getCourseLabel() + "/" + 
             getFileName().replace(/ /g, "%20") + 
             cookie_suffix + 
             course_id_suffix;
  
  console.log("Generated link: " + link);
  
  return link; 
}

// Return name of file
function getFileName() {
  var no_preview = isNoPreviewFile();
  if (no_preview) {
    return isNoPreviewFile();
  }
  
  var nametag = document.getElementsByClassName("vui-heading-1")[0];
  
  var name = nametag.innerText;
  var ext = determineExt();
  if (ext) {
    console.log("Filename: " + name + ext);
    return name + ext;
  }

  console.error("File name not found!");
}

// Returns extension as string
// Ex: .pdf
// Or empty string if it's an other file
function determineExt() {
  console.log("Determining file extension");

  // check for PDF
  var pdfs = document.getElementsByClassName("d2l-fileviewer-pdf");
  if (pdfs.length > 0) return ".pdf";
  
  // check for text docs
  var text = document.getElementsByClassName("d2l-fileviewer-text");
  if (text.length > 0) {
    data = text.getAttribute("data-location");
    var regex = /(\.\w{3,4})\?/;
    return regex.exec(data)[1];
  }
  
  var body = document.getElementsByTagName("body")[0].innerHTML;
  var pattern = /(\.docx?)\\|(.pptx?)\\/;
  var ext = pattern.exec(body);
  return ext[1];
  
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
  var regex = /([A-Z]{4}\d{4,5}\.\d{4})/;
  var title = document.getElementsByTagName("body")[0].innerText;
  var label = regex.exec(title);
  console.log("Course Label: " + label);
  return label[0];
}