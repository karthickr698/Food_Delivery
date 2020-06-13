import React from 'react';
import { connect } from 'react-redux'
import { Table } from 'reactstrap';

function Bill_history(props) {
    const { booking_history } = props
    if (booking_history.length > 0) {
        return (
            <div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Bill Id</th>
                            <th>Bill Amount</th>
                            <th>Vehicle category</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Booked Date</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Payment Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booking_history.map((item) =>
                            <tr>
                                <td>{item.billId}</td>
                                <td>{item.billAmount}</td>
                                <td>{item.category}</td>
                                <td>{item.startDate}</td>
                                <td>{item.endDate}</td>
                                <td>{item.bookedDate}</td>
                                <td>{item.origin}</td>
                                <td>{item.destination}</td>
                                <td>{item.paymentMethod}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Sorry, No booking made</h1>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    booking_history: state.user.booking_history
});


export default connect(mapStateToProps, null)(Bill_history);