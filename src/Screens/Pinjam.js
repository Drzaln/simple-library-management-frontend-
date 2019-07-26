import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPinjam } from '../Publics/redux/actions/pinjam'

class Pinjam extends Component {
  state = {
    pinjams: []
  }

  componentDidMount = async () => {
    await this.props.dispatch(getPinjam())
    this.setState({
      pinjams: this.props.pinjam
    })
  }

  render () {
    const { pinjams } = this.state
    const list = pinjams.listPinjam
    console.log(`haeeeeeeee`, list)
    return (
      <div className='container'>
        <Link to='/'>
          <p
            className='nav-item nav-link active font-weight-bold font-size-big'
            style={{ color: 'black', marginTop: '1%' }}
          >
            BACK<span className='sr-only'>(current)</span>
          </p>
        </Link>
        <div>
          <div className='row' style={{ marginTop: '1%' }}>
            <div className='col-2' style={{ marginTop: '2%' }}>
              <img
                src={list ? list.gmb_buku : ''}
                style={{ width: '60%' }}
                alt={list ? list.nama_buku : ''}
              />
            </div>
            <div className='col-8' style={{ marginTop: '2%' }}>
              <div className='row'>
                <text>
                  <b>Judul: </b>
                  {list ? list.nama_buku : ''}
                </text>
              </div>
              <div className='row'>
                <text>
                  <b>Peminjam: </b>
                  {list ? list.nama_user : ''}
                </text>
              </div>
              <div className='row'>
                <text>
                  <b>Mulai pinjam: </b>
                  {list ? list.tgl_pinjam : ''}
                </text>
              </div>
              <div className='row'>
                <text>
                  <b>Tanggal kembali: </b>
                  {list ? list.tgl_kembali : ''}
                </text>
              </div>
              <div className='row'>
                <text>
                  <b>DENDA: </b>
                  {list ? list.denda : ''}{' '}
                </text>
              </div>
            </div>
          </div>
        </div>
        {/* {list &&
          list.length > 0 &&
          list.map((entry, i) => {
            return (

            )
          })} */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pinjam: state.pinjam
  }
}

export default connect(mapStateToProps)(Pinjam)
