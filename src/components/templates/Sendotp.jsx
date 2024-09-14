import { sendOtp } from "services/auth";
import styles from "./Sendotp.module.css"

function Sendotp({setStep , mobile , setMobile}) {

    const submitHandler = async (e) => {
        e.preventDefault()
        
        if(mobile.length !== 11) return;

        const {response , error} = await sendOtp(mobile)

        if(response) setStep(2)
        console.log({response , error});
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <p>ورود به حساب کاربری</p>
            <span>
                برای استفاده از امکانات دیوار لطفا شماره موبایل خود را وارد کنید.کد به این شماره ارسال خواهد شد
            </span>
            <label htmlFor="input">شماره تلفن خود را وارد کنید</label>
            <input type="text" id="input" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="شماره موبایل خود را وارد کنید" />
            <button type="submit">ارسال کد تایید</button>
        </form>
    )
}

export default Sendotp
