import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { v4 as uuid} from 'uuid';
import { addItem, updateItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = { 
        modal: false,
        name: null,
        uid: null,  //updated id
        uname: null //updated name
    }

    static propTypes = {
        update: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addItem: PropTypes.func.isRequired,
        updateItem: PropTypes.func.isRequired
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.update.id !== this.props.update.id)
            this.toggle(nextProps)         // toggles if update icon is clicked
    }

    toggle = (x) => {                      //custom update toggler
        if(this.state.modal === true){     //if modal is already opened
            this.setState({
                modal: !this.state.modal, //close modal
                uid: null,                //set null uid
                uname: null,
                name: null                  //set name to null
            })
        }else{
            this.setState({               //if modal is closed
                modal: !this.state.modal, //open modal
                uid: x.update.id,         //set uid to update id
                uname: x.update.name
            })
        }
    }

    toggle2 = () => {                     //add item toggler
        this.setState({
            modal: !this.state.modal,
            uid: null,
            uname: null,
            name: null
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        // console.log(this.state.name)
    }

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            id: this.state.uid,
            name: this.state.name
        }
        
        if(this.state.uid === null){
            // Add item via add_item action
            this.props.addItem(newItem);
        }else{
            // update item
            if(this.state.name !== null)            //check to see if item was changed
                this.props.updateItem(newItem);
            else
                this.toggle2()
        }

        // close modal
        this.toggle2()
    }

    render(){
        const { isAuthenticated } = this.props;
        return(
            <div>
                { isAuthenticated ? 
                    <Button
                        color="dark"
                        style={{marginBottom: '2rem'}}
                        onClick={this.toggle2}
                    >
                        Add Item
                    </Button>
                    : <h4 className="mb-3 ml-4">Please login to manage Items</h4>
                }

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle2}
                >
                    <ModalHeader toggle={this.toggle2}>
                        { this.state.uid === null ? 'Add To Shopping List' : 'Update Item'}
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    defaultValue={this.state.uname}
                                    placeholder="Add shopping Item"
                                    onChange ={this.onChange}
                                />
                                <Button
                                    color = "dark"
                                    style = {{marginTop: '2rem'}}
                                    block
                                >
                                    { this.state.uid === null ? 'Add Item' : 'Update Item'}
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    update: state.item.update,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{ addItem, updateItem })(ItemModal);