import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { CourseService } from '../course.service';
import { Course } from '../course';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  courses: Course[] = [];
  studentFormGroup: FormGroup;
  isEditing: boolean = false;
  submitted: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private studentService: StudentService,
    private courseService: CourseService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.studentFormGroup = formBuilder.group({
      id: [''],
      name: ['', [Validators.minLength(3), Validators.required]],
      course: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
    this.loadStudents();
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

  save() {

    this.submitted = true;

    console.log(this.studentFormGroup.value);

    if (this.studentFormGroup.valid) {
      if (this.isEditing) {
        this.studentService.update(this.studentFormGroup.value).subscribe({
          next: () => {
            this.loadStudents();
            this.isEditing = false;
            this.studentFormGroup.reset();
            this.submitted = false;
          }
        })
      }
      else {
        this.studentService.save(this.studentFormGroup.value).subscribe({
          next: data => {
            this.students.push(data);
            this.studentFormGroup.reset();
            this.submitted = false;
          }
        });
      }
    }
  }

  delete(student: Student) {
    this.studentService.delete(student).subscribe({
      next: () => this.loadStudents()
    });
  }

  update(student: Student) {
    this.isEditing = true;
    this.studentFormGroup.patchValue({
      id: student.id,
      name: student.name,
      course: student.course
    });

    console.log(this.studentFormGroup.value);
  }


  get name(): any {
    return this.studentFormGroup.get('name');
  }

  get course(): any {
    return this.studentFormGroup.get('course');
  }
}
