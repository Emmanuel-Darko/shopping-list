import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types'
import { getItems, deleteItem, setUpdateItem } from '../actions/itemActions';

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems()
    }

    onDeleteItem = (id) => {
        this.props.deleteItem(id);
    }

    onEditItem = (id, name) => {
        this.props.setUpdateItem(id,name);
    }

    render(){
        const { items, isAuthenticated } = this.props;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className='shopping-list'>
                        {items.map(({_id, name}) => (
                            <CSSTransition key={_id} timeout={400} classNames='fade'>
                                <ListGroupItem>
                                { isAuthenticated ? //If authenticated, show delete and update buttons
                                    <Fragment>
                                        <Button
                                            className='remove-btn'
                                            color='danger'
                                            size='sm'
                                            onClick={()=>{
                                                this.onDeleteItem(_id)
                                            }}
                                        >
                                            &times;
                                        </Button>
                                        <Button
                                            className='edit-btn'
                                            color='success'
                                            size='sm'
                                            onClick={()=>{
                                                this.onEditItem(_id,name)
                                            }}
                                        >
                                            edit
                                        </Button>
                                    </Fragment>
                                    : null
                                }
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    items: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool,
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    setUpdateItem: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    items: state.item.items, // 'state.item' because item reducer was labelled as item in the root reducer file.
    isAuthenticated: state.auth.isAuthenticated
})

// const mapDispatchToProps = (dispatch) => ({
//     getItems: () => dispatch(getItems())
// })

export default connect(
    mapStateToProps,
    { getItems, deleteItem, setUpdateItem }
)(ShoppingList)