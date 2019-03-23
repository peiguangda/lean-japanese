import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers/reducers';
import { HomePage } from './components/Page';

const mapStateToProps = (state: State) => ({
  });
  
const mapDispatchToProps = (dispatch) => ({
});
export const HomePageContainer = connect(
mapStateToProps,
mapDispatchToProps
)(HomePage);
