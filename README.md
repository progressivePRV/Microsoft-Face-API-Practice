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
