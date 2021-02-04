import { pixelParser } from '../color_functions'
import uniqid from 'uniqid'

//converts image data stored in uri (generated from html canvas element) to a data blob
function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/png' });
}

//Adds a data uri string to AWS under a uniquely generated name; returns name for database storage purposes
async function addPhotoAWS(str, id) {
    if (!id) id = uniqid()
    const AWS = window.AWS
    let IdentityPoolId = "us-east-1:013e5b90-632f-4e59-aa4f-ed9acdd8a8c3";
    let bucketRegion = "us-east-1";

    AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
        })
    });

    let fileName = `${id}.png`;
    let photoKey = 'app-content/' + fileName;
    let buf = dataURItoBlob(str)
    let upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: 'pixel-showdown',
            Key: photoKey,
            Body: buf,
            AWS_SDK_LOAD_CONFIG: 1
        }
    });

    await upload.promise();
    return fileName
}

//Converts the current grid to a data uri using an invisible canvas element
function imageToDataUri(width, height, pixelSize, format, canvasSettings) {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    pixelParser(ctx, pixelSize, canvasSettings.grid)

    return canvas.toDataURL(`image/${format}`);
}

//saves current image to database and AWS; should only be used for new images
export const saveImage = async (canvasSettings, user, history) => {
    let uri = imageToDataUri(canvasSettings.width, canvasSettings.height, 1, 'png', canvasSettings)
    let fileName = await addPhotoAWS(uri)
    let imgUrl = `https://pixel-showdown.s3.amazonaws.com/app-content/${fileName}`
    const response = await fetch("/api/images/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            imgUrl,
            title: canvasSettings.title,
            grid: canvasSettings.grid,
            userId: user.id,
            competitionId: null
        }),
    });

    const parsed = await response.json();
    if (response && response.ok) {
        history.push(`/sketch/${parsed.id}`)
    } else {
        alert('There was an error saving your image! Please try again')
    }
    return
}

//updates images in AWS and database; should be used for existing images
export const updateImage = async (canvasSettings) => {
    let uri = imageToDataUri(canvasSettings.width, canvasSettings.height, 1, 'png', canvasSettings)
    let urlId = canvasSettings.editLink.split('/')
    urlId = urlId[urlId.length - 1]
    urlId = urlId.split('.')[0]
    await addPhotoAWS(uri, urlId)
    const response = await fetch(`/api/images/${canvasSettings.editing}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: canvasSettings.title,
            grid: canvasSettings.grid
        }),
    });

    if (response && response.ok) {

    } else {
        console.log('alerrererert')
        alert('There was an error saving your image! Please try again')
    }
    return
}
