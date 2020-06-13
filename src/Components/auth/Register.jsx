import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import styles from './search.module.css';
import { connect } from 'react-redux'
import { postUserData } from '../../Redux/action'


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: "",
            username: "",
            email: "",
            pwd: ""

        }
    }
    handle = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = () => {
        const { Name, username, email, pwd } = this.state
        if (Name.length > 0 && username.length > 0 && email.length > 0 && pwd.length > 0) {

            const data = JSON.stringify({
                "name": Name,
                "email": email,
                "username": username,
                "password": pwd
            });
            this.props.postUserData(data)
            this.setState({ Name: "", mobile: "", username: "", email: "", pwd: "", description: "" })
        }
        else {
            alert("Data is missing")
        }
    }
    render() {
        console.log(this.porps)
        const { iserror, isregister } = this.props
        return (
            <div className={styles.form}>
                <TextField label="Name" value={this.state.Name} name="Name" onChange={this.handle} />
                <br />
                <TextField label="Email" value={this.state.email} name="email" onChange={this.handle} />
                <br />
                <TextField label="Username" value={this.state.username} name="username" onChange={this.handle} />
                <br />
                <TextField label="Password" value={this.state.pwd} name="pwd" onChange={this.handle} />
                <br />
                <button className={styles.submit} onClick={this.handleSubmit}>Register</button>
                {iserror ? alert("An error Occured") : null}
                {isregister ? alert("Register Successful") : null}

            </div>
        )
    }
}


const mapStateToProps = state => ({
    is_auth: state.is_auth,
    iserror: state.iserror,
    isregister: state.isregister

})
const mapDispatchToProps = dispatch => ({
    postUserData: (datas) => dispatch(postUserData(datas))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);


