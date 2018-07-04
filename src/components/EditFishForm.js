import React from "react";
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.status,
      desc: PropTypes.string,
      image: PropTypes.image
    }),
    index: PropTypes.string,
    updatedFish: PropTypes.func
  }

  handleChange = event => {
    console.log(event.currentTarget.name);
    //update that fish
    //1. take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      //computed value names with [] replacing e.g 'name'
      [event.currentTarget.name]: event.currentTarget.value
    };

    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.props.fish.name}
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          value={this.props.fish.price}
        />
        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea
          name="desc"
          onChange={this.handleChange}
          value={this.props.fish.desc}
        />
        <input
          type="text"
          name="image"
          onChange={this.handleChange}
          value={this.props.fish.image}
        />
        <button onClick={ () => this.props.deleteFish(this.props.index) }>Remove Fish</button>
      </div>
    );
  }
}

export default EditFishForm;
