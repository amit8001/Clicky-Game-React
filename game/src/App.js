import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Banner from "./components/Banner";
import friends from "./friends.json";
import "./App.css";

const shuffleArray = (array) => {
  for (let i=0; i<array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    result: "",
    clicked: [],
    gameOver: false
  };

  componentDidMount() {
    this.setState({result: "Please click one of the images to begin!"})
  };

  handleClick = (id) => {
    console.log(`Logo clicked with id: ${id}`);
    //if the id passed is not already present in the clicked array
    if(!this.state.clicked.includes(id)){
      this.increasePoints();
      this.state.clicked.push(id);
      this.setState({
        gameOver: false
      });
    } else {
      this.reset();
    }
  }

  increasePoints = () => {
    let score = this.state.currentScore + 1;
    console.log(`the score is ${score}`);
    //if your score is equal to the total number of friends in the friends array, then there is no more left and you Win!
    if (score === this.state.friends.length) {
      this.setState({
        result: "You win! Please start clicking to play again!",
        topScore: score,
        currentScore: 0,
        clicked: [],
        friends,
        gameOver: false
      });
    } else if (score > this.state.topScore) {
      this.setState({
        topScore: score,
        currentScore: score,
        result: "Yay!! New high score!",
      });
    } else {
      this.setState({
        currentScore: score,
        result: "Correct! Keep on clicking!"
      });
    }
    this.shufflefriendArray();
  }

    // reset the game when the user clicks on an image that is already clicked, ie. present in the clicked array.
    reset = () => {
      this.setState({
        points: 0,
        currentScore:0,
        topScore: this.state.topScore,
        result: "You lose...you had already clicked that one!",
        clicked: [],
        friends,
        gameOver: true
      });
      console.log('Game over? ', this.state.gameOver);
      this.shufflefriendArray();
    }
  
  
    // set the array to be mapped to a new scrambled version using shuffle algorithm
    shufflefriendArray = () => {
      let newScramble = shuffleArray(friends);
      //setting the state for friends property to be the new shuffled array 
      this.setState({friends: newScramble})
    }

  

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>**** Friends List ****</Title>
     
        <Banner 
          topScore={this.state.topScore} 
          currentScore={this.state.currentScore} 
          status={this.state.result}
        />
        {this.state.friends.map(friend => (
        <FriendCard
          id={friend.id}
          name = {friend.name}
          image={friend.image}
          handleClick={this.handleClick}
        />
        ))}
      </Wrapper>
    );
  }
}

export default App;