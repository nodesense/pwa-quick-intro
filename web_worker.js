console.log('web worker started');

var i = 0;

function logMessage() {
    i++;
    const msg = 'msg ' + i;
    console.log('msg is ', msg)

    // inter process communication between web worker
   // and the webpage
   // cannot access dom/objects inside web page
   postMessage(msg);
}

self.onmessage = function(event){
    console.log('received ', event.data);
};   

setInterval(logMessage, 5000);