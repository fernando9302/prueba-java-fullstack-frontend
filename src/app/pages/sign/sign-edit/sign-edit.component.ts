import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, Observable, map } from 'rxjs';
import { Sign } from 'src/app/model/sign';
import { SignService } from 'src/app/service/sign.service';
import { Patient } from '../../../model/patient';
import { PatientService } from '../../../service/patient.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sign-edit',
  templateUrl: './sign-edit.component.html',
  styleUrls: ['./sign-edit.component.css']
})
export class SignEditComponent implements OnInit {

  id: number;
  isEdit: boolean;
  form: FormGroup;

  //patientControl: FormControl = new FormControl();
  patientsFiltered$: Observable<Patient[]>;
  patients: Patient[];

  constructor(
    private signService: SignService,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      idSign: new FormControl(0),
      signDate: new FormControl(this.datePipe.transform(new Date(), 'dd/MM/yyyy')),
      patient: new FormControl(),
      temperature: new FormControl('', [
        Validators.required,
        Validators.maxLength(5),
      ]),
      pulse: new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
      ]),
      heartRate: new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
      ]),
    });

    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });

    this.loadInitialData();
    this.patientsFiltered$ = this.form.controls['patient'].valueChanges.pipe(map(val => this.filterPatients(val)));
  }

  loadInitialData() {
    this.patientService.findAll().subscribe(data => this.patients = data);
  }


  showPatient(val: any){
    return val ? `${val.firstName} ${val.lastName}` : val;
  }

  filterPatients(val: any){
    if (val?.idPatient > 0) {
      return this.patients.filter(el =>
        el.firstName.toLowerCase().includes(val.firstName.toLowerCase()) || el.lastName.toLowerCase().includes(val.lastName.toLowerCase()) || el.dni.includes(val)
      )
    } else {
      return this.patients.filter(el =>
        el.firstName.toLowerCase().includes(val?.toLowerCase()) || el.lastName.toLowerCase().includes(val?.toLowerCase()) || el.dni.includes(val)
      );
    }
  }

  initForm() {
    if (this.isEdit) {
      this.signService.findById(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idSign: new FormControl(data.idSign),
          signDate: new FormControl(this.datePipe.transform(data.signDate, 'dd/MM/yyyy')),
          patient: new FormControl(data.patient),
          temperature: new FormControl(data.temperature, [
            Validators.required,
            Validators.maxLength(5),
          ]),
          pulse: new FormControl(data.pulse, [
            Validators.required,
            Validators.maxLength(3),
          ]),
          heartRate: new FormControl(data.heartRate, [
            Validators.required,
            Validators.maxLength(3),
          ]),
        });
        this.patientsFiltered$ = this.form.controls['patient'].valueChanges.pipe(map(val => this.filterPatients(val)));
      });
    }
  }

  operate() {
    if (this.form.invalid) {
      return;
    }
  
    const sign = new Sign();
    sign.idSign = this.form.value['idSign'];
    sign.patient = sign.patient == null ? new Patient() : sign.patient;
    sign.patient.idPatient = this.form.value['patient'].idPatient;
    sign.temperature = this.form.value['temperature'];
    sign.heartRate = this.form.value['heartRate'];
    sign.pulse = this.form.value['pulse'];
    sign.signDate = moment(this.form.value['signDate'], "DD/MM/YYYY").format('YYYY-MM-DDTHH:mm:ss');  

    console.log(sign);

    if (this.isEdit) {
      this.signService.update(sign).pipe(switchMap( ()=> {
        return this.signService.listPageable(0,10);
      }))      
      .subscribe(data => {
        this.signService.setSignChange(data);
        this.signService.setMessageChange('UPDATED!')
      });
    } else {
      this.signService.save(sign).pipe(switchMap( ()=> {
        return this.signService.listPageable(0,10);
      }))      
      .subscribe(data => {
        this.signService.setSignChange(data);
        this.signService.setMessageChange('CREATED!')
      });
    }
    this.router.navigate(['/pages/sign']);
  }

  get f() {
    return this.form.controls;
  }

}
