import React from "react";
import PropTypes from 'prop-types';


//stateless function component
const Header = (props) => (
    <React.Fragment>
      <header className="top">
        <h1>
          Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          day
        </h1>
      </header>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </React.Fragment>
); 

Header.propTypes = {
  tagline:  PropTypes.string.isRequired
}

export default Header;
