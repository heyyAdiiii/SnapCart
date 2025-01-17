const forgotPasswordTemplate = ({name,otp}) =>{
    return `
    <div>
    <p>Dear ${name},</p>
    <p>You're requested a password reset. Please use following OTP code to reset your password./p>
    <h3 style="background:yellow; font-size:1rem; ">${otp}</h3>
    <p>This otp is valid for 1Hour only. Enter this otp in the SnapCart website to proceed with resetting your password.</p>
    <br/>
    <br/>
    </div>`
}

export default forgotPasswordTemplate;