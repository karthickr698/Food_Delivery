import React, { Component } from 'react';
import styles from './search.module.css'
import TextField from '@material-ui/core/TextField';
import { checkAuth, fetchUserData } from '../../Redux/action'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class UserLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            pwd: "",
            d: []
        }
    }
    handle = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submit = () => {
        const { pwd, username } = this.state;
        if (pwd.length > 0 && username.length > 0) {

            const datas = JSON.stringify(
                {
                    "username": username,
                    "password": pwd,
                }
            );
            this.props.fetchUserData(datas)
        }
        else {
            alert("Dtat Missing")
        }
    }

    render() {
        console.log(this.props)
        const { is_auth, iserror } = this.props
        if (is_auth)
            return (<Redirect to='/' />)
        else {
            return (
                <div className={styles.login}>
                    {iserror ? <div style={{ color: "red", margin: "2px" }}>Invalid username or password</div> : null}
                    <TextField label="Username" value={this.state.username} name="username" onChange={this.handle} />
                    <br />
                    <TextField label="Password" value={this.state.pwd} name="pwd" onChange={this.handle} />
                    <br />
                    <button className={styles.submit} onClick={this.submit} >Login</button>
                </div >
            )
        }
    }
}

const mapStateToProps = state => ({
    is_auth: state.is_auth,
    iserror: state.iserror

})
const mapDispatchToProps = dispatch => ({
    checkAuth: (item) => dispatch(checkAuth(item)),
    fetchUserData: (datas) => dispatch(fetchUserData(datas))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);