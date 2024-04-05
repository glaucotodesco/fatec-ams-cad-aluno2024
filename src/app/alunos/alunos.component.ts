import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent implements OnInit{

  students: Student[] = [];
  studentFormGroup : FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: StudentService
    ){
    this.studentFormGroup =formBuilder.group({
      id:[''],
      name:[''],
      course:['']
    });
  }


  ngOnInit(): void {
    this.service.getStudents().subscribe({
        next: data => this.students = data
    });
  }

  save(){
    this.students.push(this.studentFormGroup.value);
  }





}
