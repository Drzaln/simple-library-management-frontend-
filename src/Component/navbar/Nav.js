import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

export default class Example extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  logout () {
    localStorage.clear()
    swal({
      title: 'Berhasil Logout',
      icon: 'success'
    }).then(() => {
      window.history.go('/')
    })
  }

  render () {
    return (
      <div className='wrapper'>
        <Navbar className='navbar' color='light' light expand='md' style={{boxShadow:'0px 4px 15px rgba(0, 0, 0, 0.137)'}} >
          <div className='container'>
            <Link to='/'>
              <NavbarBrand className='navbarBrand font-weight-bold' style={{color:'black'}} >BOOK</NavbarBrand>
            </Link>
            {localStorage.token != null ? <NavItem>Halo {localStorage.nama_user} !</NavItem> : ''}
            <Nav className='ml-auto' navbar>
              <NavItem>
                {localStorage.token != null ? (
                  <Link to='/list'>
                    <button
                      type='button'
                      className='btn btn-outline-primary btn-sm font-weight-bold'
                    >
                      Histori Peminjaman
                    </button>
                  </Link>
                ) : (
                  this.props.Navitem
                )}
              </NavItem>
              <NavItem>
                {localStorage.token != null ? (
                  <button
                    type='button'
                    className='btn btn-outline-danger btn-sm font-weight-bold'
                    onClick={this.logout}
                    style={{ marginLeft: '16%' }}
                  >
                    LOGOUT
                  </button>
                ) : (
                  ''
                )}
              </NavItem>
              <NavItem style={{ marginLeft: 16 }} />
            </Nav>
          </div>
        </Navbar>
      </div>
    )
  }
}
