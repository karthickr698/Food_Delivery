import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import swal from 'sweetalert'
//import logos from "../logo1.png";
import { connect } from "react-redux";
import Home from "../Components/common/Home";
import Booking from "../Components/common/Booking";
import Payment from "../Components/common/Payment";
import Register from "../Components/auth/Register";
import Login from "../Components/auth/UserLogin";
//import { logout } from "../Redux/userAction";
// import BillHistory from '../Components/common/bill_history';
// import UserInfo from '../Components/common/user_info'

class Routing extends Component {

    render() {
        const { isauth } = this.props;
        return (
            <>
                <div className=" p-3">
                    <h2 className="text-center display-5">Food Delivery System</h2>
                    <ul className="nav">
                        <li
                            onClick={this.change}
                            name="home"
                            className="nav-item "
                            style={{ marginTop: "30px", fontSize: "20px" }}
                        >
                            <Link
                                onClick={this.change}
                                name="home"
                                to="/"
                                className="text-dark nav-link active"
                            >
                                Home
              </Link>
                        </li>
                        <li className="nav-item" style={{ marginTop: "30px", fontSize: "20px" }}>
                            <Link
                                onClick={this.change}
                                name="book"
                                to="/booking"
                                className="nav-link text-dark"
                            >
                                Bookings
              </Link>
                        </li>
                        <li className="nav-item" style={{ marginTop: "30px", fontSize: "20px" }}>
                            <Link
                                onClick={this.change}
                                name="user"
                                to="/user"
                                className="nav-link text-dark"
                            >
                                user
              </Link>
                        </li>
                        <li className="nav-item">
                            {isauth ? (
                                <button
                                    onClick={() => {
                                        swal("Logout Successful", "", "success")
                                        this.props.logout()
                                    }}
                                    className="btn btn-dark"
                                    style={{ marginTop: "30px" }}
                                >
                                    Log Out
                                </button>
                            ) : (
                                    <div>
                                        <li
                                            className="nav-item"
                                            style={{ marginTop: "30px", float: "left" }}
                                        >
                                            <Link to="/register" className="text-dark nav-link">
                                                Register
                    </Link>
                                        </li>
                                        <li
                                            className="nav-item"
                                            style={{ marginTop: "30px", float: "left" }}
                                        >
                                            <Link to="/login" className="text-dark nav-link">
                                                Login
                    </Link>
                                        </li>
                                    </div>
                                )}
                        </li>
                    </ul>
                    <hr />
                </div>
                <div className="">
                    <Switch>
                        <Route exact path="/" component={() => <Home />} />
                        <Route
                            path="/register"
                            component={(props) => <Register {...props} />}
                        />
                        <Route path="/login" component={(props) => <Login {...props} />} />
                        <Route
                            exact
                            path="/booking/:id"
                            component={(props) => <Booking {...props} />}
                        />
                        <Route
                            path="/pay"
                            component={(props) => <Payment {...props} />}
                        />
                        {/*<Route
                            path="/booking/:name/pay"
                            component={(props) => <Payment {...props} />}
                        />
                         <Route exact path="/booking" component={() => <BillHistory />} />
                        <Route exact path="/user" component={() => <UserInfo />} />
                            */}
                        <Route render={() => <div>404 Not Fount</div>} />
                    </Switch>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isauth: state.is_auth,
});

const mapDispatchToProps = (dispatch) => ({
    //logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routing);