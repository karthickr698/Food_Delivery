import React, { useState } from 'react';
import { connect } from 'react-redux';
import ISLoader from "./Isloader";
import swal from "sweetalert"
import { payment_data } from '../../Redux/userAction'
import { showBookings } from '../../Redux/rentAction'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const Payment = (props) => {
    const { booking, className } = props

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const handleSubmit = () => {
        setModal(!modal)
    }

    const [pay, setPay] = useState(0)
    const handleChange = (e) => {
        setPay(e.target.value)
    }

    const handleCoupon = (e) => {
        setIscoupon(true);
        setValue(e.target.value)
    }

    const [iscoupon, setIscoupon] = useState(false)
    const [coupon_value, setValue] = useState(0)
    let billId = 4890;

    let total = (Number(booking.vehicle.cost.per_day) * 5) - Number(coupon_value)

    const [loading, setLoading] = useState(false);

    let today = new Date();
    let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

    const clickHandler = () => {
        setLoading(true);
        let bill_data = {
            "billId": String(billId++),
            "billAmount": String(total),
            "startDate": String(booking.startDate),
            "endDate": String(booking.endDate),
            "bookedDate": String(date),
            "origin": String(booking.vehicle.location),
            "destination": String(booking.des),
            "vehicle_no": String(booking.vehicle.id),
            "paymentMethod": String(pay),
            "category": String(booking.vehicle.category)
        }
        props.showBookings(booking.vehicle.id)
        props.payment_data(bill_data)
        const timer = setTimeout(() => {
            setLoading(false);
            swal("Payment Successful", "Your booking has been made! ", "success");
            props.history.push("/");
        }, 3000);
        return () => clearTimeout(timer);
    };

    if (loading) {
        return <ISLoader />;
    }
    else {
        return (
            <div>

                <div className="card mb-3 mx-auto" style={{ maxWidth: "540px" }}>
                    <div className="card-header">
                        Bill Details
                    </div>
                    <div className="card-body">
                        <p className="card-text">{booking.vehicle.category} Name : {booking.vehicle.company} {booking.vehicle.modal_name}</p>
                        <p className="card-text">Rent Start Date : {booking.startDate}</p>
                        <p className="card-text">Rent End Date : {booking.endDate}</p>
                        <p className="card-text">Origin Location : {booking.vehicle.location}</p>
                        <p className="card-text">Destination Location : {booking.des}</p>
                        <p className="card-text">Vehicle Number : {booking.vehicle.vehicle_no}</p>
                        {!iscoupon ? <h1 className="card-text">Total Payable Amount : {booking.vehicle.cost.per_day * 5}</h1> :
                            <h1 className="card-text">Total  Amount : {booking.vehicle.cost.per_day * 5}</h1>}
                        {iscoupon ? <strong>Discount Amount : {coupon_value}</strong> : null}
                        {iscoupon ? <h1 className="card-text">Total Payable Amount : {total}</h1> : null}
                    </div>
                </div>

                <Button color="success" onClick={toggle}>Apply Coupon</Button>
                <Modal isOpen={modal} modalTransition={{ timeout: 100 }} backdropTransition={{ timeout: 100 }}
                    toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle} className="text-center">Coupons</ModalHeader>
                    <ModalBody >
                        <div onChange={handleCoupon}>
                            <label>
                                <input type="radio" value="100" name="gender" />Vehicle Coupon Code for All Users : 40% Off upto Rs. 700 on Vehicle rental Order
                            </label>
                            <hr />
                            <label>
                                <input type="radio" value="200" name="gender" />Vehicle Promo Code - Avail Instant Rewards upto Rs. 500 on Orders via Paytm
                            </label>
                            <hr />
                            <label>
                                <input type="radio" value="300" name="gender" />Vehicle Coupon Code for All Users : 40% Off upto Rs. 800 on Orders via Tez
                            </label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <br />
                <br />

                <div className="col-md-6 offset-1 mx-auto d-block">
                    <select
                        className="form-control"
                        onChange={handleChange}
                    >
                        <option disabled selected className="text-center">
                            Select Payment Mode
                            </option>
                        <option>Tez</option>
                        <option>Paytm</option>
                        <option>Credit Card</option>
                        <option>Debit Card</option>
                    </select>
                </div>
                <br />

                <button className="btn btn-primary" onClick={clickHandler}>PAY</button>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    booking: state.user.booking
})

const mapDispatchToProps = dispatch => ({
    payment_data: (pay_details) => dispatch(payment_data(pay_details)),
    showBookings: (id) => dispatch(showBookings(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Payment);