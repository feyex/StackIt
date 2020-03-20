import sgMail from '@sendgrid/mail';
import { appUrl } from '../../config';

sgMail.setApiKey(`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`);

const sendEmail = async (toEmail: string, text: string, subject: string) => {
  let message = {
    from: 'Do Not Reply <info@stack.com>',
    to: toEmail,
    subject: subject,
    html: text
  };
  return sgMail.send(message)
}




const createAccountEmail = () => {

  return `
  <body style="background: #fbfbfb;">
    <div class="container">
      <div style="background: #fff; width: 96%; max-width: 500px; margin: 2% auto; padding-bottom: 0;">
        <table style="width: 100%; padding: 60px 30px;">
         
          <tr>
            <td colspan="3">
              <h1 style="font-family: roboto; font-size: 20px; line-height: 28px; font-weight: 700; color:blue;">
                StackIt
              </h1>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p style="font-family: rubik; font-size: 15px; line-height: 25px; color: #666; letter-spacing: 0.2px;">
                <p>Hello ,<p>
                    <p>We received a request to create your Stack account.</p>
                    <p>Welcome to stackit. You can update your profile once you login to the system</p>
                   
                    <p>Sincerely,</p>
                    <p>The Stackit Team</p>
                  </p>
            </td>
          </tr>

          <tr>
            <td><br />
              <b style="font-family: Rubik;
                      font-size: 16px;
                      line-height: 19px;
                      letter-spacing: 0.002em;">Best regards.</b>
            </td>
          </tr>
        </table>
        <div style="background: #000; padding: 30px; text-align: center; color: #fff;">
          <p style="font-family: Rubik;
              font-size: 15px;
              line-height: 18px;
              letter-spacing: 0.2px;">Copyright © 2019 StackIt. All Rights Reserved. We appreciate you.
          </p>
          <p style="font-family: Rubik;
              font-weight: 300;
              font-size: 16px;
              line-height: 19px;
              letter-spacing: -0.002em;
              color: #CFCFCF;
              ">info@StackIt.com | +234 1 466 2000
          </p>
           
        </div>
      </div>
    </div>
  </body>
  `
}

export { sendEmail, createAccountEmail };