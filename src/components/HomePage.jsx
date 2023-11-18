import { useNavigate } from "react-router-dom"


const Homepage = () => {
    const navigator = useNavigate()

    return (
        <div className="home">
            <div className="home_header">
                <h1>Mainpage</h1>
                <button onClick={() => navigator('/')}>Выйти</button>
            </div>
        </div>
    )
}

export default Homepage