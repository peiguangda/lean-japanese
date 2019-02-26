import * as React from 'react';
import { connect } from 'react-redux';
import { GatewayProvider } from 'react-gateway';
import { State } from './redux/reducers';
import { ApiEntity } from './common/types'
import 'toastr/build/toastr.min.css';
import 'core-js';

export interface Props {
}

class AppContainer extends React.Component<Props, {}> {

  constructor(props) {
    super(props);
}

  public componentWillMount() {
  }

  public render() {
    return (
      <GatewayProvider>
        <div>
          {this.props.children}
        </div>
      </GatewayProvider>
    );
  }
}

const mapStateToProps = (state: State) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export const App = connect(
  mapStateToProps,
  mapDispatchToProps 
)(AppContainer);

