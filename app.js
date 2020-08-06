const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const https = require('https');
const { static } = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get('/',(req,res)=>{

res.sendFile(__dirname +"/signup.html");

})
app.post('/',(req,res)=>{
    
const fname = req.body.first;
const lastname = req.body.last;
const email = req.body.email;


const data = {
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lastname
            }
        }
    ]
        

};

const jsonData = JSON.stringify(data);
  
//api will work in this fashion
    const url ="https://us17.api.mailchimp.com/3.0/lists/150f02c81a";
const options ={
    method:"POST",
    auth:"ranveer:9ec9f2d676d6c727b6a45fc3a1c15cb6-us17"
    

};
  const request = https.request(url,options,function(response){
    
   if(response.statusCode === 200){
    res.sendfile(__dirname + "/success.html");
     }else{
         res.sendFile(__dirname + "/failure.html");
     }

    response.on('data',function(data){

console.log(JSON.parse(data));
        
    })
})


request.write(jsonData);
request.end();

});

app.post('/failure',function(req,res){
    res.redirect("/");
})





//9ec9f2d676d6c727b6a45fc3a1c15cb6-us17 api key
// public id



app.listen(process.env.PORT || port,()=>{
    console.log(`The server is up and running at http://localhost:${port}`);
})
