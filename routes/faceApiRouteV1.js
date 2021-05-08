const router =  require('express').Router(); // express router for server a specific path, in our case path=> '/FaceAPI/v1/'
const axios = require('axios'); // used for making request to Azure API

const key = process.env.Azure_Api_k; // getting key from environment varibale
const endpoint = "https://face-api-project-for-si.cognitiveservices.azure.com/"; // Azure Face API endPoint


// swagger components for schemas, for output and input

/**
 * @swagger
 * components:
 *  requestBodies:
 *   FaceDetectBody:
 *     description: A JSON object containing options for analysis of image.
 *     content:
 *       application/json
 *      
 *  
 *  schemas:  
 *   faceRectangle:
 *     type: object
 *     properties:
 *       top:
 *         type: integer
 *       left:
 *         type: integer
 *       width:
 *         type: integer
 *       height:
 *         type: integer
 * 
 *   detectResponse:
 *      type: object
 *      properties:
 *          faceId:
 *              type: uuid
 *          faceRectangle:
 *              $ref: '#/components/schemas/faceRectangle'
 * 
 *   errorObject:
 *      type: object
 *      properties:
 *           statusCode:
 *              type: integer
 *           message:
 *              type: string
 *           code:
 *              type: string
 *              
 *   errorResponse:
 *      type: object
 *      properties:
 *          error:
 *              $ref: '#/components/schemas/errorObject'
 *   
 *      
 *  
 * */  




//*******************************************************  FACE DETECT API   */

/**
 * @swagger
 * /FaceAPI/v1/detect:
 *     get:
 *      summary: This return Faces detected in the photo (URL).
 *      description: This takes pubicly accessible photo URI/URL and pass it to Azure Face API. Which then returns detected faces location from top left corner. It also provides the ainformation regaring attributes such as age, gender, headPose, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure, noise and mask. (sometimes attribute retrived may not be accurate) For more information check out <a href="https://github.com/progressivePRV/Microsoft-Face-API-Practice#face-api">Face API Documentation</a>
 *      parameters:
 *      - in: query
 *        name: image_url
 *        required: true
 *        schema: 
 *          type: string
 *        allowReserved: true
 *        description: This should be a publicly accessible URL/URI for image with only format png, jpeg, bmp or gif.  
 *      - in: query
 *        name: returnFaceId
 *        required: false
 *        schema:
 *          type: boolean
 *        description: Return faceIds of the detected faces or not. The default value is true. 
 *      - in: query
 *        name: returnFaceLandmarks
 *        required: false
 *        schema:
 *          type: boolean
 *        description: Return face landmarks of the detected faces or not. The default value is false.
 *      - in: query
 *        name: detectionModel
 *        required: false
 *        schema:
 *          type: string
 *          enum:
 *              - detection_01
 *              - detection_02
 *              - detection_03
 *        description: The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include "detection_01", "detection_02" and "detection_03". The default value is "detection_01" For more information <a href="https://github.com/progressivePRV/Microsoft-Face-API-Practice#things-you-should-know">click here</a>.   
 *      - in: query
 *        name: returnFaceAttributes
 *        required: false
 *        schema:
 *          type: array
 *          items:
 *              type: string
 *              enum: [age, gender, headPose, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure, noise, mask]              
 *        description: Analyze and return the one or more specified face attributes in the comma-separated string like "returnFaceAttributes=age,gender". Supported face attributes include age, gender, headPose, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure, noise and mask. Face attribute analysis has additional computational and time cost.
 *      - in: query
 *        name: recognitionModel
 *        required: false
 *        schema:
 *          type: string
 *          enum:
 *              - recognition_01
 *              - recognition_02
 *              - recognition_03
 *              - recognition_04
 *        description: The 'recognitionModel' associated with the detected faceIds. Supported 'recognitionModel' values include "recognition_01", "recognition_02", "recognition_03" and "recognition_04". The default value is "recognition_01". "recognition_04" is recommended since its accuracy is improved on faces wearing masks compared with "recognition_03", and its overall accuracy is improved compared with "recognition_01" and "recognition_02".
 *      - in: query
 *        name: returnRecognitionModel
 *        required: false
 *        schema:
 *          type: boolean
 *        description: Return 'recognitionModel' or not. The default value is false.
 *      - in: query
 *        name: faceIdTimeToLive
 *        required: false
 *        schema:
 *          type: integer
 *        description: The number of seconds for the face ID being cached. Supported range from 60 seconds up to 86400 seconds. The default value is 86400 (24 hours).
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: It will return detected faces location from top left corner. And optional information if asked for as query parameters. It can be empty '[]' if no face detected.
 *              application/json:
 *                  schema:
 *                      $ref : '#/components/schemas/detectResponse'
 *          400:
 *              description: Occurs due to Bad request. Mostly occurs when invalid arguments are provided.
 *          500:
 *              description: Internal server error occured. It is very rare error, Mostly due to not able to get response form Azure API.
 *          403: 
 *              description: Occurs due to crossing the Quota limit. As mentioned earlier this API comes with limit.
 *          408: 
 *              description: Occurs due to over computation. In other words operation exceeds maximum execution time.
 *          429: 
 *              description: Occurs due to exaution of Rate limit.
 *                          
 */


router.get('/detect',(req,res,next)=>{
    // checking request URL and query params
    console.log("URL=>",req.url);
    console.log("query params=>",req.query);

    let half_url = ''; // for stroing half URL, for Azure face API request and getting all optional parameter passed in query
    let image_url = ''; // for getting image URL from query paramters
    for (const property in req.query) {
        if(property==='image_url'){
            image_url = req.query[property];
        }else{
            half_url += property+"="+req.query[property]+"&";
        }
    }
    // checking half_url
    console.log("half_url without image url=>"+half_url);

    // axios configuration
    let config = {
        method: 'post', 
        baseURL: endpoint+'face/v1.0/detect?'+half_url,
        timeout:10000,
        headers:{'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/json'},
        data:{
                'url': image_url
        }
    }
    // making request using axios
    axios(config)
    .then((response) =>{
        // making log of response
        console.log("response status=>",response.status);
        console.log("resposne=>",response.data);
        // sending response
        res.json(response.data);
    })
    .catch(err =>{
        // making log of error
        console.log("error=>",err.response.data);
        // sending error resposne
        if(err.response.status==401){
            // occurs only when api key is wrong
            return res.status(500).json({
                'error':{
                    "code": "Internal error occured",
                    'message': "Server is unbale to get response from Azure API"
                    }
                });
        }
        res.status(err.response.status).json(err.response.data);
    })
    .catch(err => {
        // Error: if error response is not as expected
        console.log("err=>",err);
        return res.status(500).json({
            'error':{
                "code": "Internal error occured",
                'message': "Server is unbale to get response from Azure API"
                }
            });
    });
});

//******************************************************** */



module.exports = router;