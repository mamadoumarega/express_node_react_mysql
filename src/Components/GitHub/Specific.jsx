import React, {Component} from 'react';
import Repose from "./Repose";

class Specific extends Component {
    constructor(props) {
        super(props);
        this.state = {user: []};

        const FetchUser = async (user) => {
            const Api_call = await fetch(`https://api.github.com/users/${user}`);
            const data = await Api_call.json();
            return {data};
        }
        //Initialize the method
        FetchUser(props.match.params.login).then((res) => {
            if (!res.data.message) {
                this.setState({user: res.data});
            }
        })
    }

    Data() {
        if (this.state.user.login === 0) {
            return (<i>There is no user found with give in user name : {this.props.match.params.login}</i>)
        } else {
            return (
                <div style={{textAlign: 'center'}}>
                    <section className="Specific">
                        <div className="main" id="main">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="SUsersData">
                                            <i className="fas fa-heart  NotFave"></i>
                                            <h4>Name :<i className="bl">{this.state.user.name}</i></h4>
                                            <img src={this.state.user.avatar_url} alt="profile_img"/>
                                            <h4>followers :<i className="bl">{this.state.user.followers}</i></h4>
                                            <h4>location :<i className="bl">{this.state.user.location}</i></h4>


                                            <Repose user={ this.props.match.params.login } />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                { this.Data() }
            </React.Fragment>
        );
    }
}

export default Specific;
