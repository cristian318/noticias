import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Student } from 'src/app/models/student.model';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  formStudent!: FormGroup;

  studentModel = Student;

  validationMessages: any;

  constructor(private registerService: RegisterService) {
    this.validationMessages = registerService.validationMessages;
  }

  ngOnInit(): void {
    this.formStudent = this.registerService.createFormStudent();
  }

  validationForm(model: string, validation: any) {
    return (
      this.formStudent.get(model)?.hasError(validation.type) &&
      (this.formStudent.get(model)?.dirty ||
        this.formStudent.get(model)?.touched)
    );
  }
}
