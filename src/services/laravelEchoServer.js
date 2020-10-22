import Echo from "laravel-echo";
window.Echo = new Echo({
    broadcaster: 'socket.io',
    host:  'localhost:6002'
});

export class laravelEchoServer {
    constructor(user) {
        this.user = user;
    }

     disconnexion () {
        console.log(`ID : ${this.user}`)
        window.Echo.leave(`connection-channel.${this.user}`)
    }

    connect () {
        console.log(`ID : ${this.user}`)
        window.Echo.channel(`connection-channel.${this.user}`).listen("UserIsConnected", (e) => {
            console.log(e)
        });	
    }
}