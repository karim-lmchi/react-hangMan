import React, { Component } from 'react'
import './App.css'
import GuessCount from './GuessCount'
import ButtonLettre from './ButtonLettre'
import Mots from './Mots'


const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

const motsChercher = ["DOM", "MARDI", "COMPOTE", "BRILLANTS", "PHOTOCOPIER", "ABOUTISSEMENT", "INCOMPREHENSION"]



class App extends Component {

  state = {
    // Génération du mot aléatoire
    motUnderscored : this.motAleatoire(),
    // Tableau qui récupère la valeur du boutton cliqué
    currentButton : [],
    // Tableau qui récupére les lettres deja trouvées
    //matchedWordIndice : [],
    guesses : 0,
    wordFound : [],
  }

  
  motAleatoire() {

    // Choix d'un élément aléatoire du tableau de mots
    const motCacher = motsChercher[Math.floor(Math.random()*motsChercher.length)]

    // Création d'un tableau qui récupére chacunes des lettres du mot aléatoire généré
    const usedWord = []

    // split permet de retirer les guillemets du mot aléatoire
    const word = motCacher.split('')

    // Boucle qui rajoute chacune des lettres du mot dans un tableau
    while (word.length > 0) {
      // shift extrait le 1er élément du mot
      const usedLetter = word.shift()
      // l'élément extrait est ajouté au tableau
      usedWord.push(usedLetter)
    }
    //console.log(usedWord)

    return usedWord
  }

  // Arrow function pour le binding (garantir le this)
  // Elle permet de récupérer chaques lettres de manière unique dans un tableau
  differentLetter = () => {
    // Récupération de l'état local
    const { motUnderscored } = this.state
    // tableau qui va récupérer nos lettres uniques
    const wordDifferentLetters = []
    // tableau associatif qui va nous servir à les stocker provisoirement
    const obj = {}
    
    for (var i = 0; i < motUnderscored.length; i++) {
      // Ajout de chaques lettres dans le tableau et si on a un doublon, il n'est pas ajouté
      obj[motUnderscored[i]] = 0
    }

    for (var k in obj) {
      // Rajout des élément du tableau associatif obj au tableau normal
      wordDifferentLetters.push(k)
    }

    return wordDifferentLetters
  }

  // Arrow function pour un binding (garantir le this)
  // Elle réagit au click sur une lettre
  buttonClicked = lettre => {
    // Récupération des états locaux
    const { currentButton, guesses, wordFound, motUnderscored } = this.state

    //console.log(currentButton.length)

    // test pour .some qui a besoin d'une fonction
    // Récupération de la valeur de la lettre
    const found = (function(element) {
      return element === lettre
    })
    // Si la lettre n'est pas déja présente dans le tableau currentButton
    // et que le tableau motUnderscored contient la lettre
    // .some renvoie un booléen
    if ( (currentButton.some(found) === false) && 
      (motUnderscored.some(found) === true) ) {
        // Ajout de la lettre dans le tableau wordFound
        wordFound.push(lettre)
                  
      }
  
    //console.log(wordFound)

    // Mise à jours des états locaux
    // Ajout au tableau currentButton la valeur du boutton cliqué
    // incrémentation du nombre de d'essaies
    this.setState ({ currentButton : [...currentButton, lettre],
                     guesses: (guesses + 1) })

    //console.log(currentButton)
 
  }

  // Méthode qui permet de faire apparaitre le mot s'il est bon
  getFeedbackForWord(lettre) {
    // Récupération de l'état local
    const { currentButton } = this.state

    // Analyse de la présence de la lettre dans le tableau (booléen)
    // Détermine si currentButton contient la lettre
    return currentButton.includes(lettre)
  
}

  // Arrow function pour garantir le binding
  newGame = () => {
    // Retour à l'état initial
    this.setState({currentButton: [],
                   motUnderscored: this.motAleatoire(), 
                   guesses : 0,
                   wordFound : [],
                  })
  }


  render() {
    const { motUnderscored, guesses, wordFound } = this.state

    // constante qui gère la victoire
    const won = wordFound.length === this.differentLetter().length

    return (

      <div className="App">

        <div>
          <h1>
            Jeu du pendu :
          </h1>
        </div>
          <span>
            {/* Boucle sur le tableau alphabet pour gérer l'affichage des boutons */}
            {alphabet.map((lettre, index) => (
              <ButtonLettre lettre = {lettre} 
                            onClick = {this.buttonClicked}
                            key = {index}
                            // Si la fonction getFeedBackForWord est true, alors le bouton change de couleur
                            feedback = { this.getFeedbackForWord(lettre) ? "grey" : "yellow"}
                            />
              
              ))}
          </span><br/><br/>

          <span>
            <GuessCount guesses = {guesses}/>
          </span>

          <span>
            {/* Boucle sur le tableau motUnderscored pour gérer l'affichage du mot caché */}
            {motUnderscored.map((lettre, index) => (
              <Mots lettre = {lettre} 
                    // Si la fonction getFeedBackForWord est true, alors le mot s'affiche
                    feedback = {this.getFeedbackForWord(lettre) ? "visible" : "hidden"}
                    key = {index}
                    />
            ))}
          </span><br/><br/>

          <span>
            {/* Si won est true alors on affiche le message */}
            { won && <h1>GAGNééé !!!</h1> }
          </span>

          <span>
            <button className="btn btn-info" onClick={this.newGame}>
              Nouvelle partie
            </button>
          </span>

      </div>
    );
  }
}

export default App;