import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AddlawsuitComponent } from "./addlawsuit/Addlawsuit.component";
import { HomeComponent } from "./home.component";
import { LawsutitTableComponent } from "./lawsuittable/lawsuittable.component";


@NgModule({
  declarations: [
    HomeComponent,
    LawsutitTableComponent,
    AddlawsuitComponent,
  ],
  imports:[
    RouterModule
  ]
})

export class HomeModule{};
