let albumBucketName = "pixel-showdown";
let bucketRegion = "us-east-1";
let IdentityPoolId = "us-east-1:013e5b90-632f-4e59-aa4f-ed9acdd8a8c3";

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

// AWS.config.region = bucketRegion; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: IdentityPoolId
// });

// AWSCognito.config.region = bucketRegion;
// AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: IdentityPoolId
// });

// AWSCognito.config.update({accessKeyId: 'asdfasdfweefq', secretAccessKey: 'asdfewqffsdfadfa'})

// var poolData = {
//     UserPoolId : 'user pool id collected from user pool',
//     ClientId : 'application client id of app subscribed to user pool'
// };


// CognitoCachingCredentialsProvider, credentialsProvider = new CognitoCachingCredentialsProvider(
//     getApplicationContext(),
//     "us-east-1:013e5b90-632f-4e59-aa4f-ed9acdd8a8c3", // Identity pool ID
//     Regions.US_EAST_1 // Region
// );

let s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: albumBucketName }
});

function listAlbums() {
    s3.listObjects({ Delimiter: "/" }, function (err, data) {
        if (err) {
            // return alert("There was an error listing your albums: " + err.message);
        } else {
            var albums = data.CommonPrefixes.map(function (commonPrefix) {
                var prefix = commonPrefix.Prefix;
                var albumName = decodeURIComponent(prefix.replace("/", ""));
            });
            var message = albums.length
            // console.log('data', data)
        }
    });
}

function createAlbum(albumName) {
    albumName = albumName.trim();
    if (!albumName) {
        return alert("Album names must contain at least one non-space character.");
    }
    if (albumName.indexOf("/") !== -1) {
        return alert("Album names cannot contain slashes.");
    }
    var albumKey = encodeURIComponent(albumName);
    s3.headObject({ Key: albumKey }, function (err, data) {
        if (!err) {
            return alert("Album already exists.");
        }
        if (err.code !== "NotFound") {
            return alert("There was an error creating your album: " + err.message);
        }
        s3.putObject({ Key: albumKey }, function (err, data) {
            if (err) {
                return alert("There was an error creating your album: " + err.message);
            }
            alert("Successfully created album.");
            viewAlbum(albumName);
        });
    });
}

function encode(data) {
    var str = data.reduce(function (a, b) { return a + String.fromCharCode(b) }, '');
    return btoa(str).replace(/.{76}(?=.)/g, '$&\n');
}


function getUrlByFileName(fileName, mimeType) {
    return new Promise(
        function (resolve, reject) {
            bucket.getObject({ Key: fileName }, function (err, file) {
                var result = mimeType + encode(file.Body);
                resolve(result)
            });
        }
    );
}

//   data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA/UlEQVRYR+2UXQ7DIAyD2/txXO7XiYdIXpYfBzpVldjjGsD5Yuc8Hv6dD79/vE9A7/1Caq21pSaow/pRa2yzQsoCrIdWqKQC5PKow1Ej35l6JEgLmEkLMxZXAGLF7rwRaAJD8LQAb6aIGono/y3xHkGTgJ5pRMCbOesFSoDgtAh4VMaZ6JsQcQXgDD0/yCVRNDMf0Ca0llEWTcaIf43hLQI892brOUMfemBm6cyeWR4B22lpD0gxk2WmJqITxpAxkeSdrdVifgRgR5XumKVjkfgSYD3IXszWhQRW9votArT5cNVGm1ALr4hJY4gmq2SdjScloPJwtXYL2AQ2gQ9Vktgh9v0V+AAAAABJRU5ErkJggg==

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/png' });
}

function addPhotoTest(albumName) {
    var fileName = 'testUpload3.png';
    var albumPhotosKey = encodeURIComponent(albumName) + "/";

    var photoKey = albumPhotosKey + fileName;
    let str = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA/UlEQVRYR+2UXQ7DIAyD2/txXO7XiYdIXpYfBzpVldjjGsD5Yuc8Hv6dD79/vE9A7/1Caq21pSaow/pRa2yzQsoCrIdWqKQC5PKow1Ej35l6JEgLmEkLMxZXAGLF7rwRaAJD8LQAb6aIGono/y3xHkGTgJ5pRMCbOesFSoDgtAh4VMaZ6JsQcQXgDD0/yCVRNDMf0Ca0llEWTcaIf43hLQI892brOUMfemBm6cyeWR4B22lpD0gxk2WmJqITxpAxkeSdrdVifgRgR5XumKVjkfgSYD3IXszWhQRW9votArT5cNVGm1ALr4hJY4gmq2SdjScloPJwtXYL2AQ2gQ9Vktgh9v0V+AAAAABJRU5ErkJggg=="
    let buf = dataURItoBlob(str)
    // var buf = Buffer.from(str.replace(/^data:image\/\w+;base64,/, ""),'base64')
    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: albumBucketName,
            Key: photoKey,
            Body: buf
        }
    });

    var promise = upload.promise();

    promise.then(
        function (data) {
            alert("Successfully uploaded photo.");
        },
        function (err) {
            return alert("There was an error uploading your photo: ", err.message);
        }
    );
}

// function dataURItoBlob(dataURI) {
//     var binary = atob(dataURI.split(',')[1]);
//     var array = [];
//     for (var i = 0; i < binary.length; i++) {
//         array.push(binary.charCodeAt(i));
//     }
//     return new Blob([new Uint8Array(array)], { type: 'image/png' });
// }

// function addPhotoAWS(str) {
//     let fileName = 'testUpload3.png';
//     let photoKey = 'app-content' + fileName;
//     let buf = dataURItoBlob(str)
//     let upload = new AWS.S3.ManagedUpload({
//         params: {
//             Bucket: 'pixel-showdown',
//             Key: photoKey,
//             Body: buf
//         }
//     });

//     let promise = upload.promise();

//     promise.then(
//         function (data) {
//         },
//         function (err) {
//         }
//     );
// }
//   createAlbum('testalbum')
//   addPhotoTest('testalbum')
  listAlbums()
// console.log(s3)
