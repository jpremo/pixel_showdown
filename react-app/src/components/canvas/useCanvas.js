import { useRef, useEffect } from 'react'

const useCanvas = (draw, options) => {

    const canvasRef = useRef(null)

    const formattedDraw = (ctx) => {
        ctx.canvas.width = String(options.width * options.pixelSize);
        ctx.canvas.height = String(options.height * options.pixelSize);
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
