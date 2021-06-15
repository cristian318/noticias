import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Student } from '../models/student.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  studentModel = Student;

  validationMessages = {
    [this.studentModel.NAME]: [
      { type: 'required', message: 'El nombre es requerido.' },
      { type: 'pattern', message: 'El nombre solo debe contener letras' },
    ],
    [this.studentModel.FAMILY_NAME]: [
      { type: 'required', message: 'El apellido es requerido.' },
      { type: 'pattern', message: 'El apellido solo debe contener letras' },
    ],
    [this.studentModel.EMAIL]: [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'pattern', message: 'El email no tiene un formato válido.' },
    ],
    [this.studentModel.PHONE]: [
      { type: 'required', message: 'El teléfono es requerido.' },
      { type: 'pattern', message: 'El teléfono solo debe contener números' },
      {
        type: 'minlength',
        message: 'El teléfono debe ser minimo de 1 caracteres.',
      },
      {
        type: 'maxlength',
        message: 'El teléfono debe ser como maximo de 10 caracteres.',
      },
    ],
    [this.studentModel.PROGRAM]: [
      { type: 'required', message: 'El programa es requerido.' },
    ],
    [this.studentModel.COMMENT]: [
      { type: 'required', message: 'El comentario es requerido.' },
    ],
  };

  constructor(private formB: FormBuilder, private httpService: HttpService) {}

  createFormStudent() {
    return this.formB.group({
      [this.studentModel.NAME]: new FormControl(
        'pruea',
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-záéíóúüÁÉÍÓÚÜñÑ ]+'),
        ])
      ),
      [this.studentModel.FAMILY_NAME]: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-záéíóúüÁÉÍÓÚÜñÑ ]+'),
        ])
      ),
      [this.studentModel.EMAIL]: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.([a-zA-Z]{2,4})+$'
          ),
        ])
      ),
      [this.studentModel.PROGRAM]: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      [this.studentModel.PHONE]: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.pattern('[0-9]+'),
        ])
      ),
      [this.studentModel.COMMENT]: new FormControl(''),
    });
  }

  saveData(data: any) {
    return this.httpService.makePost('servicios/registro', data);
  }
}
