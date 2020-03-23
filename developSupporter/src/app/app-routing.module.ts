import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewIssueComponent } from './issue/new-issue/new-issue.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReactToIssueComponent } from './issue/react-to-issue/react-to-issue.component';


const routes: Routes = [
    { path: 'home', 
        children: [
            {path:'', component: HomeComponent},
            {path: 'readIssue', component: ReactToIssueComponent},
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