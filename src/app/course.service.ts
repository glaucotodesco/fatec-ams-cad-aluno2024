import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './course';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url = 'http://localhost:3000/courses';

  constructor(private http:HttpClient) { }

  getCourses(): Observable<Course[]>{
      return this.http.get<Course[]>(this.url);
  }

  getStudentsFromCourse(id: number): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.url}/${id}/students`);
  }

  getCourse(id: number): Observable<Course>{
    return this.http.get<Course>(`${this.url}/${id}`);
  }

  save(student: Course): Observable<Course>{
    return this.http.post<Course>(this.url, student);
 }

 delete(student: Course) : Observable<void>{
     return this.http.delete<void>(`${this.url}/${student.id}`);
 }

 update(student: Course) : Observable<Course>{
     return this.http.put<Course>(`${this.url}/${student.id}`,student);
 }
}
