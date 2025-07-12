const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");


app.use(session({secret:"mysupersecretstring"}));

app.get("/test",(req,res)=>{
    res.send("test successfull");
})

app.listen(3000,()=>{
    console.log("Server is Listening to port 3000");
});

app.use((req,res,next)=>{

})



