chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if (request.want == "cookies") {
      chrome.cookies.getAll({}, function(cookieList) {
        console.log(cookieList);
        console.log("Length: " + cookieList.length);
        sendResponse({cookies: cookieList});
      });
    }
    return true;
  });
  
