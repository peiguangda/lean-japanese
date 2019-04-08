import * as React from "react";
import {Fragment} from "react";
import {Icon, Tooltip} from "antd";

export interface Props {
}

export interface State {
}


export class ListLessonHeader extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
    }

    public componentWillMount() {
    }

    public render() {
        return (
            <Fragment>
                <div className="row lesson-list-header">
                    <div className="col-md-1 h-100 mt-3">
                        <h4><Icon type="left-circle" className="w-100 h-100" theme="twoTone"
                                  twoToneColor="#eb2f96"/></h4>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-1 mt-2 text-center">
                                <Tooltip placement="top" title={"Bai 1"}>
                                    <h2 className="icon-parent-lesson-detail-header"><Icon type="folder-open"
                                                                                           theme="twoTone"/></h2>
                                </Tooltip>
                            </div>
                            <div className="col-md-1 mt-2 text-center">
                                <Tooltip placement="top" title={"Bai 1"}>
                                    <h2 className="icon-parent-lesson-detail-header"><Icon type="folder-open"
                                                                                           theme="twoTone"/></h2>
                                </Tooltip>
                            </div>
                            <div className="col-md-1 mt-2 text-center">
                                <Tooltip placement="top" title={"Bai 1"}>
                                    <h2 className="icon-parent-lesson-detail-header"><Icon type="folder-open"
                                                                                           theme="twoTone"/></h2>
                                </Tooltip>
                            </div>
                            <div className="col-md-1 mt-2 text-center">
                                <Tooltip placement="top" title={"Bai 1"}>
                                    <h2 className="icon-parent-lesson-detail-header"><Icon type="folder-open"
                                                                                           theme="twoTone"/></h2>
                                </Tooltip>
                            </div>
                            <div className="col-md-1 mt-2 text-center">
                                <Tooltip placement="top" title={"Bai 1"}>
                                    <h2 className="icon-parent-lesson-detail-header"><Icon type="folder-open"
                                                                                           theme="twoTone"/></h2>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1 h-100 mt-3">
                        <h4><Icon type="right-circle" className="w-100 h-100" theme="twoTone"
                                  twoToneColor="#eb2f96"/></h4>
                    </div>
                </div>
            </Fragment>
        );
    }
}
