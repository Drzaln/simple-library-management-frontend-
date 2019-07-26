import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBukuId, deleteBook } from '../Publics/redux/actions/buku'
import { patchPinjam } from '../Publics/redux/actions/pinjam'
import { Link } from 'react-router-dom'
import Pinjam from '../Component/modal/addBorrower'
import swal from 'sweetalert'

class Detail extends Component {
  state = {
    books: [],
    pinjams: []
  }

  componentDidMount = async () => {
    await this.props.dispatch(getBukuId(this.props.match.params.id_buku))
    this.setState({
      books: this.props.buku,
      pinjam: this.props.pinjam
    })
  }

  handledelete = id_buku => {
    const { books } = this.state
    const list = books.listBuku
    console.log('coba id', list ? list.id_buku : '')
    swal({
      title: 'Apakah Anda Yakin?',
      text: 'Data Anda tidak akan kembali lagi',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal('Data Behasil dihapus!', {
          icon: 'success'
        })
        this.props.dispatch(deleteBook(list ? list.id_buku : ''))
        this.setState({ id_buku: list ? list.id_buku : '' })
      } else {
        swal('Data Anda Aman!')
      }
    })
  }

  updateStatus = id_buku => {
    const { books } = this.state
    const list = books.listBuku
    console.log(`ini list`, list ? list.id_buku : '')
    this.props.dispatch(patchPinjam(list ? list.id_buku : ''))
    this.setState({ id_buku: list ? list.id_buku : '' })
    swal('Buku Sudah Dikembalikan', {
      icon: 'success'
    })
  }

  render () {
    const { books } = this.state
    const list = books.listBuku
    console.log(`cucoooookk`, list)
    return (
      <div>
        <nav
          className='navbar navbar-expand-lg navbar-dark position-absolute'
          style={{ backgroundColor: '#FF000000', boxShadow: `0px 0px 0px` }}
        >
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav'>
              <Link to='/'>
                <p className='nav-item nav-link active font-weight-bold font-size-big '>
                  BACK<span className='sr-only'>(current)</span>
                </p>
              </Link>
              {localStorage.level == 'admin' ? (
                <Link to={`/book/edit/${list ? list.id_buku : ''}`}>
                  <p className='nav-item nav-link active font-weight-bold font-size-big '>
                    EDIT<span className='sr-only'>(current)</span>
                  </p>
                </Link>
              ) : (
                ''
              )}

              {localStorage.level == 'admin' ? (
                <p
                  className='nav-item nav-link active font-weight-bold font-size-big '
                  onClick={() => this.handledelete()}
                  style={{ cursor: 'pointer' }}
                >
                  DELETE<span className='sr-only'>(current)</span>
                </p>
              ) : (
                ''
              )}

              {localStorage.level == 'admin' &&
              (list ? list.status_pinjam : '') === 'dipinjam' ? (
                <p
                    className='nav-item nav-link active font-weight-bold font-size-big '
                    onClick={() => this.updateStatus()}
                    style={{ cursor: 'pointer' }}
                  >
                  KEMBALIKAN BUKU<span className='sr-only'>(current)</span>
                  </p>
                ) : localStorage.level == 'user' &&
                (list ? list.status_pinjam : '') === 'ada' ? (
                  <Pinjam id_buku={this.props.match.params.id_buku} />
                  ) : (
                    ''
                  )}
            </div>
          </div>
        </nav>
        <div>
          <img
            src={list ? list.gmb_buku : ''}
            style={{ height: 300, width: '100%', objectFit: 'cover' }}
            alt={list ? list.nama_buku : ''}
          />
          <img
            src={list ? list.gmb_buku : ''}
            alt={list ? list.nama_buku : ''}
            style={{
              width: '10%',
              position: 'absolute',
              height: 200,
              borderRadius: 16,
              top: '25%',
              right: '10%',
              boxShadow: `0px 4px 15px #bfbfbf`
            }}
          />
          <div className='container' style={{ marginTop: '2%' }}>
            <text className='font-weight-bold' style={{ fontSize: 50 }}>
              {list ? list.nama_buku : ''}
            </text>
          </div>
          <div className='container'>
            <text className='font-weight-normal' style={{ fontSize: 20 }}>
              {list ? `Penulis: ` + list.penulis_buku : ''}
            </text>
          </div>
          <div className='container' style={{ marginTop: '1%' }}>
            <text className='font-weight-bold'>
              {list ? `Lokasi buku: ` + list.lokasi_buku : ''}
            </text>
          </div>
          <div className='container'>
            {(list ? list.status_pinjam : '') === 'ada' ? (
              <span
                class='badge badge-info'
                style={{ right: '22%', fontSize: 20 }}
              >
                Tersedia
              </span>
            ) : (
              <span
                class='badge badge-danger'
                style={{ right: '22%', fontSize: 20 }}
              >
                Tidak Tersedia
              </span>
            )}
          </div>
          <div
            className='container'
            style={{ marginTop: '3%', marginBottom: 32 }}
          >
            <text>{list ? list.ringkasan : ''}</text>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    buku: state.buku,
    pinjam: state.pinjam
  }
}

export default connect(mapStateToProps)(Detail)
