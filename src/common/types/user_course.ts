export interface UserCourseEntity {
    user_id: string;
    course_id: string;
    role_type: number;
    join_date: string;
    expire_date: string;
    total_time_study: number;
    status: number;
    topic_passed: number;
    exp: number;
    rate_value: number;
    role_name: string;
    comment: string;
    admin_comment: string;
};