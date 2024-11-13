import React from "react";
import './Nav.css'
import {Link} from "react-router-dom";

export default function Nav(){
    const [isNavOpen,setIsNavOpen] = React.useState(false)

    function toggleNav(){
        setIsNavOpen(!isNavOpen)
    }

    return(
        <nav>
            <div className="logo">
                <Link to="/home">
                    #MovieWatchList
                </Link>
            </div>

            <div style={{
                transform: isNavOpen && 'translateY(0%)',
                opacity: isNavOpen && '1',
            }}
                 className="nav_content">
                <ul>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/">Top Rated</Link></li>
                    <li><Link to="/">Trending</Link></li>
                    <li><Link to="/">Highest Grossing</Link></li>
                </ul>
                <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <path
                            d="M25.0001 4.16667C22.2642 4.16667 19.5551 4.70554 17.0275 5.75251C14.4999 6.79949 12.2032 8.33406 10.2687 10.2686C6.36168 14.1756 4.16675 19.4747 4.16675 25C4.16675 34.2083 10.1459 42.0208 18.4167 44.7917C19.4584 44.9583 19.7917 44.3125 19.7917 43.75V40.2292C14.0209 41.4792 12.7917 37.4375 12.7917 37.4375C11.8334 35.0208 10.4792 34.375 10.4792 34.375C8.58342 33.0833 10.6251 33.125 10.6251 33.125C12.7084 33.2708 13.8126 35.2708 13.8126 35.2708C15.6251 38.4375 18.6876 37.5 19.8751 37C20.0626 35.6458 20.6042 34.7292 21.1876 34.2083C16.5626 33.6875 11.7084 31.8958 11.7084 23.9583C11.7084 21.6458 12.5001 19.7917 13.8542 18.3125C13.6459 17.7917 12.9167 15.625 14.0626 12.8125C14.0626 12.8125 15.8126 12.25 19.7917 14.9375C21.4376 14.4792 23.2292 14.25 25.0001 14.25C26.7709 14.25 28.5626 14.4792 30.2084 14.9375C34.1876 12.25 35.9376 12.8125 35.9376 12.8125C37.0834 15.625 36.3543 17.7917 36.1459 18.3125C37.5001 19.7917 38.2917 21.6458 38.2917 23.9583C38.2917 31.9167 33.4168 33.6667 28.7709 34.1875C29.5209 34.8333 30.2084 36.1042 30.2084 38.0417V43.75C30.2084 44.3125 30.5417 44.9792 31.6042 44.7917C39.8751 42 45.8334 34.2083 45.8334 25C45.8334 22.2641 45.2945 19.555 44.2476 17.0274C43.2006 14.4998 41.666 12.2032 39.7315 10.2686C37.7969 8.33406 35.5003 6.79949 32.9727 5.75251C30.445 4.70554 27.736 4.16667 25.0001 4.16667Z"
                        />
                    </svg>
                </a>
            </div>
            <div className="mobile">
                <svg onClick={toggleNav} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                     fill="none">
                    <path d="M6.25 21.25H23.75M6.25 15H23.75M6.25 8.75H23.75" stroke="white" strokeWidth="3"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </nav>
    )
}