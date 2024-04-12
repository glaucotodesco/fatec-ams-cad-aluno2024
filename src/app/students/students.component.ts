import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  studentFormGroup: FormGroup;
  isEditing: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private service: StudentService
  ) {
    this.studentFormGroup = formBuilder.group({
      id: [''],
      name: [''],
      course: ['']
    });
  }


  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.service.getStudents().subscribe({
      next: data => this.students = data
    });
  }

  save() {
    if (this.isEditing) {
      this.service.update(this.studentFormGroup.value).subscribe({
        next: () => {
          this.loadStudents();
          this.isEditing = false;
          this.studentFormGroup.reset();
        }
      })
    }
    else {
      this.service.save(this.studentFormGroup.value).subscribe({
        next: data => {
          this.students.push(data);
          this.studentFormGroup.reset();
        }
      });
    }
  }

  delete(student: Student) {
    this.service.delete(student).subscribe({
      next: () => this.loadStudents()
    });
  }

  update(student: Student) {
    this.isEditing = true;
    this.studentFormGroup.setValue(student);
  }





}
