import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    <h5 className="my-0 mr-md-auto font-weight-normal">React With Node</h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <Link to='/Favorite' className="p-2 text-dark" >
                            <i className="fas fa-heart">Favorites</i>
                        </Link>
                    </nav>
                    <a className="btn btn-outline-primary" href="#">Sign up</a>
                </div>
            </>
        );
    }
}


export default Nav;
