(function(global) {  
    var RandomViewModel,
        app = global.app = global.app || {};
    
    RandomViewModel = kendo.data.ObservableObject.extend({
        randomDataSource: null,
        dataSource: null,
        
        init: function () {
            var that = this;
            
            var rawdata;
            $.get("data/joke.json", function(data) {
                rawdata = data;
                 
                var allJokes = JSON.parse(rawdata);
                
                var randomnumber = Math.floor(Math.random()*allJokes.length);
                var joke = allJokes[randomnumber];
                
                kendo.data.ObservableObject.fn.init.apply(that, []);
                
                dataSource = new kendo.data.DataSource({
                    data:[joke]
                });
                
                that.set("randomDataSource", dataSource);        
            });
        }, 

                        
        newJoke: function(){
            navigator.notification.vibrate(1000);
            
            dataSource.fetch(function() {
              var dataItem = dataSource.at(0);
              dataSource.remove(dataItem);
                
              $.get("data/joke.json", function(data) {
                  rawdata = data;
                     
                  var allJokes = JSON.parse(rawdata);
                    
                  var randomnumber = Math.floor(Math.random()*allJokes.length);
                  var joke = allJokes[randomnumber];
                    
                  dataSource.insert(joke);
                        
               });
            });
        }
        
    });  
    
    
    app.random = {
        viewModel: new RandomViewModel(),
    };
    
})(window);