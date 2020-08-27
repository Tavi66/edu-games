import React, { Component } from 'react';
import classes from './Hangman.module.css';
import SightWords from './SightWords';

const DisplayLetters = (props) => {
    let pool = props.letters.map(letter => {
        return(
        <li key={letter} className={classes.Tile}
        onClick={() => props.letterClickHandler(letter)}
        > 
        {letter}
        </li>
        )
    })

    return(
        <div>
            <ul>
            {props.word.length > 1 ? pool : null}
            </ul>
        </div>
    )
}

class Hangman extends Component {
    state = {
        word: '',
        wordArr: [],
        guessArr: [],
        length: 0,
        pool: [],
        selected: [],
        letterSelected:'',
        lettersLeft: -1,
    }

    letterClickHandler = (letter) => {
        console.log(letter, ' clicked!');
        let updatedSelectedList = [...this.state.selected, letter];
        this.setState({letterSelected: letter});
        this.setState({selected: updatedSelectedList});
        this.checkLetter(letter);
        this.removeLetter(letter);
    }

    removeLetter = (character) => {
        let arr = this.state.pool;
        let index = arr.indexOf(character);
        arr.splice(index,1);
        this.setState({pool: arr});
    }

    checkLetter = (character) => {
        let wordArr = this.state.wordArr;
        let found = false;
        let lettersLeft = this.state.lettersLeft;
        let remainingLetters = this.state.guessArr;

        if(lettersLeft > 0) {        
            wordArr.forEach((letter, index) => {
            if(letter === character)
             {
                //console.log(letter, ' found at index ', index);
                remainingLetters[index] = letter;
                lettersLeft -= 1;
                //console.log('left: ', lettersLeft);
                found = true;
             }
            });
        }

        if(found){        
            console.log('Remaining: ', remainingLetters);
            this.setState({
                guessArr: remainingLetters,
                lettersLeft: lettersLeft
        });
        }

    }

    generateWord = () => {
        let word = SightWords();
        word = word.toLowerCase();   

        let length = word.length;
        let wordArr = word.split('');
        let guessArr = [];

        for( let i = 0; i < length; i++) {
            guessArr.push('_');
        }

        this.setLetterPool();

        this.setState({
            wordArr: wordArr,
            word: word,
            length: length,
            lettersLeft: length,
            guessArr: guessArr});
        //console.log(word,' ', length);
    }

    generateTiles = () => {
        let guessArr = this.state.guessArr;
        let wordArr = this.state.wordArr;

        let wordTiles = guessArr.map((letter, index) => {
            return(
                <li className={classes.Tile} key={letter+index}>
                    {letter === '_' ? '__' :  wordArr[index]}
                </li>
            )
        })
        return (
            <ul>
                {wordTiles}
            </ul>
        )
    }

    setLetterPool = () => {
        let letterPool = [];
        for( let i = 97; i < 123; i++){
            let letter = String.fromCharCode(i);
            letterPool.push(letter);
        }
        this.setState({pool:letterPool});
        //console.log('Set letter pool! ', letterPool);
    }

    componentDidMount = () => {
    }

    componentDidUpdate = () => {
        // if(this.state.lettersLeft === 0)
        // this.setState({lettersLeft: -1})
    }

    render() {
        return(<div>
            {
                this.state.lettersLeft === 0 ?
                 <h2>You win!</h2>:
                null
            }            
            {/* <button onClick={this.generateWord}>New Word</button> */}
            <div onClick={this.generateWord} className={classes.NewWordButton}>
                <p>NEW WORD</p>
            </div>
            {/* <p>
                {this.state.word}
            </p> */}
                {this.state.word.length > 0 ? this.generateTiles() : null}
            <DisplayLetters
            letterClickHandler={this.letterClickHandler} 
            letters={this.state.pool}
            word={this.state.word}
            />
        </div>)
    }
}

export default Hangman;