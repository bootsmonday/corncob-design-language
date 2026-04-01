module.exports = async (page, scenario, viewport, isReference, browserContext) => {
(function (original) {
    console.log = (msg) => {
      if(
        !msg.match("Browser Console Log") &&
        !msg.match("x Close Browser") &&
        !msg.match("NEW REFERENCE FILE") &&
        !msg.match("Creating Browser") &&
        !msg.match("Browser created") &&
        !msg.match("Disposing Browser")
        ) {
          original(msg);  
} 
    };
  })(console.log);  
  if(scenario?.cookiePath){
    await require('./loadCookies')(browserContext, scenario);
  }
};
