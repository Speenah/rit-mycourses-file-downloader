chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.want == "cookies") {
      chrome.cookies.getAll({}, function(cookieList) {
        var cookies = {};
        var wanted_cookies = ["d2lSessionVal", "d2lSecureSessionVal"];
        
        for (var i in cookieList) {
          if (wanted_cookies.indexOf(cookieList[i].name) > -1) {
            cookies[cookieList[i].name] = cookieList[i].value;
          }
        }
        
        sendResponse({cookies: cookies});
      });
    }
    return true;
  });
  
