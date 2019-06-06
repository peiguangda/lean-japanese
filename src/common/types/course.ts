export interface CourseEntity {
    actionType?: string;
    id: number;
    user_id: number;
    code: string;
    short_description: string;
    name: string;
    owner_name: string;
    avatar: string;
    description: string;
    password: string;
    android_url: string;
    end_date: string;
    status: number;
    index: number;
    lesson_num: number;
    member_num: number;
    time_expire: number;
    day_to_open_lesson: number;
    created_at: number;
    updated_at: number;
    cost: string;
    language: string;
}