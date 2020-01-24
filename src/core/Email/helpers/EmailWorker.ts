import RSMQWorker from 'rsmq-worker'
import EmailService from '../service/EmailService'
const worker = new RSMQWorker('email')

export default class EmailWorker {
  static async sendWorker() {
    worker.on('message', async (message, next, id) => {
      try {
        const data = JSON.parse(message)
        const {
          to,
          from,
          subject,
          text,
          html
        } = data

        await EmailService.sendEmail({
          to,
          from,
          subject,
          text,
          html
        })

        next()
      } catch (error) {
        throw error
      }
    })

    worker.start()
  }
}