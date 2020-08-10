import React from "react";
import { Button } from '@material-ui/core'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchItem } from '../../Redux/action'
import swal from 'sweetalert'
import styles from './common.module.css'

function Table({ data, totalData, changePage, changePageData, filter, num, curr_page, fetchItem }) {
    let paginate = [];
    let j = 1;

    if (data.length > paginate.length) {
        for (let i = 0; i < totalData.length; i += Number(num)) {
            paginate.push(j);
            j++;
        }
    }

    const changeHandler = e => {
        filter(e.target.value);
    };
    return (
        <div>
            <div className=" row m-auto ">
                <div className="col-md-12" style={{ textAlign: "center" }}>
                    <select className="form-control" onChange={changeHandler}>
                        <option disabled selected>
                            Filter Data
                        </option>
                        <option>Show All</option>
                        <option>Show Available</option>
                        <option>Rating Lower to Higher</option>
                        <option>Rating Higher to Lower</option>
                    </select>
                </div>
            </div>
            <div className="row col-md-12 mt-4">
                {data.map(ele => {
                    return (
                        <div className="col-md-4 my-2 my_card" key={ele[0]} data-aos="fade-up-right" data-aos-offset="140" data-aos-delay="200" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-once="false">
                            <div className="card">
                                <div className="card-body">
                                    <img
                                        height="200px"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzBJBadyBwP3hSGvcCvyxgE95H0M5cfGDmMMYeWinyCamue0z7&usqp=CAU"
                                        className="card-img"
                                        alt="..."
                                    />
                                    <p className="card-title text-center">Name : {ele[1]}</p>
                                    <p className="card-text text-center">City : {ele[4]}</p>
                                    <p className="card-text text-center">Mobile : {ele[3]}</p>
                                    <p className="card-text text-center">Rating : {ele[5]}</p>
                                    <hr />
                                    <Link to={`/booking/${ele[0]}`} style={{ textDecoration: "none" }}>
                                        <button className="text-success btn btn-outline-light mx-auto d-block" onClick={() => { fetchItem(ele[0], ele[1]) }}>
                                            Order Now
                                            </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <hr />
            <div>
                <ul className="pagination pagination-lg justify-content-center" data-aos="fade-up-right" data-aos-offset="140" data-aos-delay="100" data-aos-duration="200" data-aos-easing="ease-in-out" data-aos-once="true">
                    {paginate.map(ele => {
                        if (ele == curr_page) {
                            return (
                                <li className="page-item active">
                                    <Button
                                        className={styles.active}
                                        onClick={() => {
                                            return changePage(ele);
                                        }}
                                        key={ele}
                                    >
                                        {ele}
                                    </Button>
                                </li>
                            );
                        }
                        else {
                            return (
                                <li className="page-item active">
                                    <Button
                                        className={styles.page}
                                        onClick={() => {
                                            return changePage(ele);
                                        }}
                                        key={ele}
                                    >
                                        {ele}
                                    </Button>
                                </li>
                            );

                        }
                    })}
                </ul>
                <div className="col-md-3 offset-1 mx-auto d-block" >
                    <select
                        className="form-control"
                        onChange={e => {
                            changePageData(e.target.value);
                        }}
                    >
                        <option disabled selected>
                            select per page
                    </option>
                        <option>6</option>
                        <option>30</option>
                        <option>45</option>
                        <option>60</option>
                        <option>100</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    fetchItem: (payload, name) => dispatch(fetchItem(payload, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
