import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

function User_info({ user_data, isauth }) {

    if (isauth) {
        return (
            <div className="col-md-4 my-2 my_card mx-auto">
                <div className="card">
                    <h1>User Details</h1>
                    <div className="card-body">
                        <p className="card-title text-center">Name : {user_data[0].name}</p>
                        <p className="card-text text-center">Age : {user_data[0].age}</p>
                        <p className="card-text text-center">Email : {user_data[0].email}</p>
                        <p className="card-text text-center">Mobile : {user_data[0].mobile}</p>
                        <p className="card-text text-center">License No : {user_data[0].lisenceId}</p>
                        <hr />

                        <Link to='/' style={{ textDecoration: "none" }}>
                            <button className="text-success btn btn-outline-light mx-auto d-block">
                                Go to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                Sorry, User didn't login yet
            </div>
        )
    }


}

const mapStateToProps = state => ({
    user_data: state.user.user_data,
    isauth: state.user.isauth
});


export default connect(mapStateToProps, null)(User_info);