import * as React from "react";
import {Fragment} from "react";
import {Button, Checkbox, Form, Icon, Input, message, Modal} from "antd";
import {WrappedFormUtils} from 'antd/lib/form/Form';
import "../../../../public/css/login_form.scss"
import {ApiEntity} from "../../../../common/types";

export interface Props {
    visible: boolean;
    api: ApiEntity;

    closeModal(): void;

    showModal(): void;

    getProfile(): void;

    login(parameters): Promise<any>;
}

export interface State {
}

export class LoginModal extends React.Component<Props & { form: WrappedFormUtils }, State, {}> {
    public handleCancel = (e) => {
        this.props.closeModal();
        console.log("Cancel");

    }
    public handleOk = () => {
        console.log("Ok");
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values).then(res => {
                    if (res && res.status == "success") {
                        message.success("Đăng nhập thành công");
                        this.props.closeModal();
                        this.props.getProfile();
                    } else message.error("Sai tài khoản hoặc mật khẩu");
                })
            }
        });
    }

    constructor(props, form) {
        super(props);
        super(form);
    }

    public render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Fragment>
                <Modal
                    className={"title"}
                    title={"ĐĂNG NHẬP"}
                    style={{}}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('account', {
                                rules: [{required: true, message: 'Vui lòng nhập username!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Tên đăng nhập"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Vui lòng nhập mật khẩu!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="Mật khẩu"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <a className="login-form-forgot" href="">Quên mật khẩu</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Đăng nhập
                            </Button>
                            Or <a href="">Đăng kí ngay!!</a>
                        </Form.Item>
                    </Form>
                </Modal>
            </Fragment>

        );
    }
}

export const WrappedNormalLoginForm = Form.create<Props>()(LoginModal);