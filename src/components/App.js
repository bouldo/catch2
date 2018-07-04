import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';



class App extends React.Component {



  state = {
    fishes: {},
    order: {}
  };

  //lifecycle method
  componentDidMount() {
    const params = this.props.match.params;
 
    //first reinstate localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    console.log(JSON.parse(localStorageRef));
    if(localStorageRef){
      this.setState({order: JSON.parse(localStorageRef)})
    }

    console.log('Component Mounted!');
    //load the fish from firebase
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() { 
    console.log(this.state.order);
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));

  }

  componentWillUnmount() {
    console.log('Component Unmounting!');

  }



  addFish = fish => {
    //make a copy of state
    const fishes = {...this.state.fishes};
    //add new fish to new fishes object variable
    fishes[`fish${Date.now()}`] = fish;
    //set new fishes object to state
    this.setState({ fishes: fishes });

  };

  updateFish = (key, updatedFish) => {
    //1. take a copy of the current state of a fish
    const fishes = {...this.state.fishes }
    //2. update that state
    fishes[key] = updatedFish;
    //3. set that to state
    this.setState({fishes}); 
  }

  deleteFish = (key) => {
    //1. take a copy of state
    const fishes = {...this.state.fishes};
    //2. update that state
    fishes[key] = null;
    //3. set that state
    this.setState({fishes});
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  }

  addToOrder = (key) => {
    //1. take a copy of state 
    const order = { ...this.state.order };
    //2. either add to order or increment the number in our order
    order[key] = order[key] + 1 || 1;
    //3. call setState to update our state object
    this.setState( {order} );
  }

  removeFromOrder = (key) => {
    //1. take a copy of state
    const order = {...this.state.order};
    //2. remove item from new order object
    delete order[key];
    //3. call set state
    this.setState({order});

  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
              {/*loop through object and output a fish component for each fishes object*/}
            {Object.keys(this.state.fishes).map(key => 
              <Fish 
                key={key}
                index={key}
                details={this.state.fishes[key]} 
                addToOrder={this.addToOrder} 
              />)} 
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder = {this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish = {this.updateFish}
          deleteFish = {this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId= {this.props.match.params.storeId}

        />
      </div>
    );
  }
}

export default App;
