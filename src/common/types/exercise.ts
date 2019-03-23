export interface ExerciseEntity {
    actionType?: string;
    id: string;
    user_id: number,
    course_id: number,
    topic_id: number,
    order_index: number,
    difficulty_level: number,
    has_child: number,
    parent_id: number,
    status: number,
    code: string,
    shuffle_anser: number,
    front_text: string,
    front_image: string,
    front_sound: string,
    front_hint: string,
    back_text: string,
    back_image: string,
    back_sound: string,
    back_hint: string,
};
