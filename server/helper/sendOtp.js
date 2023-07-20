import nodemailer from 'nodemailer'



let otpValue

export function sendVerificationCode(email) {
    const otp = Math.floor(1000 + Math.random() * 9000);
    let password = "zqcmrhbtvebqrbhu"
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, auth: {
          user: 'ecocleanse55@gmail.com',
          pass: password,
        },
      });
  
      var mailOptions = {
        from: 'ecocleanse55@gmail.com',
        to: email,
        subject: "Shaj Paradise Email verification",
        html: `
              <h1>Verify Your Email For Eco Cleanse</h1>
                <h3>use this code in Eco Cleanse to verify your email</h3>
                <h2>${otp}</h2>
              `,
      }
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("error", error, info)
          reject(error)
  
        } else {
          console.log("success")
          otpValue = otp
          resolve({ success: true, message: "Email sent successfull" })
        }
      });
    })
  }
  
  
  export function verifyOtp(otp) {
    if (otpValue == otp) {
      return true
    } else {
      return false
    }
  }