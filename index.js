//index.js
// A chat program for ITC298
//By Mike Murphy

var hapi = require("hapi");
var server = new hapi.Server();
server.connection({
  host:'localhost',
  port:8000
  });
server.start();
var io = require("socket.io")(server.listener);


//Start Server Obviously
server.start();

//Get Page Layouts
server.views({
  path:"templates",
  engines: {
    html:require("handlebars")
  },
  layoutPath: "layouts",
  layout:"chats",
  isCached:false
});

//HOMEPAGE
server.route({
  method:"GET",
  path:"/",
  handler: function(req, reply){
    reply.view("index",{
      title:"| CHAT |"
    });
  }
});
//connect to CSS
server.route({
  method:"GET",
  path:"/css/{param*}",
  handler: {
    directory: {
      path: "public"
    }
  }
});

//socekt events
io.on("connection", function (socket) {
  io.emit("entrance", {
    message: "Welcome to the Chatroom"});

    //console.log('connected');
    // Anything related to socket is in here
});
/*
//ENTRANCE EVENT for USER
socket.on("connection", function(sock){

    });
});
//EXIT EVENT
io.on('disconnect', function(){
  chat.sockets.emit('exit',
  {
    message: 'User has left the Chatroom'
  });
})
//VISIBLE NOTIFICATION TO ROOM
socket.emit('entrance',{
  message:"Welcome a New User!"})
*/
