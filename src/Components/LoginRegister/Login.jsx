import React, {Component} from 'react';



class Login extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <>
                <form className="form-signin">
                    <h4 className="h3 mb-3 font-weight-normal grey">Please sign in</h4>
                    <input name="email" type="email" className="form-control" placeholder="Email address"/>
                    <input name="password" type="password" className="form-control" placeholder="Password"/>
                    <button className="btn btn-md btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </>
        );
    }
}


export default Login;
