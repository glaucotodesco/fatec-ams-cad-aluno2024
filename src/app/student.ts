import { Course } from "./course";
import { Period } from "./period";

export  interface Student {
  id:  number;
  name: string;
  courseId: number;
  active: boolean;
  period: Period;

}
