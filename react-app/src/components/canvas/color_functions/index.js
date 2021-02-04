//Draws pixel to canvas specified in ctx; pixel location and size scale appropriately with the input pixelSize
//Will merge colors if a color already exists in that space
export const drawPixel = (ctx, colorArr, x, y, pixelSize) => {
    if(colorArr === 'deleted') {
        ctx.clearRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        return 'deleted'
    }
    ctx.fillStyle = `rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, ${colorArr[3]})`;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    const p = Array(...ctx.getImageData(x * pixelSize, y * pixelSize, 1, 1).data);
    p[3] = p[3] / 255
    return p
}

//Same as drawPixel except it will not merge colors
export const overwritePixel = (ctx, colorArr, x, y, pixelSize) => {
    if(colorArr === 'deleted') {
        ctx.clearRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        return 'deleted'
    }
    ctx.clearRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    ctx.fillStyle = `rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, ${colorArr[3]})`;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    const p = Array(...ctx.getImageData(x * pixelSize, y * pixelSize, 1, 1).data);
    p[3] = p[3] / 255
    return p
}

//Draws out an entire image at the specified ctx using the input grid
export const pixelParser = (ctx, pixelSize, colorGrid) => {
    for (let pos in colorGrid) {
        let posCoord = pos.split('-')
        drawPixel(ctx, colorGrid[pos], posCoord[0], posCoord[1], pixelSize)
    }
}

//draws checkerboard background used to represent low alpha
export const backDrop = (ctx, pixelSize, pxWidth, pxHeight) => {
    const adjPixel = Math.ceil(pixelSize * 1.5);
    const width = pxWidth * pixelSize;
    const height = pxHeight * pixelSize;
    const backWidthPixel = Math.ceil(width / adjPixel);
    const backHeightPixel = Math.ceil(height / adjPixel);
    for (let x = 0; x < backWidthPixel; x++) {
        for (let y = 0; y < backHeightPixel; y++) {
            const color = (x + y) % 2 === 0 ? [201, 201, 201, 1] : [245, 245, 245, 1];
            drawPixel(ctx, color, x, y, adjPixel)
        }
    }
}

//draws grid overlay
export const drawGrid = (ctx, pixelSize, pxWidth, pxHeight) => {
    const width = pxWidth * pixelSize;
    const height = pxHeight * pixelSize;
    ctx.fillStyle = `rgba(0, 0, 0, 1)`;
    for (let x = 1; x < pxWidth; x++) {
        ctx.beginPath();
        ctx.moveTo(x*pixelSize, 0);
        ctx.lineTo(x*pixelSize, height);
        ctx.stroke();
    }

    for (let y = 1; y < pxHeight; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y*pixelSize);
        ctx.lineTo(width, y*pixelSize);
        ctx.stroke();
    }
}

//Merges two colors together and returns the value in array format
export const mergeColors = (col1, col2) => {
    let mix = [];
    mix[3] = 1 - (1 - col2[3]) * (1 - col1[3]); // alpha
    mix[0] = Math.round((col2[0] * col2[3] / mix[3]) + (col1[0] * col1[3] * (1 - col2[3]) / mix[3])); // red
    mix[1] = Math.round((col2[1] * col2[3] / mix[3]) + (col1[1] * col1[3] * (1 - col2[3]) / mix[3])); // green
    mix[2] = Math.round((col2[2] * col2[3] / mix[3]) + (col1[2] * col1[3] * (1 - col2[3]) / mix[3])); // blue
    return mix
}

//converts input to hex format
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

//converts rgba array to hexadecimal
export function rgbaToHex(colorArr) {
    return "#" + componentToHex(colorArr[0]) + componentToHex(colorArr[1]) + componentToHex(colorArr[2]) + componentToHex(Math.floor(colorArr[3]*255));
}

//converts hexadecimal to rgba array
export function hexToRgba(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
        parseInt(result[4], 16)/255
    ]
}
