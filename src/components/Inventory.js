import React from "react";
import PropTypes from "prop-types";
import Login from './Login';
import firebase from 'firebase';
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import base, { firebaseApp } from "../base";



class Inventory extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  }

  state = {
    uid: null,
    owner: null  
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.authHandler({user});
      }
    })    
  }

  authHandler = async authData => {
    //1.look up the current store (storeName) in the firebase database
    const store = await base.fetch(this.props.storeId, {context: this});
    console.log(store);
    //2. Claim it if there is no owner
    if(!store.owner) {
      //save the store as ours
      await base.post(`${this.props.storeId}/owner`,{
        data: authData.user.uid
      });
    }
    //3. set the state of Inventory to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });

    console.log(authData);


  }
  
  

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    console.log("authenticate: " + authProvider);
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }   

  logout = async () => {
    console.log("Logging out!");
    await firebase.auth().signOut();
    this.setState({uid:null});
  }

  render() {

    const logout = <button onClick={this.logout}>Log out! </button>

    //check if they are logged in 
    if(!this.state.uid){
      return <Login authenticate={this.authenticate} />;

    }

    //check if the user is not the owner of the store

    if(this.state.uid !== this.state.owner){
      return (
        <div>
        <p>Sorry you are not the owner of this store</p>
        {logout}
        </div>
        )
    }

    //if no objections then they are the owner - display inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;