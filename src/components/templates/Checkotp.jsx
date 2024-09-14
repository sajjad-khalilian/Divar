import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { checkOtp } from "services/auth";
import { getProfile } from "services/user";
import { setCookie } from "utils/cookie";
import styles from "./CheckOtp.module.css"


function Checkotp({code , mobile , setCode , setStep}) {


    const navigate = useNavigate()
    const queryKey = ["get-profile"]
    const {refetch} = useQuery({queryKey , queryFn: getProfile})


    const submitHandler = async (e) => {
        e.preventDefault()

        if(code.length !== 5) return;

        const {response , error} = await checkOtp(mobile , code)
        
        if(response) {
            setCookie(response.data)
            navigate("/")
            refetch()
        }
    }

    return (    
        <form className={styles.form} onSubmit={submitHandler}>
            <p>ورود به حساب کاربری</p>
            <span>کد پیامک شده به شماره {mobile} را وارد کنید</span>
            <label htmlFor="input">کد تایید را وارد کنید</label>
            <input type="text" id="input" value={code} onChange={e => setCode(e.target.value)} placeholder="لطفا کد تایید را وارد کنید"/>
            <button type="submit">ورود</button>
            <button type="submit" onClick={() => setStep(1)} className={styles.backButton}>تغییر شماره موبایل</button>
        </form>
    )
}

export default Checkotp
