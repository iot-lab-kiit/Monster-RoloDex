import React,{ Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from "./components/search-box/search-box.component.jsx";
import './App.css';

class App extends Component{
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };

  }

  // this is not predefined in the scope of functions in js nut the arrow function binds code without using any other command
  OnSearchChange = (event) => {
    this.setState({ searchField: event.target.value })
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  render(){
    // takes our the states and puts them inconstants with same name 
    // just like const monsters = this.state.monsters;
    const { monsters, searchField} = this.state; 
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return(
          <div className="App">
            <h1>Monsters Rolodex</h1>
            <SearchBox 
              placeholder = 'search monsters'
              OnSearchChange = {this.OnSearchChange}
            />
            <CardList monsters={filteredMonsters} />
          </div>
        );
      }
  }

export default App;