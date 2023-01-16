import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { MaterialModule } from '../material/material.module';
import { ConsultAutocompleteComponent } from './consult-autocomplete/consult-autocomplete.component';
import { ConsultWizardComponent } from './consult-wizard/consult-wizard.component';
import { ConsultComponent } from './consult/consult.component';
import { ExamEditComponent } from './exam/exam-edit/exam-edit.component';
import { ExamComponent } from './exam/exam.component';
import { LayoutComponent } from './layout/layout.component';
import { MedicDialogComponent } from './medic/medic-dialog/medic-dialog.component';
import { MedicComponent } from './medic/medic.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { PatientComponent } from './patient/patient.component';
import { ReportComponent } from './report/report.component';
import { SearchDialogComponent } from './search/search-dialog/search-dialog.component';
import { SearchComponent } from './search/search.component';
import { SpecialtyEditComponent } from './specialty/specialty-edit/specialty-edit.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Not403Component } from './not403/not403.component';
import { Not404Component } from './not404/not404.component';
import { ForgotComponent } from './login/forgot/forgot.component';
import { TokenComponent } from './login/forgot/token/token.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SignComponent } from './sign/sign.component';
import { SignEditComponent } from './sign/sign-edit/sign-edit.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
        FlexLayoutModule,
        PdfViewerModule,                
        ReactiveFormsModule,
        BreadcrumbModule,
        FormsModule,
        PagesRoutingModule
    ],
    exports: [],
    declarations: [
        PatientComponent,
        MedicComponent,
        PatientEditComponent,
        MedicDialogComponent,
        ExamComponent,
        ExamEditComponent,
        SpecialtyComponent,
        SpecialtyEditComponent,
        ConsultComponent,
        ConsultAutocompleteComponent,
        ConsultWizardComponent,
        SearchComponent,
        SearchDialogComponent,
        ReportComponent,
        LayoutComponent,
        DashboardComponent,
        Not403Component,
        Not404Component,
        ForgotComponent,
        TokenComponent,
        PerfilComponent,
        SignComponent,
        SignEditComponent
    ],
    providers: [DatePipe],
})
export class PagesModule { }
