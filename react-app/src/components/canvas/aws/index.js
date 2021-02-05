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
    return [fileName, buf]
}

//Converts the current grid to a data uri using an invisible canvas element
export function imageToDataUri(width, height, pixelSize, format, canvasSettings) {
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
    const response = await fetch("/api/images/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: canvasSettings.title,
            grid: {
                gridColors: canvasSettings.grid,
                width: canvasSettings.width,
                height: canvasSettings.height,
                fps: 2,
            },
            userId: user.id,
            competitionId: null,
            file: [uri.split(',')[1],'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA/UlEQVRYR+2UXQ7DIAyD2/txXO7XiYdIXpYfBzpVldjjGsD5Yuc8Hv6dD79/vE9A7/1Caq21pSaow/pRa2yzQsoCrIdWqKQC5PKow1Ej35l6JEgLmEkLMxZXAGLF7rwRaAJD8LQAb6aIGono/y3xHkGTgJ5pRMCbOesFSoDgtAh4VMaZ6JsQcQXgDD0/yCVRNDMf0Ca0llEWTcaIf43hLQI892brOUMfemBm6cyeWR4B22lpD0gxk2WmJqITxpAxkeSdrdVifgRgR5XumKVjkfgSYD3IXszWhQRW9votArT5cNVGm1ALr4hJY4gmq2SdjScloPJwtXYL2AQ2gQ9Vktgh9v0V+AAAAABJRU5ErkJggg==']
        }),
    });

    const parsed = await response.json();
    if (response && response.ok) {
        history.push(`/sketch/${parsed.id}`)
    } else {
        alert('There was an error saving your image! Please try again')
    }
    return parsed
}

//updates images in AWS and database; should be used for existing images
export const updateImage = async (canvasSettings) => {
    let uri = imageToDataUri(canvasSettings.width, canvasSettings.height, 1, 'png', canvasSettings)
    const response = await fetch(`/api/images/${canvasSettings.editing}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: canvasSettings.title,
            grid: {
                gridColors: canvasSettings.grid,
                width: canvasSettings.width,
                height: canvasSettings.height,
                fps: 2,
            },
            file: [uri.split(',')[1],'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA/UlEQVRYR+2UXQ7DIAyD2/txXO7XiYdIXpYfBzpVldjjGsD5Yuc8Hv6dD79/vE9A7/1Caq21pSaow/pRa2yzQsoCrIdWqKQC5PKow1Ej35l6JEgLmEkLMxZXAGLF7rwRaAJD8LQAb6aIGono/y3xHkGTgJ5pRMCbOesFSoDgtAh4VMaZ6JsQcQXgDD0/yCVRNDMf0Ca0llEWTcaIf43hLQI892brOUMfemBm6cyeWR4B22lpD0gxk2WmJqITxpAxkeSdrdVifgRgR5XumKVjkfgSYD3IXszWhQRW9votArT5cNVGm1ALr4hJY4gmq2SdjScloPJwtXYL2AQ2gQ9Vktgh9v0V+AAAAABJRU5ErkJggg==']
        }),
    });

    const parsed = await response.json();

    if (response && response.ok) {
    } else {
        alert('There was an error saving your image! Please try again')
    }
    return parsed
}
