import { createWorker, ImageLike } from 'tesseract.js'

const cardRecognition = {
  demo: (): Promise<string> => {
    // const image = 'https://tesseract.projectnaptha.com/img/eng_bw.png'
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
    // const image = require('../../assets/images/eng_bw.png').default
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const image = require('../../assets/images/magic-card-photo2.jpg').default

    return cardRecognition.recognizeText(image)
  },
  recognizeText: async (image: ImageLike): Promise<string> => {
    const worker = createWorker({
      logger: (m) => console.log(m),
    })

    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')

    const {
      data: { text },
    } = await worker.recognize(image)

    console.log(text)

    return text
  },
}

export default cardRecognition
