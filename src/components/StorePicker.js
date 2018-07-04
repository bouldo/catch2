import React from 'react';

import { getFunName } from '../helpers.js';

class StorePicker extends React.Component { 

    myInput = React.createRef();

    gotoStore = event => {
        //stop form from submitting
        event.preventDefault();
        //get text from input 
        let storeName = this.myInput.value.value;
        //change page to /store/whatever was entered
        this.props.history.push(`/store/${storeName}`);
        console.log(this.storeName  );

        
    }

    render() {
        return (
            <React.Fragment>

                <form action="" className="store-selector" onSubmit={this.gotoStore}>
                    <h2>Please enter a store</h2>
                    <input 
                        type="text"
                        ref={this.myInput}
                        required
                        placeholder="Store Name"
                        defaultValue={getFunName()}
                    />
                    <button type="submit" >Visit Store ></button>
        
                </form>
            </React.Fragment>
        )
    }
}

export default StorePicker;