import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Form
} from 'reactstrap'
import { connect } from 'react-redux'
import { userLogin } from '../../Publics/redux/actions/login'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      loginUser: []
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }

  render () {
    const loginUser = () => {
      this.state.loginUser.push({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      })
      logindong()
      console.log(`cobaaaaaaaaa`, this.state.loginUser[0])

      swal({
        title: 'Berhasil Login',
        icon: 'success'
      }).then(() => {
        this.toggle()
        window.history.go('/')
      })
    }

    let logindong = async () => {
      await this.props.dispatch(userLogin(this.state.loginUser[0]))
    }

    return (
      <div>
        <button
          type='button'
          className='btn btn-info btn-sm font-weight-bold'
          onClick={this.toggle}
        >
          LOGIN
        </button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            <Form>
              <Label>Email</Label>
              <Input
                placeholder='Email...'
                id='email'
                type='email'
                onChange={e => this.setState({ email: e.target.value })}
                className='mb-3'
                required
                autoFocus
              />
              <Label>Password</Label>
              <Input
                placeholder='Password...'
                id='password'
                type='password'
                onChange={e => this.setState({ password: e.target.value })}
                className='mb-3'
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Link to={'/register'}>
              <Button color='none' className='btn btn-outline-danger btn-sm'>
                REGISTER
              </Button>
            </Link>
            <Button
              color='none'
              className='btn btn-info btn-sm'
              onClick={loginUser.bind(this)}
            >
              LOGIN
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(Login)
