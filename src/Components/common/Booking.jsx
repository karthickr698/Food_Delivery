import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { GridSpinner } from "react-spinners-kit";
import { booking_data } from "../../Redux/userAction";
import swal from "sweetalert"

function Booking(props) {

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0)
    const [destination, setDestination] = useState(0)


    let dt = new Date();
    let dateNow = dt.getUTCDate();
    let year = dt.getUTCFullYear();
    let month = dt.getUTCMonth();
    month = month + 1;

    const [loading, setLoading] = useState(false);
    const [direct, setdirect] = useState(false);

    let name = props.match.params.name;
    let vehicle = props.data.find(ele => {
        return ele.modal_name === name;
    });

    const clickHandler = () => {
        if (start.length > 0 && end.length > 0 && destination.length > 0) {
            props.booking_data(start, end, destination, vehicle)
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
                setdirect(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
        else {
            swal("All Fields Are Required")
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "start")
            setStart(e.target.value)
        else if (e.target.name === "end")
            setEnd(e.target.value)
        else
            setDestination(e.target.value)
    }

    const { is_auth, user_data } = props

    if (!is_auth) {
        return (<Redirect to='/login' />)
    }

    if (loading) {
        return (
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <br />
                <br />
                <h1 >Getting bill details...</h1>
                <br />
                <br />
                <br />
                <br />
                <GridSpinner
                    size={200}
                    color="#000000"
                />
            </div>
        )
    }

    else if (direct) {
        return (<Redirect to={`${props.match.url}/pay`} />)
    }

    else {
        return (
            <div>
                <h3 className="text-dark">Welcome {user_data[0].name}</h3>
                <div class="card mb-3 mx-auto" style={{ maxWidth: "540px" }}>
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img height="100%" width="100px" src={vehicle.img_url} class="card-img" alt="..." />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title"><u>{vehicle.category} Details</u></h5>
                                <p className="card-title text-center">Company : <strong>{vehicle.company}</strong></p>
                                <p className="card-text text-center">Modal : <strong>{vehicle.modal_name}</strong></p>
                                <p className="card-text text-center">Location : <strong>{vehicle.location}</strong></p>
                                <p className="card-text text-center">cost per day : <strong>{vehicle.cost.per_day}</strong></p>
                                <p className="card-text text-center">cost after 5 days : <strong>{vehicle.cost.after_5}</strong></p>
                                <p className="card-text text-center">cost sfter 10 days : <strong>{vehicle.cost.after_10}</strong></p>
                                <p className="card-text text-center">Vehicle No : <strong>{vehicle.vehicle_no}</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 m-auto">
                    <h5>Fill details</h5>
                    <div className="col-md-6 offset-1 mx-auto d-block">
                        <select
                            className="form-control"
                            onChange={handleChange}
                        >
                            <option disabled selected className="text-center">
                                Select Destination
                            </option>
                            <option>chennai</option>
                            <option>trichy</option>
                            <option>bangalore</option>
                            <option>hyderabad</option>
                        </select>
                    </div>
                    <span className="form-control m-2">
                        Start Date :
                    <input type="date" name="start" onChange={handleChange} />
                    </span>
                    <span className="form-control m-2 ">
                        End Date :{" "}
                        <input
                            type="date"
                            name="end"
                            min={year + "--" + month + "-" + dateNow}
                            onChange={handleChange}
                        />
                    </span>

                    <button className="btn btn-success my-4" onClick={clickHandler}>
                        Get Pay Details
                    </button>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    data: state.rent.data,
    is_auth: state.user.isauth,
    user_data: state.user.user_data
});

const mapDispatchToProps = dispatch => ({
    booking_data: (start, end, destination, vehicle) => dispatch(booking_data(start, end, destination, vehicle))
});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
