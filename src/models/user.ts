export interface User {
    id?: string;
    uid: string;
    email: string;
    phone: string;
    password?: string;
    firstname: string;
    lastname: string;
    dob: string;
    gender: string;
    race: string;
    company: Company;
    location: {
        address: string;
        geo: {
            lat: number;
            lng: number;
        }
    },
    settings: {
        hide_dob: boolean,
        hide_email: boolean,
        hide_phone: boolean,
    }
    dateCreated: string;
}

export interface Activity {
    uid: string;
    oid: string;
    sid: string;
    date: string;
}

export interface Company {
    name: string;
    regId: string;
    dateRegistered: string;
}

export interface Settings {
    hide_dob: boolean,
    hide_email: boolean,
    hide_phone: boolean,
}