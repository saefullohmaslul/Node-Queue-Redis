import { Request, Response } from 'express';
import EmailService from '../service/EmailService'
import response from '../../../utils/response'
import EmailQueue, { rsmq } from '../helpers/EmailQueue'
import EmailWorker from '../helpers/EmailWorker';

export default class EmailController {
  async sendEmail(req: Request, res: Response) {
    try {
      const {
        to,
        from,
        subject,
        text,
        html
      } = req.body

      EmailQueue.createQueue()
      const data = {
        to,
        from,
        subject,
        text,
        html
      }
      EmailQueue.sendEmail(data)
      EmailWorker.sendWorker()

      return response.success('Success send email', res, true)
    } catch (error) {
      return response.error('Error email not send', res, 'EMAIL_NOT_SENDING')
    }
  }
}