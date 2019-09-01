export interface Chronology {
    id: string;
    calendarType: string;
}

export interface AccountCreatedDateTime {
    year: number;
    month: string;
    dayOfMonth: number;
    dayOfWeek: string;
    dayOfYear: number;
    monthValue: number;
    hour: number;
    minute: number;
    second: number;
    nano: number;
    chronology: Chronology;
}

export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
    password?: any;
    confirmPassword?: any;
    accountCreatedDateTime: AccountCreatedDateTime;
    passwordMatching: boolean;
    gender?: any;
    phoneNumber?: any;
    dateOfBirth?: any;
    fieldOfStudy?: any;
    eduEmail?: any;
    profilePicture?: any;
    teacherByCourse?: any;
}

export interface UserRegister {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}


export interface UserImageProfile {
    profileImage: any;
    username: string;
}
