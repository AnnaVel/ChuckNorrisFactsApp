(function(global) {  
    
	var menuDiv = "";
    var menuOpen = false;
    
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        //document.getElementById("test-button").addEventListener("click", doMenu);
        
        menuDiv = document.querySelector("#menu");
        menuDiv.style.display="none";
        
        // For devices that have a menu button.
		document.addEventListener("menubutton", doMenu, false);
    }
    
    function doMenu() {
        console.log("menu changed");
        if(menuOpen) {
    		menuDiv.style.display="none";
    		menuOpen = false;
    	} else {
    		menuDiv.style.display="block";
    		menuOpen = true;
    	}
    }
    
})(window);