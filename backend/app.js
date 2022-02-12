const express = require('express');
//for browser client support
const cors = require('cors');
const bodyParser=require('body-parser')



//importing routes
const authRoutes=require('./route/authRoutes')
const usersRoutes=require('./route/usersRoutes')
const profileRoutes=require('./route/profileRoutes')
const messagesRoutes=require('./route/messagesRoutes')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ffor api version support
const apiVersion = "/api/v1.0.0";

app.use(apiVersion + '/auth', authRoutes);
app.use(apiVersion + '/users', usersRoutes);
app.use(apiVersion + '/user', profileRoutes);
app.use(apiVersion + '/message', messagesRoutes);

const port=process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Example app listening at port : ${port}`)
})






