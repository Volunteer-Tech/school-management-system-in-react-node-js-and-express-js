import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div className="footer ">
        <div className="float-right">
          <Link to="/about-us">About </Link>| <Link to="/contact">Contact</Link>
        </div>
        <div className="mr-auto">© Volunteer Tech®</div>
      </div>
    );
  }
}

export default Footer;
