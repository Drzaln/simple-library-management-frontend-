import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBuku, getMoreBook } from '../Publics/redux/actions/buku'
import { Link } from 'react-router-dom'
import '../support/style/Home.css'
import Nav from '../Component/navbar/Nav'
import ModalAdd from '../Component/modal/addBook'
import Login from '../Component/modal/Login'
import Url from '../support/url'
import { Button } from 'reactstrap'
import { async } from 'q'

class Buku extends Component {
  state = {
    books: [],
    page: 1
  }

  componentDidMount = async () => {
    const page = this.state.page
    await this.props.dispatch(getBuku())
    this.setState({
      books: this.props.buku
    })
    await this.props.dispatch(getMoreBook(page))
  }

  toggle = this.toggle.bind(this)
  toggle () {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  toggleedit = this.toggleedit.bind(this)
  toggleedit () {
    this.setState(prevState => ({
      modaledit: !prevState.modal
    }))
  }
  renderBookJsx = () => {
    const { books } = this.state
    const list = books.listBuku
    let jsx =
      list &&
      list.length > 0 &&
      list.map((entry, index) => {
        return (
          <div className='col-md-2 mb-2' key={index}>
            <div
              className='card text-white bg-info'
              style={{ width: '10rem', height: '100%' }}
            >
              <Link to={`/book/${entry.id_buku}`}>
                <img
                  src={
                    entry.gmb_buku == 'undefined'
                      ? Url + entry.image
                      : entry.gmb_buku
                  }
                  className='card-img-top cardHome'
                  alt='...'
                />
              </Link>
              <div className='card-body'>
                <p className='card-text judul'>
                  <h6>{entry.nama_buku}</h6>
                </p>
                <p className='badge'>{entry.nama_kategori}</p>
              </div>
              {entry.status_pinjam === 'ada' ? (
                <span
                  className='badge badge-pill badge-info'
                  style={{ top: '5%', right: '5%' }}
                >
                  Tersedia
                </span>
              ) : (
                <span
                  className='badge badge-pill badge-danger'
                  style={{ top: '5%', right: '5%' }}
                >
                  Tidak Tersedia
                </span>
              )}
            </div>
          </div>
        )
      })
    return jsx
  }

  render () {
    let next = async () => {
      this.setState({
        page: this.state.page + 1
      })
      const page = this.state.page
      await this.props.dispatch(getMoreBook(page + 1))
      this.setState({
        books: this.props.buku
      })
    }

    let prev = async () => {
      this.setState({
        page: this.state.page - 1
      })
      const page = this.state.page
      await this.props.dispatch(getMoreBook(page - 1))
      this.setState({
        books: this.props.buku
      })
    }

    return (
      <div>
        <Nav Navitem={<Login />} />
        <div className='container'>
          <div className='row justify-content-md-center'>
            <div className='col-sm-7 mt-5'>
              <input
                className='form-control form-control-lg rounded-pill search'
                ref='input'
                onChange={this.search}
                type='text'
                placeholder='Search...'
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-2 offset-md-8 mt-3'>
              {localStorage.token != null ? (
                <ModalAdd adbuku={'Add Book'} />
              ) : (
                <ModalAdd adbuku={'Donate Book'} />
              )}
            </div>
          </div>
          <div className='row mt-5 justify-content-md-center'>
            {this.renderBookJsx()}
          </div>
          <div style={{ flexDirection: 'row', margin: 16 }} className='row'>
            <Button
              style={{ marginRight: 8 }}
              color='none'
              className='btn btn-outline-info'
              onClick={prev}
            >
              Prev
            </Button>
            <Button
              color='none'
              className='btn btn-outline-info'
              onClick={next}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    buku: state.buku
  }
}

export default connect(mapStateToProps)(Buku)
