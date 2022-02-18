const jwt = require('jsonwebtoken');

const express = require('express');

const app=express()
const http=require('http').createServer(app)
//for browser client support
const cors = require('cors');
const bodyParser=require('body-parser')
const corsOption={
    origin:"http://localhost:3000",
    credential:true,
    optionSuccessStatus:200

}

const socketUserTable={}

const socketIo=require('socket.io');
const io=socketIo(http);
//importing routes
const authRoutes=require('./route/authRoutes')
const usersRoutes=require('./route/usersRoutes')
const profileRoutes=require('./route/profileRoutes')
const messagesRoutes=require('./route/messagesRoutes')
const groupRoutes=require('./route/groupRoutes')



app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//ffor api version support
const apiVersion = "/api/v1.0.0";

app.use(apiVersion + '/auth', authRoutes);
app.use(apiVersion + '/users', usersRoutes);
app.use(apiVersion + '/user', profileRoutes);
app.use(apiVersion + '/message', messagesRoutes);
app.use(apiVersion + '/group', groupRoutes);

const port=process.env.PORT || 8080;

http.listen(port, () => {
    console.log(`Example app listening at port : ${port}`)
})

io.on('connection',(socket)=>{
    //console.log('connected',socket.id)
    socket.on('token',async token=>{
        jwt.verify(token, process.env.jwt_secret, async (err, user) => {
            if(!err){
                if(!(user.id in socketUserTable))socketUserTable[user.id]=[]
                socketUserTable[user.id].push(socket.id)
            }
            console.log(socketUserTable)
        })
    })
    socket.on('disconnect', function() {
        Object.keys(socketUserTable).map(k=>{
            if(socketUserTable[k].includes(socket.id))
                socketUserTable[k].splice(socketUserTable[k].indexOf(socket.id),1)
            if(socketUserTable[k].length===0)
                delete socketUserTable[k]
        })
        console.log(socketUserTable)
    });
})

module.exports.socketTable=socketUserTable







