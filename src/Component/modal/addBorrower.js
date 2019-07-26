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
import { postPinjam } from '../../Publics/redux/actions/pinjam'
import swal from 'sweetalert'

class AddBorrower extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      pinjam: []
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }

  render () {
    const addPinjam = () => {
      this.state.pinjam.push({
        id_user: localStorage.id_user,
        nama_user: localStorage.nama_user,
        id_buku: this.props.id_buku,
        lama_pinjam: this.state.lama_pinjam,
        tgl_pinjam: new Date(),
      })
      swal({
        title: 'Buku Berhasil Dipinjam',
        text: 'Please refresh the page!',
        icon: 'success',
        button: 'gotcha!!!'
      })
      add()
      this.setState(prevState => ({
        modal: !prevState.modal
      }))
      console.log(this.state.pinjam)
    }
    let add = async () => {
      await this.props.dispatch(postPinjam(this.state.pinjam[0]))
    }

    return (
      <div>
        <p
          className='nav-item nav-link active font-weight-bold font-size-big '
          onClick={this.toggle}
          style={{cursor:'pointer'}}
        >
          PINJAM<span className='sr-only'>(current)</span>
        </p>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Input Data</ModalHeader>
          <ModalBody>
            <Form>
              <Label>ID Buku</Label>
              <Input
                placeholder='ID...'
                id='id_buku'
                value={this.props.id_buku}
                onChange={e => this.setState({ id_buku: e.target.value })}
                className='mb-3'
              />
              <Label>ID User</Label>
              <Input
                placeholder='ID...'
                id='id_user'
                value={localStorage.id_user}
                onChange={e => this.setState({ id_user: e.target.value })}
                className='mb-3'
              />
              <Label>Nama User</Label>
              <Input
                placeholder='Nama...'
                id='nama_user'
                value={localStorage.nama_user}
                onChange={e => this.setState({ nama_user: e.target.value })}
                className='mb-3'
              />
              <Label>Lama Pinjam</Label>
              <Input
                placeholder='lama pinjam...'
                id='lama_pinjam'
                onChange={e => this.setState({ lama_pinjam: e.target.value })}
                className='mb-3'
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color='none'
              className='btn btn-outline-info'
              onClick={addPinjam.bind(this)}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pinjam: state.pinjam
  }
}

export default connect(mapStateToProps)(AddBorrower)
