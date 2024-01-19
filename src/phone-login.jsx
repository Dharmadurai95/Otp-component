import { useState } from "react"
import OtpInput from "./optInput";

export default function PhoneOtpForm() {
    const [mobileNumber, setMobileNumber] = useState('')
    const [showOptInput, setShowOtpInput] = useState(false)
    function handleSubmit(event) {
        event.preventDefault();
        const mobileRegex = /[^0-9]/g;
        if (mobileNumber.length !== 10 || mobileRegex.test(mobileNumber)) {
            alert('Invalid mobile number'); return;
        }
        //make api call
        setShowOtpInput(true)
    }
    function mobileNumberOnChange(event) {
        setMobileNumber(event.target.value)
    }
    function otpSubmitHandler(otp){
        console.log('entered otp:',otp)
    }
    return (<>
        {!showOptInput ? <form onSubmit={handleSubmit}>
            <input type="text" name="mobileNumber" value={mobileNumber} placeholder="enter your mobile number" onChange={mobileNumberOnChange} />
            <button type="submit">Submit</button>
        </form> : <div>
                <p>Enter OTP sent to {mobileNumber}</p>
                <OtpInput length={4} onOtpSubmit={otpSubmitHandler}   />
        </div>}
    </>
    )
}
