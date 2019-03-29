import * as React from 'react';
import {connect} from 'react-redux';
import {GatewayProvider} from 'react-gateway';
import {State} from './reducers/reducers';
import 'toastr/build/toastr.min.css';
import 'core-js';
import './public/css/custom.scss';

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

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);

