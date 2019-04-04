import * as React from 'react';
import {connect} from 'react-redux';
import {State} from '../../../../reducers/reducers';
import {ListMember} from './components/Page';
import {RouteComponentProps} from "react-router";
import {fetchMemAction} from "../../../../reducers/member";

const mapStateToProps = (state: State, props: RouteComponentProps<any, any>) => ({
    props: props,
    listMem: state.listMem
});

const mapDispatchToProps = (dispatch) => ({
    fetchMemAttendCourse: (parameters) => dispatch(fetchMemAction(parameters))
});

export const ListMemberContainter = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListMember);
