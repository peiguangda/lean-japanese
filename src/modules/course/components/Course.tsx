import * as React from "react";
import "../../../public/css/custom.css";

export interface Props {
}

export interface State {
}

export class Course extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        // Call api get list data
    }

    public render() {
        return (
            <div className="LNC col-xs-12 col-sm-4 col-md-4 col-lg-4">
                <table className="DNC">
                    <tbody>
                    <tr>
                        <td>
                            <div className="CNC">
                                <div className="GOC">
                                    <img className="OMC avatarCourse" src="https://storage.googleapis.com/kslearning/images/722984834-1544915140774-47089101_564216997360595_2408262560290701312_n.jpg"/>
                                    <div className="FOC">
                                        <div className="DOC">
                                            <div className="ANC">
                                                <button type="button" className="BNC widget_not_handler">
                                                    Chi tiết
                                                </button>
                                            </div>
                                            <div className="ANC">
                                                <button type="button" className="PMC widget_not_handler">
                                                    Mua ngay
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <img className="INC" aria-hidden="true" src="resources/images/Background.gif"/>
                                </div>
                                <div className="FNC">
                                    <div className="ENC MNC">01. Khóa Học trải nghiệm miễn phí</div>
                                    <img className="gwt-Image" aria-hidden="true" src="resources/images/icon-livestream.gif"/></div>
                                <div className="HOC">
                                    <div className="NNC">Free</div>
                                    <div className="IOC rightFooterCourseItem">
                                        <div className="BOC">
                                            <img className="AOC" src="resources/images/member-01.png" />
                                            <div className="PNC">1242</div></div>
                                        <div className="BOC" aria-hidden="true">
                                            <img className="JNC" src="resources/images/user-online.png" />
                                            <div className="PNC">1000</div></div>
                                    </div>
                                </div>
                                <div className="HNC MNC dot-dot-dot-3">
                                    Khóa học miễn phí với 4 môn học Kinh tế vi
                                    mô, kinh tế vĩ mô, Nguyên lý Mác Lenin 1, Tư Tưởng HCM nhân dịp lễ hội
                                    CHIYOGAMI TAIKAI tại trường Kinh tế Quốc Dân
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
