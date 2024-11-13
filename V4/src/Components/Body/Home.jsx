import './Home.css'
import Nav from "../Nav/Nav.jsx";
import {Link} from "react-router-dom";

export default function Home(){

    return(
        <>
            <Nav/>
        <main>
            <div className="header">
                <h1 className='title'>Tired of Remembering Movies ?</h1>
                <p className="desc">Worry not you are at the right place! save once forget never</p>
                <div className="cta">
                    <button>
                        <Link to="/search" >Start Searching</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </main>
        </>
    )
}