import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import configs from 'src/Utils/environment/config';

export default class Email {
    private transporter: nodemailer.Transporter;
    private static instance:Email;
    private constructor() {
        this.transporter = nodemailer.createTransport({
            host: configs.EMAIL_HOST,
            port: Number(configs.EMAIL_PORT),
            secure: configs.EMAIL_TLS == "true" ? true : false,
            auth: {
              user: configs.EMAIL,
              pass: configs.EMAIL_APP_PASSWORD
            }
          } as SMTPTransport.Options);
    }
    
    static getInstance(){
        if(!this.instance){
            this.instance = new Email();
        }
        return this.instance;
    }
    
    
    async sendEmail(mailOptions: Mail.Options,template?:string,text?:string) {
        if(!mailOptions.html && !mailOptions.text){
            if(!template && text){
                mailOptions.text = text;
            }else if(template && !text){
                mailOptions.html = template;
            }else if(template && text){
                mailOptions.html = template;
            }else{
                throw new Error("can't send an empty email");
            }
        }
        const info = await this.transporter.sendMail(mailOptions);
        return info;
      }
}