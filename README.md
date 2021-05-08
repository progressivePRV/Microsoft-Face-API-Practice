# Face API
It is a middleare for trying Microsoft Azure Face API. For trying this you don't need any subscription to Azure, but at the same time it comes with limited access.
[Try This API in Swagger Play ground](http://167.99.122.35:3000/docs)

## Why you should use this API ?
- In today's world Face Detection and its analysis is used in many places. Any one can get much information by just a photo, information such as 
    -  `age` (not ncessary accurate, but still near to the real value)
    -  `emotions` (anger, happy, sad and many more)
    -  `gender` 
    -  `facial hair` (moustache, beard and sideburns)
    -  `headPose` (roll/yaw/pitch)
    -  `hair` (hair color, invisible or bald)
    -  `makeup` (eye, lip areas are made-up or not.)
    -  `accessories` (headwear, glasses and mask)
    -  `mask` (much needed detection during COVID-19 pandemic)
    -  And much more.
    
But, to extract such information you need a very large dataset. Then you need computation power to make a detection model out of it. And at last you need Host machine for detection model to reside and operate. Once running you may also have concern about adding new features to it, worring about updating and  making more accurate model.

All those above mentioned things can take too much of your time. Hence this is were `Face API` (this) comes handy.

- This API helps you to detect Faces in an image. 
- This API can provide you all the above mentioned information and Much More. 
- This API only needs URL of publicly available Image. As output it can provide all the above mentioned information.

## ` Things you should know. `
- No image will be stored. Only the extracted face feature(s) will be stored on server. The faceId is an identifier of the face feature and will be used in "Face - Identify", "Face - Verify", and "Face - Find Similar" `( all three coming soon)`. The stored face features will expire and be deleted at the time specified by faceIdTimeToLive after the original detection call.

- By default Response will only contain "faceId" and "faceRectrangle". 
  - faceId : a unique identifer for different faces in a photo.
  - faceRectrangle : Location of face frame/rectangle on a photo. The location is provided in reference to top left corner and it also provides hight and width of the frame for the detected face.
  - For example
  - Query and its output
>  http://167.99.122.35:3000/FaceAPI/v1/detect?image_url=https://upload.wikimedia.org/wikipedia/commons/c/c3/RH_Louise_Lillian_Gish.jpg
```
[
  {
    "faceId": "8ea33e17-f9ee-41c0-bc14-4c9acce065a6",
    "faceRectangle": {
      "top": 131,
      "left": 177,
      "width": 162,
      "height": 162
    }
  }
]
```
 - You can modify the response by passing optional parameters. Optional parameters include faceId, landmarks, and attributes. Attributes include age, gender, headPose, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure, noise and mask. Some of the results returned for specific attributes may not be highly accurate.

 - The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.

 - Up to 100 faces can be returned for an image. Faces are ranked by face rectangle size from large to small.
For optimal results when querying Face - Identify, Face - Verify, and Face - Find Similar `( all three coming soon)` ('returnFaceId' is true), please use faces that are: frontal, clear, and with a minimum size of 200x200 pixels (100 pixels between eyes).

 - Different 'detectionModel' values can be provided. Possible detection models and their information are.
 
  | detection_01 | detection_02  | detection_03 |
  | ------------ | ------------ | ------------ |
  | Default choice for all face detection operations. | Released in May 2019 and available optionally in all face detection operations. | Released in February 2021 and available optionally in all face detection operations. |
  | Not optimized for small, side-view, or blurry faces. | Improved accuracy on small, side-view, and blurry faces. | Further improved accuracy, including on smaller faces (64x64 pixels) and rotated face orientations. |
  | Returns main face attributes (head pose, age, emotion, and so on) if they're specified in the detect call. | Does not return face attributes. | Returns "mask" attribute if it's specified in the detect call. |
  | Returns face landmarks if they're specified in the detect call. | Does not return face landmarks. | Does not return face landmarks |

 -  Different 'recognitionModel' values are provided. If follow-up operations like Verify, Identify, Find Similar `( all three coming soon)` are needed, please specify the recognition model with 'recognitionModel' parameter. The default value for 'recognitionModel' is 'recognition_01', if latest model needed, please explicitly specify the model you need in this parameter. Once specified, the detected faceIds will be associated with the specified recognition model.
 
```
Note: "Face - Identify", "Face - Verify", and "Face - Find Similar" are not available in this middleware, they are planned in comming soon (future) updates. Till then "recognitionModel" is not useful for current request. Hence you can ingnore it.
```

## ` Inputs For Face API `
```
Note: All inputs are query parameters
```

### Mandatory inputs
- `image_url` (type: boolean)

It Takes publicly accessible image URL as input. PMG, BMP, JPG and GIF (the first Frame)  are only acceptable file format. The allowed image file size is from 1KB to 6MB.

### Optional Inputs
Mainly used of modifying response parameters

- `returnFaceId` (type: boolean)

  Return faceIds of the detected faces or not. The default value is true.

- `returnFaceLandmarks` (type boolean)

  Return face landmarks of the detected faces or not. The default value is false.
  Output can consists of  location of eyes, nose, mouth, eyebrows and lips. Output provides location of face landmarks in the photo, on x - y coordinate plan.

- `returnFaceAttributes` (type: comma seperated string values [attributes])

  Analyze and return the one or more specified face attributes in the comma-separated string like   "returnFaceAttributes=age,gender". Supported face attributes include age, gender, headPose, smile,  facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure, noise and mask. Face  attribute analysis has additional computational and time cost.

- `recognitionModel` (type: enum ["recognition_01", "recognition_02", "recognition_03", "recognition_04"])

  The 'recognitionModel' associated with the detected faceIds. Supported 'recognitionModel' values include "recognition_01", "recognition_02", "recognition_03" and "recognition_04". The default value is "recognition_01". "recognition_04" is recommended since its accuracy is improved on faces wearing masks compared with "recognition_03", and its overall accuracy is improved compared with "recognition_01" and "recognition_02".
  
- `returnRecognitionModel` (type: boolean)

  Return 'recognitionModel' in response or not. The default value is false

- `detectionModel` (type: enum ["detection_01", "detection_02", "detection_03"])

  The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include "detection_01", "detection_02" and "detection_03". The default value is "detection_01". For choosing Detection model as per your requirenment refer [Things to know](https://github.com/progressivePRV/Microsoft-Face-API-Practice/blob/main/README.md#things-you-should-know)
  
- `faceIdTimeToLive` (type: integer)

The number of seconds for the face ID being cached. Supported range from 60 seconds up to 86400 seconds. The default value is 86400 (24 hours). Face ID can be used for further reference in future calls (comming soon) for Identify, Find Similar, Group, Verify.
### Example URL with paramters

>http://167.99.122.35:3000/FaceAPI/v1/detect?image_url=https://upload.wikimedia.org/wikipedia/commons/c/c3/RH_Louise_Lillian_Gish.jpg&returnFaceId=true&returnFaceLandmarks=true&detectionModel=detection_01&returnFaceAttributes=age&returnFaceAttributes=gender&returnFaceAttributes=smile&returnFaceAttributes=emotion&returnFaceAttributes=makeup&recognitionModel=recognition_01&returnRecognitionModel=true&faceIdTimeToLive=10000

### Example of Full response
```
[
  {
    "faceId": "2a5feca8-8e05-4179-96a3-f10fe7b7682e",
    "faceRectangle": {
      "top": 131,
      "left": 177,
      "width": 162,
      "height": 162
    },
    "faceLandmarks": {
      "pupilLeft": {
        "x": 230.4,
        "y": 174.1
      },
      "pupilRight": {
        "x": 290.1,
        "y": 167.2
      },
      "noseTip": {
        "x": 240.9,
        "y": 212.6
      },
      "mouthLeft": {
        "x": 242.5,
        "y": 262.2
      },
      "mouthRight": {
        "x": 287.6,
        "y": 255.4
      },
      "eyebrowLeftOuter": {
        "x": 208.7,
        "y": 158.5
      },
      "eyebrowLeftInner": {
        "x": 235.8,
        "y": 154.6
      },
      "eyeLeftOuter": {
        "x": 223.9,
        "y": 176
      },
      "eyeLeftTop": {
        "x": 230.9,
        "y": 169.6
      },
      "eyeLeftBottom": {
        "x": 231.6,
        "y": 178.2
      },
      "eyeLeftInner": {
        "x": 240.4,
        "y": 174.6
      },
      "eyebrowRightInner": {
        "x": 261.5,
        "y": 146.8
      },
      "eyebrowRightOuter": {
        "x": 325.2,
        "y": 152
      },
      "eyeRightInner": {
        "x": 279.2,
        "y": 170
      },
      "eyeRightTop": {
        "x": 291.6,
        "y": 161.4
      },
      "eyeRightBottom": {
        "x": 291.7,
        "y": 172.7
      },
      "eyeRightOuter": {
        "x": 303.7,
        "y": 168.1
      },
      "noseRootLeft": {
        "x": 243.1,
        "y": 172.9
      },
      "noseRootRight": {
        "x": 263.2,
        "y": 171.6
      },
      "noseLeftAlarTop": {
        "x": 238.4,
        "y": 200.3
      },
      "noseRightAlarTop": {
        "x": 264.1,
        "y": 202
      },
      "noseLeftAlarOutTip": {
        "x": 232.3,
        "y": 216.8
      },
      "noseRightAlarOutTip": {
        "x": 272.8,
        "y": 218.9
      },
      "upperLipTop": {
        "x": 250.2,
        "y": 243.8
      },
      "upperLipBottom": {
        "x": 251.2,
        "y": 250.5
      },
      "underLipTop": {
        "x": 251.9,
        "y": 269.7
      },
      "underLipBottom": {
        "x": 252.7,
        "y": 280.7
      }
    },
    "faceAttributes": {
      "smile": 0.001,
      "gender": "female",
      "age": 23,
      "emotion": {
        "anger": 0,
        "contempt": 0,
        "disgust": 0,
        "fear": 0,
        "happiness": 0.001,
        "neutral": 0.987,
        "sadness": 0.001,
        "surprise": 0.01
      },
      "makeup": {
        "eyeMakeup": true,
        "lipMakeup": true
      }
    },
    "recognitionModel": "recognition_01"
  }
]
```

## `Error from API`
Every time if any error occurs it will in format:
```
{
    "error": {
        "code": "A specific error code",
        "message": "small message/description regarding error"
    }
}
```
Posssible error code are:

| Error Code | Error Message |
| -- | -- |
| BadArgument | JSON parsing error. Bad or unrecognizable request JSON body. |
| BadArgument | Invalid argument returnFaceAttributes. Supported values are: age, gender, headPose, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure, noise and mask in a comma-separated format. |
| BadArgument | 'recognitionModel' is invalid. |
| BadArgument | 'detectionModel' is invalid. |
| BadArgument | 'returnFaceAttributes'/'returnLandmarks' is not supported by detection_02. |
| InvalidURL | Invalid image format or URL. Supported formats include JPEG, PNG, GIF(the first frame) and BMP. |
| InvalidURL | Failed to download image from the specified URL. Remote server error returned. |
| InvalidImage | Image size is too small. The valid image file size should be larger than or equal to 1KB. |
| InvalidImageSize | Image size is too big. The valid image file size should be no larger than 6MB. |


