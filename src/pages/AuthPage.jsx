import Checkotp from "components/templates/Checkotp"
import Sendotp from "components/templates/Sendotp"
import { useState } from "react"

function AuthPage() {

    const [step , setStep] = useState(1)
    const [mobile , setMobile] = useState("")
    const [code , setCode] = useState("")
    
    return (
        <div>
            {step === 1 && <Sendotp setStep={setStep} mobile={mobile} setMobile={setMobile}/>}
            {step === 2 && <Checkotp code={code} setStep={setStep} mobile={mobile} setCode={setCode}/>}
        </div>
    )
}
export default AuthPage
