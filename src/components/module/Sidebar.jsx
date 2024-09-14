import { useQuery } from "@tanstack/react-query"
import { getCategory } from "services/admin"
import styles from "./Sidebar.module.css"


function Sidebar() {

    const queryKey = ["get-categories"]
    const {data} = useQuery({queryKey , queryFn: getCategory})

    return (
        <div className={styles.sidebar}>
            <h4>دسته بندی ها</h4>
            <ul>
                {data?.data.map(i => (
                    <li key={i._id}>
                        <img src={`${i.icon}.svg`} />
                        <p>{i.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
