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
  id: string;
  studentId: number;
  courseId: number;
  visiting: number[];
  grades: number[];
  averageGrade: number;
  attestation: boolean;
}
export interface EstimateStudent {
  studentId: number;
  courseId: number;
  visiting: number[];
  grades: number[];
  averageGrade: number;
  attestation: boolean;
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
  studentErrorInput: boolean;
  courseErrorInput: boolean;
  visitErrorInput: boolean;
}
