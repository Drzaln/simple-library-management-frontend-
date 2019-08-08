import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser, deleteUser} from '../Publics/redux/actions/user'
import swal from "sweetalert";
import { Button } from "reactstrap";
import moment from "moment";

class User extends Component {
  state = {
    users: []
  }

  componentDidMount = async () => {
    await this.props.dispatch(getUser(localStorage.token, localStorage.id, localStorage.level))
    this.setState({
      users: this.props.user
    })
  }

  render () {
    const { users } = this.state
    const list = users.listUser
    console.log(`haeeeeeeee`, this.state.users)

    const confirm = (id_user) =>{
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will delete this User!!!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((buttons) => {
          if (buttons) {
              del(id_user)
            swal("Poof! Your book has been deleted!", {
              icon: "success",
            });
            window.location.href = '/user'
          } else {
            swal("Your file is safe!");
          }
        }).catch((dangerMode) => {
          window.location.href = '/user'
        })
  }        
  let del = async (id_user) => {
      await this.props.dispatch(deleteUser(id_user));
  };

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
            const tgl_daftar = moment(entry.created_at).format('LL')
            return (
              <div className='row' style={{ marginTop: '1%' }}>
                <div className='col-11'>
                <div className='row'>
                    <text>
                      <b>ID User: </b>
                      {entry.id_user}
                    </text>
                  </div>
                  <div className='row'>
                    <text>
                      <b>Nama: </b>
                      {entry.nama_user}
                    </text>
                  </div>
                  <div className='row'>
                    <text>
                      <b>Email: </b>
                      {entry.email}
                    </text>
                  </div>
                  <div className='row'>
                    <text>
                      <b>Tanggal Mendaftar: </b>
                      {tgl_daftar}
                    </text>
                  </div>
                </div>
                <div className='col-1'>
                <Button color="danger" onClick={() => confirm(entry.id_user)}>Delete</Button>
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
    user: state.user
  }
}

export default connect(mapStateToProps)(User)