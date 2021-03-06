import React from 'react'
import PropTypes from 'prop-types'

//const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]


const ButtonLettre = ({ lettre, onClick, feedback, disabled }) => (

    
    <input type="button" 
           className = "buttonLettre" 
           value={lettre} 
           onClick = {() => onClick(lettre)}
           style = {{backgroundColor : `${feedback}`}}
           disabled =  {disabled }
           />
)

ButtonLettre.propTypes = {
    lettre : PropTypes.string.isRequired,
    onClick : PropTypes.func.isRequired,
    feedback : PropTypes.string.isRequired,
    disabled : PropTypes.bool.isRequired,
}

export default ButtonLettre
