import React from 'react'
import './Header.css'
import covid19loader from '../../images/covid-19.jpg'
function Header() {
    return (
        <div className="col-md-12 col-xs-10">
            <h1 className="header">C<img src={covid19loader} alt="Covid19"/>VID-19</h1>

            </div>
    )
}

export default Header;