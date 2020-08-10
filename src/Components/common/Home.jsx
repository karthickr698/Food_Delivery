import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchHotel, fetchItem } from '../../Redux/action'
import DataTable from "./DataTable";
//import { searchVehicle } from '../../Redux/rentAction'

function Home({ res, item, fetchHotel }) {


    const [pageNo, setPageNo] = useState(1);
    const [noOfData, setNoOfData] = useState(6);
    const indexPrevData = Math.floor((pageNo - 1) * noOfData);
    const indexCurrData = pageNo * noOfData;
    const dataToShow = res.slice(indexPrevData, indexCurrData);

    const changePageData = num => {
        setNoOfData(num);
        return setPageNo(1);
    };


    const changePage = (num) => {
        return setPageNo(num);
    };

    useEffect(() => {
        fetchHotel();
    }, []);

    console.log(res)
    console.log(item)
    return (
        <div >
            <div data-aos="fade-up-right" data-aos-offset="140" data-aos-delay="200" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-once="false" >
                <div className="col-md-5 m-auto p-4">
                    <input
                        style={{ textAlign: "center" }}
                        className="form-control"
                        placeholder="search Restaurants "
                    />
                </div>
                <div className="col-md-10 m-auto p-4">
                    <h2 className="text-center pb-3">All Restaurants</h2>
                    <DataTable
                        data={dataToShow}
                        totalData={res}
                        changePage={changePage}
                        num={noOfData}
                        changePageData={changePageData}
                        curr_page={pageNo}
                    />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    res: state.res
});
const mapDispatchToProps = dispatch => ({
    fetchHotel: () => dispatch(fetchHotel()),

});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
