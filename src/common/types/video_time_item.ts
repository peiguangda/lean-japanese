export interface VideoTimeItemEntity {
    actionType?: string;
    id: string;
    video_scenario_id: number;
    list_card_id: Array<number>;
    index: number;
    time_practice: number;
    title: string;
    code: string;
    data: Array<any>;
    start_time: number;
}
