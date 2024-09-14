import { useQuery } from "@tanstack/react-query"
import Main from "components/module/Main"
import Sidebar from "components/module/Sidebar"
import { getAllPost } from "services/user"

const style = {display: "flex"}


function HomePage() {

    const queryKey = ["get-file"]
    const {data: posts} = useQuery({queryKey , queryFn: getAllPost})


    return (
        <>
            <div style={style}>
                <Sidebar/>
                <Main posts={posts}/>
            </div>
        </>
    )
}

export default HomePage
