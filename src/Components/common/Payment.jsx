import React, { useState } from 'react';
import { connect } from 'react-redux';
import ISLoader from "./Isloader";
import swal from "sweetalert"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const Payment = (props) => {
    console.log(props)
    const { cart, res_name, amount } = props

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

    let total = Number(amount) - Number(coupon_value)

    const [loading, setLoading] = useState(false);

    let today = new Date();
    //let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

    const clickHandler = () => {
        setLoading(true);
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
                        {cart.map(ele => {
                            return (
                                <div style={{ textAlign: "center" }}>
                                    <div className="card-text">{ele.name}</div>
                                    <br></br>
                                    <div className="card-text" style={{ fontWeight: "bold" }}>{ele.price}  x  {ele.quantity}  =  {Number(ele.price) * Number(ele.quantity)}</div>
                                    <br></br>
                                </div>
                            )
                        })}
                        {iscoupon ? <h1 className="card-text"></h1> :
                            <h1 className="card-text">Total  Amount : {amount}</h1>}
                        {iscoupon ? <strong>Discount Amount : {coupon_value}</strong> : null}
                        {iscoupon ? <h1 className="card-text">Total Payable Amount : {total} </h1> : null}
                    </div>
                </div>

                <Button color="success" onClick={toggle}>Apply Coupon</Button>
                <Modal isOpen={modal} modalTransition={{ timeout: 100 }} backdropTransition={{ timeout: 100 }}
                    toggle={toggle} >
                    <ModalHeader toggle={toggle} className="text-center">Coupons</ModalHeader>
                    <ModalBody >
                        <div onChange={handleCoupon}>
                            <label>
                                <input type="radio" value="50" name="gender" />Food Coupon Code for All Users : 40% Off upto Rs. 700 on Vehicle rental Order
                            </label>
                            <hr />
                            <label>
                                <input type="radio" value="70" name="gender" />Food Promo Code - Avail Instant Rewards upto Rs. 500 on Orders via Paytm
                            </label>
                            <hr />
                            <label>
                                <input type="radio" value="60" name="gender" />Food Coupon Code for All Users : 40% Off upto Rs. 800 on Orders via Tez
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
    cart: state.cart,
    amount: state.amount,
    res_name: state.res_name

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Payment);