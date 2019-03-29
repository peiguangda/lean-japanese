import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {createSessionAction, getProfileAction, LogoutAction} from "../../reducers/current_user";
import {NavigationBar} from "./components/Navigation";


const mapStateToProps = (state: State) => ({
    api: state.api,
    currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    login: parameters => dispatch(createSessionAction(parameters)),
    getProfile: parameters => dispatch(getProfileAction(parameters)),
    logout: parameters => dispatch(LogoutAction(parameters))
});

export const NavigationBarContainter = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar);
