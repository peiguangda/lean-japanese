import * as React from "react";
import {Helmet} from "react-helmet";
import {Fragment} from "react";
import {Modal, Button, Icon, Input, Form, message, Checkbox} from "antd";
import "../../../../public/css/custom.scss"

export interface Props {
    closeModal(): void;

    showModal(): void;

    visible: boolean;
}

export interface State {

}

export class LoginModal extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public handleCancel = (e) => {
        this.props.closeModal();
        console.log("Cancel");

    }

    public handleOk = () => {
        console.log("Ok");
    }

    public render() {
        return (
            <Fragment>
                <Modal
                    className={"title"}
                    title={"LOGIN"}
                    style={{}}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    adsf
                </Modal>
            </Fragment>

        );
    }
}
