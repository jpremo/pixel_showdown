
export const drawPixel = (ctx, colorArr, x, y, pixelSize) => {
    ctx.fillStyle = `rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, ${colorArr[3]})`;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    const p = Array(...ctx.getImageData(x * pixelSize, y * pixelSize, 1, 1).data);
    p[3] = p[3] / 255
    return p
}

export const pixelParser = (ctx, pixelSize, colorGrid) => {
    for (let pos in colorGrid) {
        let posCoord = pos.split('-')
        drawPixel(ctx, colorGrid[pos], posCoord[0], posCoord[1], pixelSize)
    }
}

export const backDrop = (ctx, pixelSize, pxWidth, pxHeight) => {
    const adjPixel = Math.ceil(pixelSize*1.5);
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

export const mergeColors = (col1, col2) => {
    let mix = [];
    mix[3] = 1 - (1 - col2[3]) * (1 - col1[3]); // alpha
    mix[0] = Math.round((col2[0] * col2[3] / mix[3]) + (col1[0] * col1[3] * (1 - col2[3]) / mix[3])); // red
    mix[1] = Math.round((col2[1] * col2[3] / mix[3]) + (col1[1] * col1[3] * (1 - col2[3]) / mix[3])); // green
    mix[2] = Math.round((col2[2] * col2[3] / mix[3]) + (col1[2] * col1[3] * (1 - col2[3]) / mix[3])); // blue
    return mix
}

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(colorArr) {
    return "#" + componentToHex(colorArr[0]) + componentToHex(colorArr[1]) + componentToHex(colorArr[2]);
}

export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ]
}
