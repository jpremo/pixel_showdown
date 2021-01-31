
export const drawPixel = (ctx, colorArr, x, y, pixelSize) => {
    if (colorArr.length === 4) {
        ctx.fillStyle = `rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, ${colorArr[3]})`;
    } else {
        ctx.fillStyle = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
    }
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

export const pixelParser = (ctx, pixelSize, colorGrid) => {
    for (let pos in colorGrid) {
        let posCoord = pos.split('-')
        drawPixel(ctx, colorGrid[pos], posCoord[0], posCoord[1], pixelSize)
    }
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
