import * as React from "react";
import {Fragment} from "react";
import {Button, Input, Radio, Tooltip} from 'antd';

const RadioGroup = Radio.Group;

export interface Props {
    props: any,
}

export interface State {
    value: number;
}

export class Question extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        }
    }

    componentWillMount() {
    }

    public onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    public render() {
        let {props} = this.props;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (
            <Fragment>
                <p className="row ml-1 exam-title">Câu 1/40 - Lần cuối trả lời sai</p>
                <div className="row mr-1 mb-5 list-exam">
                    <div className="col w-100 ml-3">
                        <p className="row mt-3">いくら さがしても、ここに おいたはずの さいふが （ ）。</p>
                        <div className="row">
                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                                <Radio style={radioStyle} value={1}>Option A</Radio>
                                <Radio style={radioStyle} value={2}>Option B</Radio>
                                <Radio style={radioStyle} value={3}>Option C</Radio>
                                <Radio style={radioStyle} value={4}>
                                    More...
                                    {this.state.value === 4 ?
                                        <Input style={{width: 100, marginLeft: 10}}/> : null}
                                </Radio>
                            </RadioGroup>
                        </div>
                        <div className="row float-right m-2">
                            <Tooltip placement="top" title={"Bình luận"}>
                                <Button icon="message" className="exam-btn"/>
                            </Tooltip>
                            <Tooltip placement="top" title={"Bookmark"}>
                                <Button icon="pushpin" className="exam-btn"/>
                            </Tooltip>
                            <Tooltip placement="top" title={"Ghi chú"}>
                                <Button icon="tag" className="exam-btn"/>
                            </Tooltip>
                            <Tooltip placement="top" title={"Phản hồi"}>
                                <Button icon="highlight" className="exam-btn"/>
                            </Tooltip>
                            <Tooltip placement="top" title={"Bỏ qua"}>
                                <Button icon="eye-invisible" className="exam-btn"/>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
