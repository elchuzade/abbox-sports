interface State {
  auth: AuthRedux;
  response: ResponseRedux;
  profile: ProfileRedux;
  exercise: ExerciseRedux;
}

interface AuthRedux {
  isAuthenticated: boolean;
  user: UserDataDecoded | null;
  loadingAuth: boolean;
}

interface ResponseRedux {
  loading: boolean;
  status: string | number;
  message: string;
  errors: object | null;
}

interface ProfileRedux {
  profile: Profile | null;
}

interface ExerciseRedux {
  exercises: Exercise[];
  exercise: Exercise | null;
}

interface SignupUserData {
  email: string;
  password: string;
  password2: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

// Check this field when logged in
interface UserDataDecoded {
  id: string;
  iat: string;
  exp: string;
  permission: number;
}

interface Profile {
  name: string;
}

interface NewExercise {
  name: string;
  tags: string[];
}

interface Exercise {
  _id: string;
  name: string;
  tags?: string[];
  exerciseSets?: string[];
}

interface NewExerciseSet {
  weight?: number;
  duration?: number;
  repetitions?: number;
}

interface ExerciseSet {
  _id: string;
  weight?: number;
  duration?: number;
  repetitions?: number;
}