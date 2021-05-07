# Face API
It is a middleare for trying Microsoft Azure Face API. For trying this you don't need any subscription to Azure, but at the same time it comes with limited access.

## Things to remember
- No image will be stored. Only the extracted face feature(s) will be stored on server. The faceId is an identifier of the face feature and will be used in "Face - Identify", "Face - Verify", and "Face - Find Similar" `( all three coming soon)`. The stored face features will expire and be deleted at the time specified by faceIdTimeToLive after the original detection call.

- By default Response will only contain "faceId" and "faceRectrangle". 
  - faceId : a unique identifer for different faces in a photo.
  - faceRectrangle : Location of face frame/rectangle on a photo. The location is provided in reference to top left corner and it also provides hight and width of the frame for the detected face.
  - For example
```
{
  "faceId": "c5c24a82-6845-4031-9d5d-978df9175426",
  "faceRectangle": {
            "width": 78,
            "height": 78,
            "left": 394,
            "top": 54
        }
}
```
 - You can modify the response by passing optional parameters. Optional parameters include faceId, landmarks, and attributes. Attributes include age, gender, headPose, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure, noise and mask. Some of the results returned for specific attributes may not be highly accurate.

 - The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.

 - Up to 100 faces can be returned for an image. Faces are ranked by face rectangle size from large to small.
For optimal results when querying Face - Identify, Face - Verify, and Face - Find Similar ('returnFaceId' is true), please use faces that are: frontal, clear, and with a minimum size of 200x200 pixels (100 pixels between eyes).

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

## Inputs

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

  The 'detectionModel' associated with the detected faceIds. Supported 'detectionModel' values include "detection_01", "detection_02" and "detection_03". The default value is "detection_01".
  
- `faceIdTimeToLive` (type: integer)

The number of seconds for the face ID being cached. Supported range from 60 seconds up to 86400 seconds. The default value is 86400 (24 hours). Face ID can be used for further reference in future calls (comming soon) for Identify, Find Similar, Group, Verify.

### Example of Full response
```
[
    {
        "faceId": "c5c24a82-6845-4031-9d5d-978df9175426",
        "recognitionModel": "recognition_03",
        "faceRectangle": {
            "width": 78,
            "height": 78,
            "left": 394,
            "top": 54
        },
        "faceLandmarks": {
            "pupilLeft": {
                "x": 412.7,
                "y": 78.4
            },
            "pupilRight": {
                "x": 446.8,
                "y": 74.2
            },
            "noseTip": {
                "x": 437.7,
                "y": 92.4
            },
            "mouthLeft": {
                "x": 417.8,
                "y": 114.4
            },
            "mouthRight": {
                "x": 451.3,
                "y": 109.3
            },
            "eyebrowLeftOuter": {
                "x": 397.9,
                "y": 78.5
            },
            "eyebrowLeftInner": {
                "x": 425.4,
                "y": 70.5
            },
            "eyeLeftOuter": {
                "x": 406.7,
                "y": 80.6
            },
            "eyeLeftTop": {
                "x": 412.2,
                "y": 76.2
            },
            "eyeLeftBottom": {
                "x": 413.0,
                "y": 80.1
            },
            "eyeLeftInner": {
                "x": 418.9,
                "y": 78.0
            },
            "eyebrowRightInner": {
                "x": 4.8,
                "y": 69.7
            },
            "eyebrowRightOuter": {
                "x": 5.5,
                "y": 68.5
            },
            "eyeRightInner": {
                "x": 441.5,
                "y": 75.0
            },
            "eyeRightTop": {
                "x": 446.4,
                "y": 71.7
            },
            "eyeRightBottom": {
                "x": 447.0,
                "y": 75.3
            },
            "eyeRightOuter": {
                "x": 451.7,
                "y": 73.4
            },
            "noseRootLeft": {
                "x": 428.0,
                "y": 77.1
            },
            "noseRootRight": {
                "x": 435.8,
                "y": 75.6
            },
            "noseLeftAlarTop": {
                "x": 428.3,
                "y": 89.7
            },
            "noseRightAlarTop": {
                "x": 442.2,
                "y": 87.0
            },
            "noseLeftAlarOutTip": {
                "x": 424.3,
                "y": 96.4
            },
            "noseRightAlarOutTip": {
                "x": 446.6,
                "y": 92.5
            },
            "upperLipTop": {
                "x": 437.6,
                "y": 105.9
            },
            "upperLipBottom": {
                "x": 437.6,
                "y": 108.2
            },
            "underLipTop": {
                "x": 436.8,
                "y": 111.4
            },
            "underLipBottom": {
                "x": 437.3,
                "y": 114.5
            }
        },
        "faceAttributes": {
            "age": 71.0,
            "gender": "male",
            "smile": 0.88,
            "facialHair": {
                "moustache": 0.8,
                "beard": 0.1,
                "sideburns": 0.02
            },
            "glasses": "sunglasses",
            "headPose": {
                "roll": 2.1,
                "yaw": 3,
                "pitch": 1.6
            },
            "emotion": {
                "anger": 0.575,
                "contempt": 0,
                "disgust": 0.006,
                "fear": 0.008,
                "happiness": 0.394,
                "neutral": 0.013,
                "sadness": 0,
                "surprise": 0.004
            },
            "hair": {
                "bald": 0.0,
                "invisible": false,
                "hairColor": [
                    {"color": "brown", "confidence": 1.0},
                    {"color": "blond", "confidence": 0.88},
                    {"color": "black", "confidence": 0.48},
                    {"color": "other", "confidence": 0.11},
                    {"color": "gray", "confidence": 0.07},
                    {"color": "red", "confidence": 0.03}
                ]
            },
            "makeup": {
                "eyeMakeup": true,
                "lipMakeup": false
            },
            "occlusion": {
                "foreheadOccluded": false,
                "eyeOccluded": false,
                "mouthOccluded": false
            },
            "accessories": [
                {"type": "headWear", "confidence": 0.99},
                {"type": "glasses", "confidence": 1.0},
                {"type": "mask"," confidence": 0.87}
            ],
            "blur": {
                "blurLevel": "Medium",
                "value": 0.51
            },
            "exposure": {
                "exposureLevel": "GoodExposure",
                "value": 0.55
            },
            "noise": {
                "noiseLevel": "Low",
                "value": 0.12
            }
        }
    }
]
```

