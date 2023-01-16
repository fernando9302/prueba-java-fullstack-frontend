import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../service/guard.service';
import { ConsultAutocompleteComponent } from './consult-autocomplete/consult-autocomplete.component';
import { ConsultWizardComponent } from './consult-wizard/consult-wizard.component';
import { ConsultComponent } from './consult/consult.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExamEditComponent } from './exam/exam-edit/exam-edit.component';
import { ExamComponent } from './exam/exam.component';
import { MedicComponent } from './medic/medic.component';
import { Not403Component } from './not403/not403.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { PatientComponent } from './patient/patient.component';
import { ReportComponent } from './report/report.component';
import { SearchComponent } from './search/search.component';
import { SpecialtyEditComponent } from './specialty/specialty-edit/specialty-edit.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SignComponent } from './sign/sign.component';
import { SignEditComponent } from './sign/sign-edit/sign-edit.component';

export const routes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { breadcrumb: 'Dashboard' },
      canActivate: [ GuardService ]
    },    
    {
        path: 'patient',
        component: PatientComponent,
        data: { breadcrumb: 'Patient' }, //sirve para el enfoque manual o para la libreria xng-breadcrumb
        children: [
          { path: 'new', component: PatientEditComponent, data: { breadcrumb: 'patient-new' } },
          { path: 'edit/:id', component: PatientEditComponent, data: { breadcrumb: 'patient-edit' } },
        ],
        canActivate: [ GuardService ]
      },
      {
        path: 'exam',
        component: ExamComponent,
        data: { breadcrumb: 'Exam' },
        children: [
          { path: 'new', component: ExamEditComponent, data: { breadcrumb: 'exam-new' } },
          { path: 'edit/:id', component: ExamEditComponent, data: { breadcrumb: 'exam-edit' } },
        ],
        canActivate: [ GuardService ]
      },
      {
        path: 'specialty',
        component: SpecialtyComponent,
        data: { breadcrumb: 'Specialty' },
        children: [
          { path: 'new', component: SpecialtyEditComponent, data: { breadcrumb: 'specialty-new' } },
          { path: 'edit/:id', component: SpecialtyEditComponent, data: { breadcrumb: 'specialty-edit' } },
        ],
        canActivate: [ GuardService ]
      },
      {
        path: 'medic',
        component: MedicComponent,
        data: { breadcrumb: 'Medic' },
        canActivate: [ GuardService ]
      },
      {
        path: 'consult',
        component: ConsultComponent,
        data: { breadcrumb: 'Consult-Select' },
        canActivate: [ GuardService ]
      },
      {
        path: 'consult-autocomplete',
        component: ConsultAutocompleteComponent,
        data: { breadcrumb: 'Consult-Autocomplete' },
        canActivate: [ GuardService ]
      },
      {
        path: 'consult-wizard',
        component: ConsultWizardComponent,
        data: { breadcrumb: 'Consult-Wizard' },
        canActivate: [ GuardService ]
      },
      {
        path: 'search',
        component: SearchComponent,
        data: { breadcrumb: 'Search' },
        canActivate: [ GuardService ]
      },
      {
        path: 'report',
        component: ReportComponent,
        data: { breadcrumb: 'Report' },
        canActivate: [ GuardService ]
      },  
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { breadcrumb: 'Perfil' },
        canActivate: [ GuardService ]
      }, 
      {
        path: 'sign',
        component: SignComponent,
        data: { breadcrumb: 'Sign' },
        children: [
          { path: 'new', component: SignEditComponent, data: { breadcrumb: 'sign-new' } },
          { path: 'edit/:id', component: SignEditComponent, data: { breadcrumb: 'sign-edit' } },
        ],
        canActivate: [ GuardService ]
      },
      {
        path: 'not-403',
        component: Not403Component
      }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PagesRoutingModule { }