import { sp } from "utils/numbers";
import styles from "./Main.module.css"


function Main({posts}) {


    const url = import.meta.env.VITE_BASE_URL

    
    return (
        <div className={styles.container}>
            {posts?.data.posts.map(i => (
                <div key={i._id} className={styles.card}>
                    <div className={styles.info}>
                        <p>{i.options?.title}</p>
                        <div>
                            <p>{sp(i.amount)} تومان</p>
                            <span>{i.options?.city}</span>
                        </div>
                    </div>
                    <img src={`${url}/${i.images}`} />
                </div>
            ))}
        </div>
    )
}

export default Main
