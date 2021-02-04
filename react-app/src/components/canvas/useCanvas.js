import { useRef, useEffect } from 'react'

//This is a canvas related hook used to better setup the canvas element for react
const useCanvas = (draw, options) => {

    const canvasRef = useRef(null)

    const formattedDraw = (ctx) => {
        ctx.canvas.width = String(options.width * options.pixelSize);
        ctx.canvas.height = String(options.height * options.pixelSize);
        draw(ctx)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        formattedDraw(context)
    }, [draw])

    return canvasRef
}

export default useCanvas
