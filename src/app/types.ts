//======================STUDENTS TYPES======================
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
export interface StudentsState {
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
  quantityGradesErrorInput: boolean;
  visitErrorInput: boolean;
}

//======================RICK AND MORTY TYPES======================

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Info {
  count: number | null;
  pages: number | null;
  next: string;
  prev: string;
}

export interface CharactersPageData {
  info: Info;
  results: Character[];
}

export interface RickAndMortyState {
  character: Character | null;
  characters: Character[];
  info: Info;
  countPage: number;
  loading: boolean;
  error: boolean;
}

export interface Filters {
  name: string;
  gender: string;
  status: string;
}
