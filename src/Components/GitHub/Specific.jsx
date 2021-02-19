import React, {Component} from 'react';
import Repose from "./Repose";
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { AddFavorite, DelFromFavorite, GETFavoritesState } from '../../Store/Actions';


class Specific extends Component {

    constructor(props) {
        super(props);
        this.state = {user: [],
            is_Favorite: false
        };

        //Get state
        this.props.GETFavoritesState();

        const FetchUser = async (user) => {
            const api_call = await fetch(`https://api.github.com/users/${user}`);
            const data = await api_call.json();
            return {data}
        };

        //Initialize the method
        FetchUser(props.match.params.login).then((res) => {
            if (!res.data.message) {
                this.setState({ user: res.data });
            }
        })
    }

    async componentDidMount() {
        console.log('specific', this.props.Favorite.FavoriteData);
        let data = this.props.Favorite.FavoriteData;
        let theUser = this.props.match.params.login;

        for (let index = 0; index < data.length; index++){
            const  el = data[index];
            if (el === theUser){
                this.setState({ is_Favorite: true });
            }
        }
    }

    AddToFav = () => {
        this.props.AddFavorite(this.state.user.login);
        this.setState({ is_Favorite: true });
    }

    removeFromFav = () => {
        this.props.DelFromFavorite(this.state.user.login);
        this.setState({ is_Favorite: false })
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
                                            {
                                                this.state.is_Favorite === false ?
                                                    <i onClick={this.AddToFav} className="fas fa-heart NotFave"/> :
                                                    <i onClick={this.removeFromFav} className="fas fa-heart Fave"/>
                                            }
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

Specific.prototypes = {
    AddFavorite: PropTypes.func.isRequired,
    DelFromFavorite: PropTypes.func.isRequired,
    GETFavoritesState: PropTypes.func.isRequired,
    Favorite: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    Favorite: state.Favorite
})

export default connect (mapStateToProps, {
    AddFavorite, DelFromFavorite, GETFavoritesState})(Specific);
