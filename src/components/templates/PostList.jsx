import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Loader from "components/module/Loader"
import { deletePosts } from "services/user"
import { getPosts } from "services/user"
import { sp } from "utils/numbers"
import styles from "./PostList.module.css"


function PostList() {
    
    const url = import.meta.env.VITE_BASE_URL
    const queryKey = ["get-PostList"]
    const {data , isPending} = useQuery({queryKey , queryFn: getPosts})
    console.log(data);
    const queryClient = useQueryClient()
    const {mutate} = useMutation({mutationFn: deletePosts})

    
    const deleteHandler = async (id) => {
        const res = await deletePosts(id)
        mutate(data , {
            onSuccess: () => queryClient.invalidateQueries({queryKey: ["get-PostList"]})
        })
    }
    
    return (
        <div className={styles.list}>
            {isPending ? <Loader/> : 
            (
                 <>
                    <h3>آگهی های شما</h3>
                    {
                        data?.data.posts.map(post => (
                            <div key={post._id} className={styles.post}>
                                <img src={`${url}/${post.images[0]}`} />
                                <div>
                                    <p>{post.options?.title}</p>
                                    <span>{post.options?.content}</span>
                                </div>
                                <div className={styles.price}>
                                    <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                                    <span>{sp(post.amount)} تومان</span>
                                </div>
                                <button onClick={() => deleteHandler(post._id)}>حذف دسته بندی</button>
                            </div>
                        ))
                    }
             </>
            )}
        </div>
    )
}

export default PostList
