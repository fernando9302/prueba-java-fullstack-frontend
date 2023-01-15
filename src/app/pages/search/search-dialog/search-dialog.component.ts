import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultListExamDTO } from 'src/app/dto/consultListExamDTO';
import { Consult } from 'src/app/model/consult';
import { ConsultService } from 'src/app/service/consult.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {

  consult: Consult;
  exams: any;

  constructor(
    private dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Consult,
    private consultService: ConsultService
  ) { }

  ngOnInit(): void {
    this.consult = { ...this.data};
    this.consultService.getExamsByIdConsult(this.consult.idConsult).subscribe(data => {
      console.log(data);
      this.exams = data;
    })
  }

  close(){
    this.dialogRef.close();
  }

}
