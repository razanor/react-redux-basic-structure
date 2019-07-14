import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

const initialState = {
    firstName: 'Oleg',
    secondName: 'Pavlov'
};

const ACTION_CHANGE_FIRST_NAME = 'ACTION_CHANGE_FIRST_NAME';
const ACTION_CHANGE_SECOND_NAME = 'ACTION_CHANGE_SECOND_NAME';

const changeFirstName = (newFirstName) => {
    return {
        type: ACTION_CHANGE_FIRST_NAME,
        payload: newFirstName
    }
};

const changeSecondName = (newSecondName) => {
    return {
        type: ACTION_CHANGE_SECOND_NAME,
        payload: newSecondName
    }
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_FIRST_NAME:
            return { ...state, firstName: action.payload };
        case ACTION_CHANGE_SECOND_NAME:
            return { ...state, secondName: action.payload };
        default: return state;
    }
    
};

const store = createStore(rootReducer);

class MainComponent extends React.Component {
    render() {
        const { 
            changeFirstName, 
            changeSecondName, 
            firstName, 
            secondName 
        } = this.props;

        return (
            <div>
                <div>
                    <input 
                        type='text' 
                        value={firstName} 
                        placeholder='First Name'
                        onChange={(event) => {
                            changeFirstName(event.target.value)
                        }}
                        />
                </div>
                <div>
                    <input 
                        type='text' 
                        value={secondName} 
                        placeholder='Second Name'
                        onChange={(event) => {
                            changeSecondName(event.target.value)
                        }}
                    />
                </div>
                <div>
                    {`${firstName} ${secondName}`}
                </div>
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        firstName: state.firstName,
        secondName: state.secondName
    };
};

const putActionsToProps = (dispatch) => {
    return {
        changeFirstName: bindActionCreators(changeFirstName, dispatch),
        changeSecondName: bindActionCreators(changeSecondName, dispatch)
    }
};

const WrappedMainComponent = connect(putStateToProps, putActionsToProps)(MainComponent)

ReactDOM.render(<Provider store={store}>
    <WrappedMainComponent/>
</Provider>, document.getElementById('root'));


