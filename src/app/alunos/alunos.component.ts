import { Component } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent {

  students: Student[] = [];
  studentFormGroup : FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.studentFormGroup =formBuilder.group({
      id:[''],
      name:[''],
      course:['']
    });
  }

  save(){
    this.students.push(this.studentFormGroup.value);
  }





}
