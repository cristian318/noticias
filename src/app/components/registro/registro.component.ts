import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Program } from 'src/app/models/program.model';
import { Student } from 'src/app/models/student.model';
import { NewsService } from 'src/app/services/news.service';
import { RegisterService } from 'src/app/services/register.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit, OnDestroy {
  formStudent!: FormGroup;

  studentModel = Student;

  validationMessages: any;

  programs: Program[] = [];

  observables: any[];

  constructor(
    private registerService: RegisterService,
    private newsService: NewsService,
    private _snackBar: MatSnackBar,
    private routerService: RouterService
  ) {
    this.observables = [];
    this.validationMessages = registerService.validationMessages;
  }

  ngOnInit(): void {
    this.getProrams();
    this.formStudent = this.registerService.createFormStudent();
  }

  ngOnDestroy() {
    this.destroyObservables();
  }

  validationForm(model: string, validation: any) {
    return (
      this.formStudent.get(model)?.hasError(validation.type) &&
      (this.formStudent.get(model)?.dirty ||
        this.formStudent.get(model)?.touched)
    );
  }

  getProrams() {
    this.observables.push(
      this.newsService.getPrograms().subscribe((res: Program[]) => {
        this.programs = res.filter((item, pos) => {
          return res.findIndex((item2) => item2.id === item.id) === pos;
        });
      })
    );
  }

  destroyObservables() {
    this.observables.forEach((observable) => {
      observable.unsubscribe();
    });
  }

  clean() {
    this.formStudent.patchValue({
      [this.studentModel.NAME]: '',
      [this.studentModel.FAMILY_NAME]: '',
      [this.studentModel.PHONE]: '',
      [this.studentModel.PROGRAM]: '',
      [this.studentModel.EMAIL]: '',
      [this.studentModel.COMMENT]: '',
    });
  }

  save() {
    const data = this.formStudent.getRawValue();
    data.program = String(data.program);
    this.registerService.saveData(data).subscribe((res) => {
      if (res.status === 200) {
        this.openSnackBar('Registro exitoso', 'Ok');
        this.clean();
        this.routerService.goto('/home');
      } else {
        this.openSnackBar('Error al crear el registro', 'Ok');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
