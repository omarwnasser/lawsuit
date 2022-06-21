import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from "@angular/router";
import { LawsuitService, LawsuitTableService, RequestTableService } from "../services/lawsuit.service";
import { SharedModule } from "../shared/shared.module";
import { AddlawsuitComponent } from "./addlawsuit/Addlawsuit.component";
import { HomeComponent } from "./home.component";
import { LawsutitTableComponent } from "./lawsuittable/lawsuittable.component";


@NgModule({
  declarations: [
    HomeComponent,
    LawsutitTableComponent,
    AddlawsuitComponent
  ],
  imports:[
    RouterModule,
    CommonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTabsModule,
    MatPaginatorModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  providers: [
    LawsuitService,
    LawsuitTableService,
    RequestTableService,
  ]
})

export class HomeModule{};
