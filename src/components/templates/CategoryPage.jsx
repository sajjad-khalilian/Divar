import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { addCategory } from "services/admin"
import styles from "./CategoryPage.module.css"


function CategoryPage() {

    const [form , setForm] = useState({name: "" , slug: "" , icon: ""})
    const queryClient = useQueryClient()
    const {mutate , isPending , data} = useMutation({mutationFn: addCategory})
    console.log(data);

    
    const changeHandler = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
    }



    const submitHandler = (e) => {
        e.preventDefault()
        if(!form.name || !form.slug || !form.icon) return;

        mutate(form , {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["get-list"]});
                toast.success("دسته بندی ایجاد شد");
            },  
            onError: () => {
                toast.error("مشکلی پیش آمده است");
            }   
        });
    }


    return (
        <form className={styles.form} onChange={changeHandler} onSubmit={submitHandler}>
            <h3>دسته بندی جدید</h3>
            <label htmlFor="name">اسم دسته بندی</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="slug">اسلاگ</label>
            <input type="text" name="slug" id="slug" />
            <label htmlFor="icon">آیکون</label>
            <input type="text" name="icon" id="icon" />
            <button type="submit" disabled={isPending}>ایجاد</button>
            <Toaster/>
        </form>
    )
}

export default CategoryPage
