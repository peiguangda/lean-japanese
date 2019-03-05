import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../redux/reducers';
import { LessonDetail } from './components/Page';


const mapStateToProps = (state: State) => ({

});
  
const mapDispatchToProps = (dispatch) => ({
});

export const LessonDetailContainter = connect(
mapStateToProps,
mapDispatchToProps
)(LessonDetail);
