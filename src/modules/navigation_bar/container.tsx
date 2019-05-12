import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../reducers/reducers';
import {createSessionAction, getProfileAction, LogoutAction} from "../../reducers/current_user";
import {NavigationBar} from "./components/Navigation";
import {createUserAction} from "../../reducers/user";


const mapStateToProps = (state: State) => ({
    api: state.api,
    currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    login: parameters => dispatch(createSessionAction(parameters)),
    getProfile: parameters => dispatch(getProfileAction(parameters)),
    logout: parameters => dispatch(LogoutAction(parameters)),
    signin: parameters => dispatch(createUserAction(parameters))
});

export const NavigationBarContainter = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar);
