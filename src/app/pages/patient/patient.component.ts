import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dni', 'actions'];
  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalElements: number;

  constructor(
    private patientService: PatientService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.patientService.getPatientChange().subscribe(data => {
      this.createTable(data);
    });

    this.patientService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {duration: 2000});
    });

    this.patientService.listPageable(0, 2).subscribe(data => {
      this.createTable(data);
    });    
  }

  createTable(data: any){
    this.dataSource = new MatTableDataSource(data.content);
    this.totalElements = data.totalElements;
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  delete(idPatient: number){
    this.patientService.delete(idPatient).pipe(switchMap( ()=> {
      return this.patientService.findAll();
    }))
    .subscribe(data => {
      this.patientService.setPatientChange(data);
      this.patientService.setMessageChange("DELETED!");
    });
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  showMore(e: any){
    this.patientService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.createTable(data);
    });
  }

}
