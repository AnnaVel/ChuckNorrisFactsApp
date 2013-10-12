(function(global) {  
    var SmsViewModel,
        app = global.app = global.app || {};
    
    var smsViewModelObject;
    
    //contacts for simulation
    var simulatorContacts = [];
    var contact1 = {};
    contact1.displayName = "Anna";
    contact1.phoneNumbers = ["1234"];
    simulatorContacts.push(contact1)
    var contact2 = {};
    contact2.displayName = "Eti";
    contact2.phoneNumbers = ["5678"];
    simulatorContacts.push(contact2)
    
    SmsViewModel = kendo.data.ObservableObject.extend({
        contactsDataSource: null,
        contacts: [],
        dataSource: null,
        
        init: function () {
           smsViewModelObject = this;  
            
           var that = this;
           
           kendo.data.ObservableObject.fn.init.apply(that, []);
            
           dataSource = new kendo.data.DataSource({
               data: that.contacts
           });
            
           that.set("contactsDataSource", dataSource); 
        }, 
                        
        sendSms: function(){
            var smsPlugin = window.plugins.smsPlugin; 
			
            var inputPhone = document.getElementById("phone-input").value;
            var content = app.random.viewModel.currentJoke.joke;
            
			smsPlugin.send(inputPhone, content, 			
						   function () { 
							   alert('Message sent successfully');	
						   },
						   function (e) {
							   alert(e);
						   }
			);
        },
        
    });  
    
     document.addEventListener("deviceready", onDeviceReadyFindContacts, false);
    
    function onDeviceReadyFindContacts() {
        var options = new ContactFindOptions();
        options.filter="";
        options.multiple=true;
        var fields = ["displayName", "phoneNumbers"];
         
        if(navigator.contacts.find){
            navigator.contacts.find(fields, onSuccessGetContacts, onErrorGetContacts, options);
        }
    }
    
    function onSuccessGetContacts(retrievedContacts) {
        for (var i=0; i<retrievedContacts.length; i++) {
            smsViewModelObject.contacts.push(retrievedContacts[i]);
        }
    }
    
    function onErrorGetContacts(contactError) {
        alert(contactError);
        for (var i=0; i<simulatorContacts.length; i++) {
            console.log("Display Name = " + simulatorContacts[i].displayName);
            console.log("Phone = " + simulatorContacts[i].phoneNumbers[0]);
            smsViewModelObject.contacts.push(simulatorContacts[i]);
        }
    }
    
    
    app.sms = {
        viewModel: new SmsViewModel(),
    };
    
})(window);