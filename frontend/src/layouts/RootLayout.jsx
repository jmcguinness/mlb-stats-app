import Header from "../components/Header"
import Schedule from "../components/Schedule"

function RootLayout() {

    return(

        <>
        <div className="app">
            <div className="bg-[#f7f7f7]">
                <Header />
            </div>
            <div className="mt-[75px]">
                <Schedule />
            </div>
        </div>
        </>

    )

}

export default RootLayout