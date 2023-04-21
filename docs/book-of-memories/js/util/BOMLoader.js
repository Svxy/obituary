var frpJQ = jQuery.noConflict(false);
var $ = frpJQ;

var bom = bom || {};
bom.util = bom.util || {};

(function(){
    
    function Loader(){
    }
    
    Loader.prototype = {
        loadScripts: function(scripts){
            for(var i = 0; i < scripts.length; i++) {
                frpJQ.getScript(scripts[i]);
            }
        }
    }
    bom.util.Loader = Loader;
}());

frpJQ.browser = {};
(function () {
    frpJQ.browser.msie = false;
    frpJQ.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        frpJQ.browser.msie = true;
        frpJQ.browser.version = RegExp.$1;
    }
})();
