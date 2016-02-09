$(document).ready(function() {
    var socket = io.connect('http://localhost:3000');
    
    socket.on('connect', function() {
        $('#conn-status').html("ONLINE");
        $('#conn-status').css('color', 'green');
		
        var dataTags = document.querySelectorAll('[data-wincc-tag]');
        for (var i = 0; i < dataTags.length; i++) {
            socket.emit('reg-tag', dataTags[i].attributes['data-wincc-tag'].value);
        }       
    }); 

    socket.on('wincc-status', function (data) {
        if (data['error'])
            $("#wincc-status").css('color', 'red');
        else
            $("#wincc-status").css('color', 'black');
        $("#wincc-status").html(data['status']);
    });
    
    socket.on('disconnect', function() {
        $('#conn-status').html("OFFLINE");
        $('#conn-status').css('color', 'red');
    });  

    socket.on('new-tag-value', function (data) {
        for (var tagName in data) {
            console.log("Trying to show data for tag " + tagName + " = " + data[tagName]);
            $("[data-wincc-tag='" + tagName + "']").html(data[tagName]);    
        }
    });
});
