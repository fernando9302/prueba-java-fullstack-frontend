import { Component, OnInit, ViewChild } from '@angular/core';
import { Sign } from 'src/app/model/sign';
import { SignService } from 'src/app/service/sign.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  displayedColumns: string[] = ['idSign', 'patient', 'signDate', 'temperature', 'pulse', 'heartRate', 'actions'];
  dataSource: MatTableDataSource<Sign>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalElements: number;

  constructor(
    private signService: SignService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.signService.getSignChange().subscribe(data => {
      this.createTable(data);
    });

    this.signService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', {duration: 2000});
    });

    this.signService.listPageable(0, 10).subscribe(data => {
      this.createTable(data);
    });    
  }

  createTable(data: any){
    this.dataSource = new MatTableDataSource(data.content);
    this.totalElements = data.totalElements;
  }

  delete(idSign: number){
    this.signService.delete(idSign).pipe(switchMap( ()=> {
      return this.signService.listPageable(0,10);
    }))
    .subscribe(data => {
      this.signService.setSignChange(data);
      this.signService.setMessageChange("DELETED!");
    });
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  showMore(e: any){
    this.signService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.createTable(data);
    });
  }
}
