import { FilterApiRequest, FilterRequest } from "../filter/collections"

/**
 * Not in use, as the data doesn't have specific format
 * Sometimes it is Male or MALE.
 */
enum GENDER {
    MALE = "Male",
    FEMALE = "Female"
}

/**
 * Not in use, as not aware of Complete Domain
 * Can be added for more type check once domain is known
 * 
 * Same goes with ROLE
 */
enum STATUS {
    VALUE_0 = 0,
    VALUE_1 = 1
}

/**
 * All the Class related information of a Particular Student
 */
export interface StudentClassInfoType {
    faces: Array<any>,
    _id: string,
    student_id: string,
    class_name: string,
    section: string,
    dob: string,
    gender: string,
}

type StringOrNull = string | null

/**
 * Detailed information about a Student
 * Whether it is personal, class related or Functional Information
 * 
 * Type can be bettered if the information is known, like what all are mandatory or not
 */
export interface StudentAllInfoType {
    soft_deleted: boolean,
    profile_picture: StringOrNull,
    is_verified: boolean,
    is_blocked: boolean,
    status: number,
    _id: string,
    email: string,
    first_name: string,
    last_name: string,
    campus: StringOrNull,
    mobile_number: StringOrNull,
    role: number,
    student: StudentClassInfoType | null,
    createdAt: string,
    updatedAt: string,
    __v: number,
    last_logged_in?: StringOrNull,
    avatar: StringOrNull,
}

export interface StudentCardProps {
    studentInfo: StudentAllInfoType,
    index: number
}

export interface ClassSectionType {
    _id: StringOrNull,
    section: StringOrNull,
    total_student: number,
    createdAt: string,
    updatedAt: string,
}

export interface SubjectType {
    _id: StringOrNull,
    subject_name: StringOrNull,
    __v: number,
}

export interface CampusType {
    _id: StringOrNull,
    campus_name: StringOrNull,
    __v: number,
}

export interface IndividualClassInfoType {
    _id: string,
    class_name: string,
    total_section: StringOrNull,
    total_class_student: number,
    section: Array<ClassSectionType>
}

export interface ClassDataType {
    classes: Array<IndividualClassInfoType>,
    subjects: Array<SubjectType>,
    campus: Array<CampusType>
}

export interface ClassDetailResponse {
    data: ClassDataType,
    status: number,
    message: StringOrNull,
}

export interface HompepageState {
    showFilterModal: boolean,
    filterState: FilterRequest,
    filterApiRequest: FilterApiRequest
}