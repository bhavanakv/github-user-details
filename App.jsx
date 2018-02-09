import React from "react";
import axios from "axios";

const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
      	<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
        <div>{props.location}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
	return(
  	<div>
  		{props.cards.map((card, i) => <Card key={i} {...card} />)}
    </div>
  ); 
};

class Form extends React.Component {
	state = { userName: '' };
	handleSubmit = (event) => {
      event.preventDefault();
      
    axios.get(`https://api.github.com/users/${this.state.userName}`)
  .then(resp => {
  	this.props.onSubmit(resp.data);
    this.setState({userName: ''})
  });
  }
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
      	<input type="textbook" 
        value={this.state.userName}
        onChange={(event) => this.setState({userName: event.target.value})}
        placeholder="Github username" required/>
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
	state = {
  	data : []
}

addNewCard = (cardInfo) => {
	this.setState(prevState => ({
  	data: prevState.data.concat(cardInfo)
  }));
}
	render() {
  	return (
    	<div> 
    		<Form onSubmit={this.addNewCard}/>
      	<CardList cards={this.state.data} />
      </div>
    );
  }
}

export default App;