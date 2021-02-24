import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AddFavorite, GETFavoritesState, DelFromFavorite } from '../../Store/Actions';


class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
        this.props.GETFavoritesState();
        this.data();
    }

    async data(){
        console.log('Store2', this.props);
        let data = await this.props.Favorite.FavoriteData;
        let BigDATA = [];
        for(let index = 0; index < data.length ; index++){
            const user = data[index];
            const fetchUsers =  async (user) => {
                const api_call = await fetch(`https://api.github.com/users/${user}`)
                const data = await api_call.json();
                return { data };
            };
            fetchUsers(user).then((res) => {
                if(!res.data.message){
                    res.data.is_here = true;
                    BigDATA.push(res.data);
                    this.setState({ users: BigDATA })
                }
            })
        }
    }

    RemoveFromFavorite(user){
        this.props.DelFromFavorite(user);

        let array = this.state.users;
        let newArr = [];

        for (let index = 0; index < array.length; index++)
        {
            const el = array[index];
            if (el.login === user)
            {
                el.is_here = false;
            }
            newArr.push(el);
        }
        this.setState({ users: newArr });
    }


    ReAddToFav(user){
        this.props.AddFavorite(user);
        let array = this.state.users;
        let newArr = [];

        for ( let index = 0; index < array.length; index ++)
        {
            const el = array[index];
            if (el.login === user)
            {
                el.is_here = true;
            }
            newArr.push(el);
        }
        this.setState({ users: newArr});
    }

    GoFetchOnenewUser(data){
        this.props.history.push({
            pathname: `/Specific/${data}`,
        })
    }


    render() {
        return (
            <Fragment>

                <main role="main">
                    <div className="album py-5 bg-light">

                        <div className="container">

                            <div className="row">

                                {this.state.users.map( user => (
                                    <div  key={user.id} className="col-md-4">
                                        <div  key={user.id} className="card mb-4 shadow-sm">
                                            <img className="bd placeholder-img card-img-top"
                                                width="100%" height="225"
                                                 src={ user.avatar_url} alt={ user.avatar_url }
                                            />
                                            <div className="card-body">
                                                <p className="card-text text-center">
                                                    Name: { user.login }
                                                </p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group">
                                                        <button   type="button"
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={ () => { this.GoFetchOnenewUser(user.login) }}
                                                            key={ user.id }
                                                           >View
                                                        </button>
                                                    </div>

                                                    {user.is_here ?
                                                        <button type="button"
                                                                onClick={ () =>{ this.RemoveFromFavorite(user.login) }}
                                                                className="btn btn-sm"
                                                        >
                                                            <i className="fas fa-heart Fave"/>
                                                        </button>
                                                        :
                                                        <button type="button" className="btn btn-sm"
                                                            onClick={ () => { this.ReAddToFav(user.login) }}
                                                        >
                                                            <i className="fas fa-heart NotFave"/>
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </main>

            </Fragment>
        );
    }
}

Favorite.propTypes = {
    AddFavorite: PropTypes.func.isRequired,
    DelFromFavorite: PropTypes.func.isRequired,
    GETFavoritesState: PropTypes.func.isRequired,
    Favorite: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    Favorite: state.Favorite
})


export default connect(mapStateToProps, {AddFavorite, DelFromFavorite, GETFavoritesState }) (Favorite);
