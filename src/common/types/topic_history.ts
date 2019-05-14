export interface TopicHistoryEntity {
    actionType?: string;
    id: string;
    user_id: number;
    course_id: number;
    topic_id: number;
    updated_at: number;
    score: number;
    correct: number;
    total: number;
    data: Array<any>;
};
