import React from "react";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { addItems, minusItems, getPay } from '../../Redux/action'

function Booking(props) {


    console.log(props)

    const { item, addItems, minusItems, getpay, amt } = props






    // if (!is_auth) {
    //     return (<Redirect to='/login' />)
    // }

    // if (loading) {
    //     return (
    //         <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
    //             <br />
    //             <br />
    //             <h1 >Getting bill details...</h1>
    //             <br />
    //             <br />
    //             <br />
    //             <br />
    //             <GridSpinner
    //                 size={200}
    //                 color="#000000"
    //             />
    //         </div>
    //     )
    // }

    // else if (direct) {
    //     return (<Redirect to={`${props.match.url}/pay`} />)
    // }


    return (
        <div>
            {item.map(ele => {
                return (
                    <div class="card mb-3">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src={ele.img} height="200px" class="card-img" alt="..." />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{ele.name}</h5>
                                    <p class="card-text">{ele.price}</p>
                                    <button class="btn btn-danger" style={{ height: "50px", width: "40px" }} onClick={() => { minusItems(ele.id) }}>-</button>
                                    <input class="col-sm-3 my-1" style={{ height: "50px", borderTop: "none", borderLeft: "none", borderRight: "none", fontSize: "25px", fontWeight: "bold", textAlign: "center" }} value={ele.quantity} />
                                    <button class="btn btn-success" style={{ height: "50px", width: "40px" }} onClick={() => { addItems(ele.id) }}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <Link to="/pay">
                <button
                    class="btn btn-primary btn-lg btn-block"
                    style={{ position: "fixed", bottom: "0", fontSize: "40px" }}
                    onClick={() => { getpay() }}
                >
                    <span style={{ textAlign: "left", marginRight: "900px", marginLeft: "0" }}>Amount</span>
                    <span style={{ textAlign: "right", marginRight: "40px" }}>{amt}</span>
                    <spam >></spam>
                </button>
            </Link>

        </div >
    );

}

const mapStateToProps = state => ({
    item: state.item,
    is_auth: state.is_auth,
    res_name: state.res_name,
    cart: state.cart,
    amt: state.amount
});

const mapDispatchToProps = dispatch => ({
    addItems: (payload) => dispatch(addItems(payload)),
    minusItems: (payload) => dispatch(minusItems(payload)),
    getpay: () => dispatch(getPay())

});

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
