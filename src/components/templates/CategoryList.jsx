import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCategory } from "services/admin"
import { getCategory } from "services/admin"
import styles from "./CategoryList.module.css"


function CategoryList() {
    const queryKey = ["get-list"]
    const queryClient = useQueryClient()
    const {data , isPending} = useQuery({queryKey , queryFn: getCategory})
    const {mutate} = useMutation({mutationFn: deleteCategory})
    console.log(data , isPending);
    

    const deleteHandler = async (id) => {
        const res = await deleteCategory(id)
        mutate(data , {
            onSuccess: () => queryClient.invalidateQueries({queryKey: ["get-list"]})
        })
        console.log(res);
    }

    return (
        <div className={styles.list}>
            {data?.data.map(i => (
                <div key={i._id}>
                    <img src={`${i.icon}.svg`} />
                    <h5>{i.name}</h5>
                    <p>slug: {i.slug}</p>
                    <button onClick={() => deleteHandler(i._id)}>حذف دسته بندی</button>
                </div>
            ))}
        </div>
    )
}

export default CategoryList
