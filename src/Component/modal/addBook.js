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
import { postBuku } from '../../Publics/redux/actions/buku'
import swal from 'sweetalert'

class AddBook extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      buku: [],
      image: null
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }

  onChangeFile = e => {
    console.log(`gambarnyaaaaaaa`, e.target.files[0])
    this.setState({
      image: e.target.files[0]
    })
  }

  render () {
    const bookAdd = () => {
      let id_kategori = ''
      switch (this.state.category) {
        case 'Fiction':
          id_kategori = 2
          break
        default:
          id_kategori = 1
      }
      const dataBook = new FormData()
      dataBook.append('image', this.state.image)
      dataBook.append('nama_buku', this.state.nama_buku)
      dataBook.append('penulis_buku', this.state.penulis_buku)
      dataBook.append('lokasi_buku', this.state.lokasi_buku)
      dataBook.append('ringkasan', this.state.ringkasan)
      dataBook.append('id_kategori', id_kategori)
      dataBook.append('gmb_buku', this.state.gmb_buku)
      add(dataBook)
      this.setState(prevState => ({
        modal: !prevState.modal
      }))
      console.log(this.state.buku)
    }
    let add = async data => {
      await this.props.dispatch(postBuku(data)).then(() => {
        swal({
            title: 'Add Book Success',
            text: 'Please refresh the page!',
            icon: 'success',
            button: 'gotcha!!!'
          }).then(() => {
            window.location.href = '/';
        })
      })
    }

    return (
      <div>
        <Button
          color='none'
          className='btn btn-outline-info'
          onClick={this.toggle}
        >
          {this.props.adbuku}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{this.props.adbuku}</ModalHeader>
          <ModalBody>
            <Form>
              <Label>Url Image</Label>
              <Input
                placeholder='Url Image...'
                id='gmb_buku'
                onChange={e => this.setState({ gmb_buku: e.target.value })}
                className='mb-3'
              />
              <Input
                type='file'
                placeholder='Url Image...'
                id='gmb_buku'
                onChange={this.onChangeFile.bind(this)}
                className='mb-3'
              />
              <Label>Title</Label>
              <Input
                placeholder='Title...'
                id='nama_buku'
                onChange={e => this.setState({ nama_buku: e.target.value })}
                className='mb-3'
              />
              <Label>Author</Label>
              <Input
                placeholder='Author...'
                id='penulis_buku'
                onChange={e => this.setState({ penulis_buku: e.target.value })}
                className='mb-3'
              />
              <Label>category</Label>
              <Input
                placeholder='category...'
                ref='inputCategory'
                id='id_kategori'
                onChange={e => this.setState({ id_kategori: e.target.value })}
                className='mb-3'
              />
              <Label>lokasi</Label>
              <Input
                placeholder='lokasi...'
                ref='inputLokasi'
                id='lokasi_buku'
                onChange={e => this.setState({ lokasi_buku: e.target.value })}
                className='mb-3'
              />
              <Label for='exampleText'>Description</Label>
              <Input
                type='textarea'
                ref='inputDescription'
                id='ringkasan'
                onChange={e => this.setState({ ringkasan: e.target.value })}
                placeholder='Description...'
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color='none'
              className='btn btn-outline-info'
              onClick={bookAdd.bind(this)}
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
    buku: state.buku
  }
}

export default connect(mapStateToProps)(AddBook)
