import { Location } from "./location";

export interface Service {
    id?: string;
    uid: string;
    title: string;
    description: string;
    category: string;
    icon?: string;
    services: ServiceData[];
    company: string;
    dateCreated: string;
    location: Location;
    distance?: string;
    postedBy?: string;
}


export interface ServiceData {
    name: string;
    description: string;
}
