export interface CourseEntity {
    actionType?: string;
    latestSyncDate: string;
    selectedOwnerId: number;
    selectedDepartmentId?:number;
    ownerList?: any;
    isSettingWarning: boolean;
    displayData?: any;
    companyLoginId: string;
    companyName: string;
    userName: string;
    language: string;
    latestSettingUpdateDate: number;
    isAdmin: boolean;
    numberRecordInProcess: number;
    numberRecordNotInProcess: number;
    totalRecord: number;
    responseError?: any;
  };