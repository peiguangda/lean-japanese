import * as React from "react";
import "../../../public/css/loader.scss";

export interface Props {
}

export interface State {
}

export class Loader extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div className="main-loading">
                <div className="body-loading">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
          </div>
        );
    }
}
