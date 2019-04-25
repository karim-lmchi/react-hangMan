import React from 'react'
import PropTypes from 'prop-types'

const GuessCount = ({ guesses }) => (

    <div className = "guesses">
    
        Nombre de tentatives : {guesses}
    
    </div>

)

GuessCount.propTypes = {
        guesses : PropTypes.number.isRequired
}

export default GuessCount