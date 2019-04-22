export interface CardProgressEntity {
    actionType?: string;
    id: string;
    user_id: number;
    card_id: number;
    topic_id: number;
    card_type: number;
    skill: number;
    last_result: number;
    box_num: number;
    difficulty_level: number;
    progress: number;
    history: Array<any>,
};
