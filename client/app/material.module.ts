import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import {
     MatRippleModule ,
     MatOptionModule ,
     MatLineModule ,
     MatCommonModule ,
    NativeDateModule ,
    MatPseudoCheckboxModule ,
    MatNativeDateModule
} from '@angular/material/core'; 

@NgModule({
    imports:[
        MatToolbarModule,
        MatNativeDateModule,
        MatButtonModule,
        MatRippleModule ,
        MatOptionModule ,
        MatLineModule ,
        MatCommonModule ,
        NativeDateModule ,
        MatPseudoCheckboxModule ,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatDialogModule,
        MatGridListModule,
        MatListModule,
        MatSelectModule,
        MatTabsModule,
        MatTableModule,
        MatRadioModule,
    ],
    exports : [
        MatToolbarModule,
        MatNativeDateModule ,
        MatButtonModule,
        MatRippleModule ,
        MatOptionModule ,
        MatLineModule ,
        MatCommonModule ,
        NativeDateModule ,
        MatPseudoCheckboxModule ,
        MatIconModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatDialogModule,
        MatGridListModule,
        MatListModule,
        MatSelectModule,
        MatTabsModule,
        MatTableModule,
        MatRadioModule,
    ]
})

export class MaterialModule { }