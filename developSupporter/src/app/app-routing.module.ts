import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewIssueComponent } from './issue/new-issue/new-issue.component';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
    { path: 'home', 
        children: [
            {path:'', component: HomeComponent},
            {path:'newIssue', component: NewIssueComponent, canActivate: [AuthGuard]}
        ]},
    { path: '**', redirectTo: 'home', pathMatch: "full" }
];

@NgModule({
    imports: [
    RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}