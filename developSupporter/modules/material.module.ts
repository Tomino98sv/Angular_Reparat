import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';


@NgModule({
    imports: [
        MatToolbarModule,
        MatGridListModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatExpansionModule,
        MatDialogModule,
        MatTableModule
    ],
    exports: [
        MatToolbarModule,
        MatGridListModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatExpansionModule,
        MatDialogModule,
        MatTableModule
    ]
})
export class MaterialModule{}