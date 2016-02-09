 module.exports = function (io, interval) {
     var edge = require('edge');
     io.on('connection', (socket) => { 
        var dataIntervals = []; 

        socket.on('reg-tag', (tagName) => {
            console.log("Socket:" + socket.id + ":  Registered tag: " + tagName);
            var dataInterval = setInterval(() => { 
                        getTagValue(tagName, (error, result) => {
                                if (error) throw error;
                                console.log("Socket:" + socket.id + ":  Sending data for tag: " + tagName + " = " + result);
                                var data = {};
                                data[tagName] = result; 
                                socket.emit('new-tag-value', data);
                        });
            }, interval);
            dataIntervals.push(dataInterval);
            console.log("Now we have # intervals " + dataIntervals.length);
        });

        socket.on('disconnect', () => {
            console.log("Socket:" + socket.id + ":  Disconnect on socket");
            console.log("# intervals that will be cleared " + dataIntervals.length);
            for (var i = 0; i < dataIntervals.length; i++) {
                console.log("Clearing interval # " + i);
                clearInterval(dataIntervals[i]);
            }
        });
    });

    var getTagValue = edge.func(() => {/*
        async (tagName) => { 
            System.Type objectType = System.Type.GetTypeFromProgID("WinCC-Runtime-Project");        
            object obj = System.Activator.CreateInstance(objectType);
            object val = objectType.InvokeMember("GetValue", System.Reflection.BindingFlags.InvokeMethod,
                                                null, obj, new object[] { tagName });
            return val.ToString(); 
        }
    */});
 }