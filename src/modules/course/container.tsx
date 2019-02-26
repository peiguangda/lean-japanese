import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../redux/reducers';
import { CourseDetail } from './components/Page';


console.log("asfdadsf");
const mapStateToProps = (state: State) => ({
  });
  
const mapDispatchToProps = (dispatch) => ({
});

export const CourseDetailContainter = connect(
mapStateToProps,
mapDispatchToProps
)(CourseDetail);
