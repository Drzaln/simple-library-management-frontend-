import React, { Component } from 'react'
import '../support/style/Register.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from "reactstrap";
import swal from 'sweetalert'
import Navbar from '../Component/navbar/Nav'
import { registerUser } from '../Publics/redux/actions/user'

class Register extends Component {
  state = {
    userRegister: []
  }
  render () {
    const userRegister = () => {
      this.state.userRegister.push({
        id_user: this.state.id_user,
        nama_user: this.state.nama_user,
        email: this.state.email,
        password: this.state.password
      })
      console.log(`User register`, userRegister)
      this.props.dispatch(registerUser(this.state.userRegister))

      swal({
        title: 'Anda Sudah Terdaftar, Silahkan Login',
        icon: 'success'
      }).then(() => {
        window.history.go('/')
      })
    }

    return (
      <div>
        <Navbar />
        <div className='register-card' style={{ marginTop: 50 }}>
          <h1>Register</h1>
          <br />
          <form>
            <input
              type='number'
              name='id_user'
              placeholder='ID...'
              id='id_user'
              required
              autoFocus
              onChange={e => this.setState({ id_user: e.target.value })}
            />
            <input
              type='text'
              name='nama_user'
              placeholder='Nama User...'
              id='nama_user'
              required
              autoFocus
              onChange={e => this.setState({ nama_user: e.target.value })}
            />
            <input
              type='text'
              name='email'
              placeholder='Email...'
              id='email'
              required
              autoFocus
              onChange={e => this.setState({ email: e.target.value })}
            />
            <input
              type='password'
              name='password'
              placeholder='Password...'
              id='password'
              required
              autoFocus
              onChange={e => this.setState({ password: e.target.value })}
            />
            <Button
              color='none'
              className='btn btn-info btn-sm'
              style={{width:'100%'}}
              onClick={userRegister.bind(this)}
            >
              REGISTER
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Register)
