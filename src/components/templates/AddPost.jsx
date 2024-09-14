import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCategory } from "services/admin"
import { getCookie } from "utils/cookie"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import styles from "./AddPost.module.css"

function AddPost() {

    const [form , setForm] = useState({
        title : "",
        description: "",
        city: "",
        category: "",
        amount: null,
        images: null
    })


    const queryKey = ["get-Categories"]
    const {data} = useQuery({queryKey , queryFn: getCategory})
    console.log(data);
    const queryClient = useQueryClient()



    const changeHandler = (e) => {
        const name = e.target.name;
        if(name !== "images") {
            setForm({...form, [name] : e.target.value})
        }else{
            setForm({...form, [name]: e.target.files[0]})
        }
    }
    
    
    const addHandler = (e) => {
        e.preventDefault()

        const formData = new FormData();

        for(let i in form){
            formData.append(i, form[i])
        }


        const tokens = getCookie("accessToken")

        axios.post(`${import.meta.env.VITE_BASE_URL}/post/create` , formData , {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `bearer ${tokens}`
            }
        })
        .then(res => { 
            toast.success(res.data.message);
            queryClient.invalidateQueries({queryKey: ["get-PostList"]})
            }
        )
        .catch(error => toast.error("مشکلی پیش آمده است"))
    }

    return (
        <form className={styles.form} onChange={changeHandler}>
            <h3>افزودن آگهی</h3>
            <label htmlFor="title">عنوان آگهی</label>
            <input type="text" id="title" name="title"/>

            <label htmlFor="description">توضیحات</label>
            <textarea name="description" id="description"/>

            <label htmlFor="amount">مبلغ</label>
            <input type="number" id="amount" name="amount"/>

            <label htmlFor="city">شهر</label>
            <input type="text" id="city" name="city"/>

            <label htmlFor="category">دسته بندی</label>
            <select id="category" name="category">
                {data?.data.map(i => (
                    <option key={i._id} value={i._id}>{i.name}</option>
                ))}
            </select>
            <label htmlFor="images">عکس</label>
            <input type="file" name="images" id="images"/>
            <button onClick={addHandler}>ایجاد</button>
            <Toaster/>
        </form>
    )
}

export default AddPost
