

var socket;
if(!window.WebSocket)
{
    window.WebSocket = window.MozWebSocket;
}
if(window.WebSocket)
{
    socket = new WebSocket("ws://localhost:4001")
    socket.onmessage = function(event)
    {
        
        var JsonString = JSON.parse(event.data);
        if(JsonString['mode'] == "PageUpdate")
        {
            if(JsonString['ConnectState'] == 'connect') {
                console.log('來自伺服端的訊息：',event.data);
                var IOTConnectLabel = document.getElementById(JsonString['device'] )
                IOTConnectLabel.innerHTML = "已連線"
                IOTConnectLabel.style.color = "red"
            }
            else if(JsonString['ConnectState'] == "disconnect"){
                var IOTConnectLabel = document.getElementById(JsonString['device'])
                IOTConnectLabel.innerHTML = "已連線"
                IOTConnectLabel.style.color = "white"
            }
        }
    }

    //假設設備開啟
    socket.onopen = function(event)
    {
        console.log("連接socket")
        send('{"mode":"SocketConnect","ConnectState":"connect","device":"IOTFanSocket"}')//物聯網電扇
    }

    socket.onclose = function(event)
    {
        console.log("關閉socket")
        send('{"mode":"SocketConnect","ConnectState":"disconnect","device":"IOTFanSocket"}')
    }

    function send(message)
    {
        if(!window.WebSocket)
        {
            return;
        }
        if(socket.readyState == WebSocket.OPEN)
        {
            socket.send(message);
        }
        else
        {

        }
    }
}