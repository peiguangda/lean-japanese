export interface VideoScenarioEntity {
    actionType?: string;
    id: string;
    topic_id: number;
    course_id: number;
    auto_play: number;
    status: number;
    type_scenario: number;
    time_question_data: number;
    start_time: number;
    end_time: number;
    video_url: string;
    title: string;
    description: string;
    thumbnail: string;
    is_must_answer: boolean;
    is_must_answer_correct: boolean;
}
