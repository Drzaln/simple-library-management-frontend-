import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Form } from 'reactstrap';
import { connect } from "react-redux";
import { editBuku, getBukuId } from "../../Publics/redux/actions/buku";

class EditBook extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			modal: true,
            books: [],
            editedBook:[]
		};

		this.toggle = this.toggle.bind(this);
    }
    
    componentDidMount = async () => {
        await this.props.dispatch(getBukuId(this.props.match.params.id_buku))
        this.setState({
          books: this.props.buku
        })
      }

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
    }
    
    changeHandle = (e) =>{
        const name = e.currentTarget.name
        const val = e.currentTarget.value
        this.state.books.listBuku[name] = val
        this.setState({books:this.state.books})
        
    }

    render() {

        const bookAdd = () => {
			this.state.editedBook.push({
				nama_buku: list ? list.nama_buku : '',
				penulis_buku: list ? list.penulis_buku : '',
				ringkasan: list ? list.ringkasan : '',
				lokasi_buku: list ? list.lokasi_buku : '',
				gmb_buku: list ? list.gmb_buku : '',
				id_kategori: list ? list.id_kategori : '',
			});
			edit()
			this.setState((prevState) => ({
				modal: !prevState.modal
			}));
			console.log(this.state.editedBook);
		};
		let edit = async () => {
            await this.props.dispatch(editBuku(this.state.editedBook[0],this.props.match.params.id_buku));
            console.log(`holaaaaaaaaaaaaaa`,this.state.editedBook)
        };

        const { books } = this.state;
        const list = books.listBuku;
        console.log(`ini list`, list)
        

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Data</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Label>Url Image</Label>
                            <Input name="gmb_buku" placeholder="Url Image..." id="gmb_buku" value={list ? list.gmb_buku : ''} onChange={this.changeHandle} className="mb-3" />
                            <Label>Title</Label>
                            <Input name="nama_buku" placeholder="Title..." id="nama_buku" value={list ? list.nama_buku : ''} onChange={this.changeHandle} className="mb-3" />
                            <Label>Author</Label>
                            <Input name="penulis_buku" placeholder="Author..." id="penulis_buku" value={list ? list.penulis_buku : ''} onChange={this.changeHandle} className="mb-3" />
                            <Label>category</Label>
                            <Input name="id_kategori" placeholder="category..." ref="inputCategory" id="id_kategori" value={list ? list.id_kategori : ''} onChange={this.changeHandle} className="mb-3" />
                            <Label>lokasi</Label>
                            <Input name="lokasi_buku" placeholder="lokasi..." ref="inputLokasi" id="lokasi_buku" value={list ? list.lokasi_buku : ''} onChange={this.changeHandle} className="mb-3" />
                            <Label for="exampleText">Description</Label>
                            <Input name="ringkasan" type="textarea" ref="inputDescription" id="ringkasan" value={list ? list.ringkasan : ''} onChange={this.changeHandle} placeholder="Description..." />
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="none" className="btn btn-outline-info" onClick={bookAdd.bind(this)}>Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      buku: state.buku
    };
  };
  
  export default connect(mapStateToProps)(EditBook);
  