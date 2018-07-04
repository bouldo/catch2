import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {

    static propTypes = {
        addFish: PropTypes.func
    }

    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();


createFish = (event) => {
    

    event.preventDefault();
    const fish = {
        name: this.nameRef.value.value,
        price: parseFloat(this.priceRef.value.value), //use parseFloat for currency to store everything in cents
        status: this.statusRef.value.value,
        desc: this.descRef.value.value,
        image: this.imageRef.value.value
    }

   //add new fish to fishes object at App level 
   this.props.addFish(fish);

   //refresh the form 
   event.currentTarget.reset(); 
}

    render() {
        return (
            <form className="fish-edit" action="" onSubmit={this.createFish}>
              <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
              <input name="price" ref={this.priceRef} type="text" placeholder="Price" />
              <select name="status" ref={this.statusRef}>
                  <option value="available">Fresh!</option>
                  <option value="unavailable">Sold out!</option>
                  </select>
              <textarea name="desc" ref={this.descRef} type="text" placeholder="Description" />
              <input name="image" ref={this.imageRef} type="text" placeholder="Image" />
           <button type="submit" className="">+ Add Fish</button>
            </form>     
        );
    }
}

export default AddFishForm;