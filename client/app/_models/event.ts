export class Event {
    _id: string;
    userId: string;         //userId of admin
    name: string;           //name of event
    timedate: string;
    description: string;    //description of the event
    category: string;       
    loctation: string;      //location ID
    type: string;           //Type of event ( private, public, RSO ...)
    status: string;         // Approved, not-approved, pending....
}