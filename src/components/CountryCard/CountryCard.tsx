import React from 'react'

import Button  from '@material-ui/core/Button'

import {Link} from 'react-router-dom'

import './countrycard.scss'





type CountryCardProps = {
    flag: string
    name: string
    region: string
    population: number
}


const CountryCard=({flag, name, region, population}:CountryCardProps) =>{
    return (
        <div  className="country-card" key={name}>
            <Link to={`/country/${name}`} className="country-card__wrapper">
                {/*flag image*/}
                <img src={flag} alt={name} />

                <h2 className="country-card__name">{name}</h2>
                <h2 className="country-card__region">{region}</h2>
                <h2 className="country-card__population">{population}</h2>
            </Link>
        </div>
    )
}

export default CountryCard
