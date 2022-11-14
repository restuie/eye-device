const http = require("http")
const app = require("./app")
const WebSocket = require('ws')
const { CLIENT_RENEG_LIMIT } = require("tls")

const server = http.createServer(app)
const wss = new WebSocket.Server({ server:server })

const {API_PORT} = process.env;
const port = process.env.PORT || API_PORT

wss.on('connection',function connection(ws,req){
    console.log('A new client Connected：',req.socket.remoteAddress);

    //接收client的廣播
    ws.on('message',function incoming(message){
        console.log('received：%s',message);
        var JsonOBJ = JSON.parse(message);
        if(JsonOBJ['mode'] == 'SocketConnect'){
            JsonOBJ['mode'] = 'PageUpdate'
        }
        var JsonString = JSON.stringify(JsonOBJ)
        console.log('received1：%s',JsonString);
        wss.clients.forEach(function each(client) {
            if (client == ws && client.readyState == WebSocket.OPEN) {
              client.send(JsonString);
            }
        })
    })
})


function ReceivedMessage(message){
    //if(JsonString)
    if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send('{"mode":"connect","device":"light","commend":"connect"}');
    }
}

server.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})