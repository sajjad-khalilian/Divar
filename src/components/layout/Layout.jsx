import Footer from "./Footer"
import Header from "./Header"


const style = {minHeight: "100vh"}

function Layout({children}) {
    return (
        <>
            <Header/>
            <div style={style}>{children}</div>
            <Footer/>
        </>
    )
}

export default Layout
