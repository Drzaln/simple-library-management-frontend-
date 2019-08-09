import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPinjam } from '../Publics/redux/actions/pinjam'
import moment from 'moment'

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
        <div />
        {list &&
          list.length > 0 &&
          list.map((entry, i) => {
            const tgl_pinjam = moment(entry.tgl_pinjam).format('LL')
            const tgl_kembali = moment(entry.tgl_kembali).format('LL')
            const tgl_pinjam_year = moment(entry.tgl_pinjam).dayOfYear()
            const tgl_sekarang = moment(new Date()).dayOfYear()
            const selisih = tgl_sekarang - tgl_pinjam_year
            const tgl_harus_balik = moment(tgl_pinjam).add(3, 'days')
            const denda = (selisih - 3) * 2000
            const formatTgl = tgl_harus_balik.format('LL')
            return (
              <div className='row' style={{ marginTop: '1%' }}>
                <div className='col-2'>
                  <img
                    src={entry.gmb_buku}
                    style={{ width: '60%', marginBottom: '10%' }}
                    alt={entry.nama_buku}
                  />
                </div>
                <div className='col-8'>
                  <div className='row'>
                    <text>
                      <b>Judul: </b>
                      {entry.nama_buku}
                    </text>
                  </div>
                  <div className='row'>
                    <text>
                      <b>Peminjam: </b>
                      {entry.nama_user}
                    </text>
                  </div>
                  <div className='row'>
                    <text>
                      <b>Mulai pinjam: </b>
                      {tgl_pinjam}
                    </text>
                  </div>
                  <div className='row'>
                    <text>
                      <b>Tgl harus dikembalikan: </b>
                      {formatTgl}
                    </text>
                  </div>
                  <div className='row'>
                    {entry.tgl_kembali == null ? (
                      ''
                    ) : (
                      <text>
                        <b>Tanggal kembali: </b>
                        {tgl_kembali}
                      </text>
                    )}
                  </div>
                  <div className='row'>
                    {entry.tgl_kembali == null ? (
                      <text>
                        <b>Denda yang harus dibayar: </b>
                        {'Rp ' + Math.abs(denda)}
                      </text>
                    ) : (
                      <text>
                        <b>DENDA: </b>
                        {entry.denda}
                      </text>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
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
