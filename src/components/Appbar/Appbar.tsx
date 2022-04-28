import React from 'react'
import Search from '../Search/Search'
import './appbar.scss'

const Appbar=()=> {
    return (
        <div className="appbar">
            <div className="appbar__content container">
                <div className="appbar__content-left">
                    <img className={"appbar__content-left__worldCircle" } src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kz6Hd8RbjroL7VD7PntlmQHaHa%26pid%3DApi&f=1" alt=""/>
                    <img src={process.env.PUBLIC_URL+'/images/country-api-logo-black.svg'} alt="country api text"/>
                </div>
            </div>

          
        </div>
    )
}

export default Appbar
