import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers/reducers';
import {createSessionAction, getProfileAction} from "../../reducers/user";
import {NavigationBar} from "./components/Navigation";


const mapStateToProps = (state: State) => ({
    api: state.api,
    user: state
});

const mapDispatchToProps = (dispatch) => ({
    login : parameters => dispatch(createSessionAction(parameters)),
    getProfile : parameters => dispatch(getProfileAction(parameters))
});

export const NavigationBarContainter = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar);
