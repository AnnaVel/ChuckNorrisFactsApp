(function(global) {  
    
    document.addEventListener("deviceready", function () {
        navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);  
        startAcceleratorWatch();
    }, false);
    
    function startAcceleratorWatch() {
        var options = { frequency: 3000 };
        watchID = navigator.accelerometer.watchAcceleration(onAcceleratorSuccess, onAcceleratorError, options);
    }
    
    function onAcceleratorSuccess(acceleration) {
        if(acceleration.x > 0 || acceleration.y > 0 || acceleration.z > 0){
            if(!document.getElementById("accelerator-notice")){
                var template = kendo.template('<h3 id="accelerator-notice"><span>No point trying to run from Chuck Norris. He can detect you are moving.</span></h3>');
                $('#tabstrip-location').append(template);     
            }
        }
        else
        {
            var element = document.getElementById("accelerator-notice");
            element.parentNode.removeChild(element);
        }
    }

    function onAcceleratorError() {
        
    }
    
    var onGeolocationSuccess = function(position){
        var template = kendo.template("<h3><span>" + "Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude + "</span></h3>");
        $('#tabstrip-location').append(template);     
    }
    
    var onGeolocationError = function(){
        var template = kendo.template("<h3><span>...Well, ok, only if you decide to tell him.</span></h3>");
        $('#tabstrip-location').append(template);     
    }
    
    CameraViewModel = kendo.data.ObservableObject.extend({
        location: "test",
        
        init: function () {
            
            
        }, 
        
    });  
    
})(window);