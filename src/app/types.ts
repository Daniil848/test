export interface Course {
  id: number;
  name: string;
}
export interface Student {
  id: number;
  name: string;
}
export interface Visiting {
  id: number;
  value: string;
}
export interface StudentGrades {
  id: number;
  studentId: number;
  courseId: number;
  visiting: number[];
  grades: number[];
}
export interface EstimateStudent {
  studentId: number;
  courseId: number;
  visiting: number[];
  grades: number[];
}
export interface State {
  course: Course | null;
  courses: Course[];
  student: Student | null;
  students: Student[];
  visiting: Visiting[];
  studentsGrades: StudentGrades[];
  loading: boolean;
  error: boolean;
}
