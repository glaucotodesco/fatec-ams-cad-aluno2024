import { Component, OnInit, TemplateRef } from '@angular/core';
import { Student } from '../student';
import { Course } from '../course';
import { Period } from '../period';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { CourseService } from '../course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  selectedCourse?: Course;
  students: Student[] = [];
  courses : Course[] = [];
  periods = Object.values(Period);

  courseFormGroup: FormGroup;
  isEditing: boolean = false;
  submitted: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private studentService: StudentService,
    private courseService: CourseService,
    private modalService: NgbModal
  ) {
    this.courseFormGroup = formBuilder.group({
      id: [''],
      name: ['', [Validators.minLength(3), Validators.required]],
    });
  }


  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: data => this.courses = data
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: data => this.students = data
    });
  }

  viewAlunos(modal: TemplateRef<any>, course:Course){
    this.courseService.getStudentsFromCourse(course.id).subscribe({
      next: data => {
          this.students = data;
          this.selectedCourse = course;
          this.modalService.open(modal,{});
      }
    });
  }
  save() {

    this.submitted = true;

    if (this.courseFormGroup.valid) {
      if (this.isEditing) {
        this.courseService.update(this.courseFormGroup.value).subscribe({
          next: () => {
            this.loadCourses();
            this.isEditing = false;
            this.courseFormGroup.reset();
            this.submitted = false;
          }
        })
      }
      else {
        this.courseService.save(this.courseFormGroup.value).subscribe({
          next: data => {
            this.loadCourses();
            this.courseFormGroup.reset();
            this.submitted = false;
          }
        });
      }
    }
  }

  delete(course: Course) {
    this.courseService.delete(course).subscribe({
      next: () => this.loadStudents()
    });
  }

  update(course: Course) {
    this.isEditing = true;
    this.courseFormGroup.setValue(course);
  }

  getCourseName(courseId: number) : Course | undefined{
     return this.courses.find( c => c.id === courseId);
  }

  get name(): any {
    return this.courseFormGroup.get('name');
  }

}
