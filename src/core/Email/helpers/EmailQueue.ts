import RedisSMQ from 'rsmq'
import { MailData } from '../../../types/EmailService'

const rsmq = new RedisSMQ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT as string),
  ns: 'rsmq'
})

export default class EmailQueue {
  static async createQueue() {
    try {
      return await rsmq.createQueueAsync({
        qname: 'email'
      })
    } catch (error) {
      if (error.name === 'queueExists') {
        return
      }
      else {
        console.log(`Redis Queue Error: ${error}`)
      }
    }
  }

  static async sendEmail(
    data: MailData | MailData[]
  ) {
    try {
      return await rsmq.sendMessageAsync({
        qname: 'email',
        message: JSON.stringify(data)
      })
    } catch (error) {
      throw error
    }
  }
}

export {
  rsmq
}