import { useState, useRef, useEffect } from "react"

const OtpInput = ({ length = 4, onOtpSubmit = () => { } }) => {
    const [opt, setOtp] = useState(new Array(length).fill(''));

    const inputRef = useRef([])
    useEffect(() => {
        inputRef.current[0].focus()
    }, [])

    function handleChange(e, index) {
        const optVal = e.target.value;
        if (isNaN(optVal)) return;
        const cloneOtp = opt.slice();
        cloneOtp[index] = optVal.slice(-1);
        setOtp(cloneOtp)
        const combinedOtp = cloneOtp.join('')
        if(combinedOtp.length === length) onOtpSubmit(combinedOtp)

        if(optVal && length-1 !== opt.length && inputRef.current[index+1]){
            inputRef.current[cloneOtp.indexOf('')].focus()
        }
    }
    function handleKeyDown(e, index) {
        if(e.key ==="Backspace" && !opt[index] && index >0 && inputRef.current[index-1]){
            inputRef.current[index-1].focus()
        }
    }
    function handleClick(index){
        inputRef.current[index].setSelectionRange(1,1)

        if(opt[index] && index >0 && !opt[index-1]){
            inputRef.current[opt.indexOf('')].focus()
        }
    }

    return (
        <div>
            {opt.map((value, index) => {
                return <input
                    ref={(input) => inputRef.current[index] = input}
                    type="text"
                    name={`otp-${index}`}
                    key={index}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e => handleKeyDown(e, index))}
                    onClick={()=>handleClick(index)}
                    className="optInput"
                />
            })}
        </div>
    )
}

export default OtpInput