import React from 'react'
import PropTypes from 'prop-types'

const underscore = '_ '


const Mots = ({ lettre, feedback }) => (

        <span className = 'symbol' lettre = {lettre} feedback = 'hidden'>

            {feedback === 'hidden' ? underscore : lettre}

        </span>
)

Mots.propTypes = {
    lettre : PropTypes.string.isRequired,
    feedback : PropTypes.oneOf([
        'hidden',
        'visible'
    ]).isRequired
}

export default Mots