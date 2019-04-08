import {Button, Icon, Input, Modal, Popover, Upload} from "antd";
import * as React from "react";
import {Fragment} from "react";
import {ExerciseEntity} from "../../../../../common/types/exercise";
import {imageSearch} from "../../../../../helpers/google_image_search";

const {TextArea} = Input;
const Search = Input.Search;

export interface Props {
    title: string;
    type: string; //question, answer, added_answer, sound_url_question, sound_url_answer
    correct: boolean;
    exercise: ExerciseEntity;
    current_added_answer: number;

    removeAnswer(parameters): void;

    addAnswer(): void;

    changeAnswerStatus(parameters): void;

    onChangeExercise(parameters): void;
}

export interface State {
    text: string;
    visible: boolean;
    listImageSearch: Array<string>;
    page: number;
    searchValue: string;
    search_question_text_area_type: string;
}

export class ButtonCustom extends React.Component<Props, State, {}> {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            visible: false,
            listImageSearch: [],
            page: 1,
            searchValue: "",
            search_question_text_area_type: ""
        }
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        let {type, exercise, current_added_answer} = nextProps;
        let value;
        if (type && type == "sound_url_question") {
            value = exercise.front_sound;
        }
        if (type && type == "sound_url_answer") {
            value = exercise.back_sound;
        }
        if (type == "question") value = exercise.front_text;
        if (type == "added_answer") value = exercise.list_answer[current_added_answer];
        if (type == "answer") value = exercise.back_text;
        this.setState({
            text: value
        })
    }

    public addAnswer = () => {
        this.props.addAnswer();
    };
    public removeAnswer = (parameters) => {
        this.props.removeAnswer(parameters);
    };
    public changeAnswerStatus = (parameters) => {
        this.props.changeAnswerStatus(parameters);
    };
    public showPopup = (current_added_answer, text) => {
        let {correct, type} = this.props;
        let contentAnswer;
        if (type && (type == "sound_url_question" || type == "sound_url_answer")) return null;
        else if (type == "question")
            contentAnswer = <div className="col">
                <Button className="row w-100 create-ex-fix-btn" type="dashed" onClick={() => this.showModal(type)}>Thêm
                    ảnh</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm âm thanh</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm gợi ý</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Định dạng nội dung</Button>
            </div>;
        else if (type == "added_answer")
            contentAnswer = <div className="col">
                <Button className="row w-100 create-ex-fix-btn" type="dashed"
                        onClick={() => this.changeAnswerStatus({
                            index: current_added_answer,
                            correct: correct,
                            value: text
                        })}>Set đáp
                    án {correct ? "sai" : "đúng"}</Button>
            </div>;
        else if (type == "answer")
            contentAnswer = <div className="col">
                <Button className="row w-100 create-ex-fix-btn" type="dashed" onClick={this.addAnswer}>Thêm đáp
                    án</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed" onClick={() => this.showModal(type)}>Thêm
                    ảnh</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm âm thanh</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Thêm giải thích</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Định dạng nội dung</Button>
                <Button className="row w-100 create-ex-fix-btn" type="dashed">Set đáp án sai</Button>
            </div>;
        else return null;
        return <Popover content={contentAnswer} title="Mở rộng" trigger="hover"><Button
            icon="ordered-list"
            className="ant-btn create-ex-fix-btn ant-btn-icon-only col-md-1"/></Popover>
    };
    public onChangeExercise = (exercise) => {
        this.props.onChangeExercise(exercise);
    };
    public onChangeText = (e) => {
        let {type, exercise, current_added_answer} = this.props;
        let {value} = e.target;
        this.setState({
            text: value
        });
        if (type && type == "sound_url_question") {
            exercise.front_sound = value;
        }
        if (type && type == "sound_url_answer") {
            exercise.back_sound = value;
        }
        if (type == "question") exercise.front_text = value;
        if (type == "added_answer") exercise.list_answer[current_added_answer] = value;
        if (type == "answer") exercise.back_text = value;
        this.onChangeExercise(exercise);
    };

    public showModal = (type) => {
        this.setState({
            visible: true,
            search_question_text_area_type: type
        });
    };

    public handleOk = () => {
        this.setState({
            visible: false,
        });
    };

    public handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    public search = (value, page) => {
        imageSearch.search(value, {size: 'medium', page: page})
            .then(images => {
                let listImageSearch = [];
                images.map((image, index) => {
                    listImageSearch.push(image.url);
                });
                this.setState({
                    listImageSearch: listImageSearch
                });
            });
    };

    public onSearchFromGoogle(value) {
        this.setState({
            searchValue: value,
            page: 1
        });
        this.search(value, this.state.page);
    }

    public onClickImage = (image) => {
        let {exercise} = this.props;
        let url = image.target.src;
        this.handleCancel();
        if (this.state.search_question_text_area_type == "question") exercise.front_image = url;
        if (this.state.search_question_text_area_type == "answer") exercise.back_image = url;
        this.onChangeExercise(exercise);
    };

    public showListImageResult = () => {
        let {listImageSearch} = this.state;
        return listImageSearch.map((url, index) => {
            return <div className="col-md-2 m-1">
                <img src={url} className="image-search" onClick={(image) => this.onClickImage(image)}/>
            </div>

        })
    };

    public onNextPage = () => {
        let {page, searchValue} = this.state;
        page = page + 1;
        this.search(searchValue, page);
        this.setState({
            page: page
        })
    };

    public onPrevPage = () => {
        let {page, searchValue} = this.state;
        console.log(page);
        if (page == 1) return;
        page = page - 1;
        this.search(searchValue, page);
        this.setState({
            page: page
        })
    };

    public render() {
        let {title, type, correct, exercise, current_added_answer} = this.props;
        let {text, visible, searchValue} = this.state;
        const isAddAnswer = (type == "added_answer");
        const isQuestion = (type == "question");
        const isAnswer = (type == "answer");
        const isQuesImgExits = (exercise.front_image);
        const isAnswerImgExits = (exercise.back_image);
        const questionImg = isQuesImgExits &&
            <img src={exercise.front_image} className="image-search-mini"
                 onClick={(image) => this.onClickImage(image)}/>;
        const anwerImg = isAnswerImgExits &&
            <img src={exercise.back_image} className="image-search-mini"
                 onClick={(image) => this.onClickImage(image)}/>;
        return (
            <Fragment>
                <p className="title-custom w-100">{title}</p>
                <div className={`w-100 ml-2 mr-2 row border-create-question  ${correct ? '' : 'in_correct'}`}>
                    <TextArea
                        className={`input-question col-md-${(isQuestion && isQuesImgExits) || (isAnswer && isAnswerImgExits) ? 10 : 11} resize_none_text_area`}
                        autosize={{minRows: 2, maxRows: 6}}
                        value={text}
                        onChange={this.onChangeText.bind(this)}
                    />
                    {isQuestion ? questionImg : (isAnswer ? anwerImg : "")}
                    {this.showPopup(current_added_answer, text)}
                    {isAddAnswer ? <Button icon="close" className="button-close"
                                           onClick={() => this.removeAnswer(current_added_answer)}/> : ""}
                </div>
                <Modal
                    title="Thêm ảnh"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="row">
                        <div className="col-md-9">
                            <Search
                                placeholder="Tìm kiếm từ google"
                                onSearch={value => this.onSearchFromGoogle(value)}
                                enterButton
                            />
                        </div>
                        <div className="col-md-3">
                            <Upload
                                className="upload-list-inline"
                                listType='picture'
                                action='//jsonplaceholder.typicode.com/posts/'
                            >
                                <Button>
                                    <Icon type="upload"/> Upload
                                </Button>
                            </Upload>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-1 mt-2">
                            <Icon type="double-left" onClick={this.onPrevPage}/>
                        </div>
                        <div className="col md-10">
                            <div className="row">
                                {this.showListImageResult()}
                            </div>
                        </div>
                        <div className="col-md-1 mt-2">
                            <Icon type="double-right" onClick={this.onNextPage}/>
                        </div>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

