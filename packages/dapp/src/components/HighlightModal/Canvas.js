import Volkhorn from '../../fonts/Volkhorn.ttf'

function HighlightSketch (p5) {
  let canvas
  let selectedText = ''
  let fontVolkhorn

  p5.preload = () => {
    fontVolkhorn = p5.loadFont(Volkhorn)
  }

  p5.setup = () => {
    canvas = p5.createCanvas(800, 1200)
    p5.angleMode(p5.DEGREES)
    p5.colorMode(p5.HSB)
  }

  let handleFinishedDrawing

  p5.updateWithProps = (props) => {
    if (props.selectedText) {
      // adding a carriage return in front of text fixes the issue of text overlapping
      // when it is selected with line breaks
      selectedText = `\r\n${props.selectedText}`
      p5.setup()
    }
    if (props.handleFinishedDrawing) {
      handleFinishedDrawing = props.handleFinishedDrawing
    }
  }

  p5.draw = () => {
    const img = canvas?.elt?.toDataURL()
    if (handleFinishedDrawing) {
      handleFinishedDrawing(img)
    }
    p5.background(0)

    p5.noStroke()
    p5.fill(360, 0, 100)
    p5.textFont(fontVolkhorn)
    p5.textAlign(p5.CENTER)
    p5.textSize(64)
    p5.text(selectedText, 50, 200, 700, 350)

    p5.fill(360, 0, 100, 0.4)
    p5.textAlign(p5.CENTRE, p5.BOTTOM)
    p5.textSize(32)
    p5.text('Signature Economies', 110, 1110, 600)
  }
}

export default HighlightSketch
