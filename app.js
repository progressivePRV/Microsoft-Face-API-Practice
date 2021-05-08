const express = require('express');
const morgan = require('morgan'); //  log creator
const apiv1 = require('./routes/faceApiRouteV1'); // created seperate folder for differnt versions
const cors = require('cors'); // for cross-access-origin
const swaggerJsDoc = require('swagger-jsdoc'); //swagger library for embbeded Swagger doc
const swaggerUi = require("swagger-ui-express"); 

//  express server opbject;
const app =  express(); 
port = 3000;


//setting up the swagger
const SwaggerOptions = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: 'FACE APIs',
            version: '1.0.0',
            description: "It is a middleare for trying Microsoft Azure Face API. For trying this you don't need any subscription to Azure, but at the same time it comes with limited access. <br> some Image Urls for Trying: <br> https://storageforsi.blob.core.windows.net/image-container/group_of_monks.jpg <br> https://upload.wikimedia.org/wikipedia/commons/c/c3/RH_Louise_Lillian_Gish.jpg   <br> https://storageforsi.blob.core.windows.net/image-container/man1.jpg  <br> https://storageforsi.blob.core.windows.net/image-container/man2.jpg " 
        },
        servers:[
            {
                url: "http://167.99.122.35:3000"
            }
        ]
    },
    apis:["./routes/*.js"]
};

const specs = swaggerJsDoc(SwaggerOptions);
app.use('/docs',swaggerUi.serve, swaggerUi.setup(specs)); // adding /docs path for swagger UI

// adding middlewares
app.use(cors()); 
app.use(express.static('static'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny')); // for logs

app.use("/FaceAPI/v1/",apiv1);  // match path with its API serving file
// cache setting
console.log("starting...");
app.use(function (req, res, next) {
    res.set("Cache-control", "public, max-age=300");
    next();
});


// home endpoint
app.get("/",(req,res,next)=>{
    res.redirect("/docs");
});


app.listen(port, ()=>{
    console.log("Server is running");
});
