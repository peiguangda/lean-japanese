import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { State } from '../../redux/reducers';
import { CoursePage } from './components/Page';

const mapStateToProps = (state: State) => ({
  });
  
const mapDispatchToProps = (dispatch) => ({
});

export const ListCourseContainer = connect(
mapStateToProps,
mapDispatchToProps
)(CoursePage);


