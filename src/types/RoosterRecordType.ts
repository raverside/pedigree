export default interface RoosterRecordType {
    id?: number;
    color?: string;
    initials?: string;
    feather?: string;
    crest?: string;
    fecha?: string;
    estado?: string;
    mother_id?: number;
    mother_color?: string;
    mother_initials?: string;
    mother_mother_id?: number;
    mother_mother_initials?: string;
    mother_father_id?: number;
    mother_father_initials?: string;
    father_id?: number;
    father_color?: string;
    father_initials?: string;
    father_mother_id?: number;
    father_mother_initials?: string;
    father_father_id?: number;
    father_father_initials?: string;
    notes?: string;
}
