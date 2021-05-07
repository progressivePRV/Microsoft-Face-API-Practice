const express = require('express');
const morgan = require('morgan'); //  log creator
const axios = require('axios');
const apiv1 = require('./routes/faceApiRouteV1');
const docv1 = require('./routes/doc');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");


const app =  express();
port = 3000;
host = 'localhost';
app.set('view engine','ejs');

//setting up the swagger
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
                url: "http://localhost:8080"
            }
        ]
    },
    apis:["./routes/*.js"]
};

const specs = swaggerJsDoc(SwaggerOptions);
app.use('/docs',swaggerUi.serve, swaggerUi.setup(specs));


app.use(cors());
app.use(express.static('static'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny')); // for logs
// app.use(express.static(pathToSwaggerUi))

app.use("/Azure_Face_Api/v1/",apiv1);
app.use("/doc/v1/",docv1);
// cache setting
console.log("starting...");
app.use(function (req, res, next) {
    res.set("Cache-control", "public, max-age=300");
    next();
});

/**
 * @swagger
 * /:
 *     get:
 *      description: This is just home endpoint to check wheather server is running or not. 
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: It will just return "Welcome!"
 *          500:
 *              description: Internal server error. Most commonly occurs when server fails to connect the database.
 */
// home endpoint
app.get("/",(req,res,next)=>{
    res.render('v1/index.ejs');
});


app.use((req,res,next)=>{
    let err =  new Error('The server cannot locate '+ req.url);
    err.status = 404;
    next(err);
});

app.use((err, req,res,next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal server Error");
    }
    res.status(err.status);
    res.render('error',{error:err});
});

app.listen(port,host, ()=>{
    console.log("check out http://"+host+":"+port);
});
