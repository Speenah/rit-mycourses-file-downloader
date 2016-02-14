/////////////////////////////////
// Dropbox injection functions //
/////////////////////////////////

Dropbox.appKey = "8oj6dw6o6urk6wn";

function addDropboxScriptTag() {
  $("head").append('<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="8oj6dw6o6urk6wn"></script>');
}

function addDropboxButton() {
  var options = {
    success: function () {
        console.log("File saved to Dropbox");
    },
    error: function (errorMessage) {
      console.log(errorMessage);
    }
  };
  var temp = "https://mycourses.rit.edu/d2l/le/content/" +
         "585427" +
         "/topics/files/download/" +
         "3815682" +
         "/DirectFileTopicDownload";
  var button = Dropbox.createSaveButton(temp, getFileName(), options);
  $("div[class^=d2l_1] > div.d2l-left").append(button);
}