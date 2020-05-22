import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types'
import { getItems, deleteItem } from '../actions/itemActions';

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems()
    }

    onDeleteItem = (id) => {
        this.props.deleteItem(id);
    }

    render(){
        const { items } = this.props;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className='shopping-list'>
                        {items.map(({_id, name}) => (
                            <CSSTransition key={_id} timeout={400} classNames='fade'>
                                <ListGroupItem>
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
    getItems: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    items: state.item.items // 'state.item' because item reducer was classified as item in the root reducer file.
})

// const mapDispatchToProps = (dispatch) => ({
//     getItems: () => dispatch(getItems())
// })

export default connect(
    mapStateToProps,
    { getItems, deleteItem }
)(ShoppingList)