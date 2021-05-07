const express = require('express');
const morgan = require('morgan'); //  log creator
const axios = require('axios');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

const app =  express();
port = 3000;
host = 'localhost';

const SwaggerOptions = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: 'FACE APIs',
            version: '1.0.0',
            description: 'This are REST like apis. This still does not have HATEOAS. APIs decscription is generated using swagger <br> This are example endpoints for Microsoft Azure FACE API'
        },
        servers:[
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis:["./server.js"]
};

const specs = swaggerJsDoc(SwaggerOptions);
app.use('/docs',swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
// app.use(express.static('static'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny')); // for logs
app.use(function (req, res, next) {
    res.set("Cache-control", "public, max-age=300");
    next();
});



// home endpoint
app.get("/",(req,res,next)=>{
    // res.render('v1/index.ejs');
    res.redirect("/docs");
});



console.log("starting...");
app.listen(port,host, ()=>{
    console.log("check out http://"+host+":"+port);
});