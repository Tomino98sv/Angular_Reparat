import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header/header.component';
import { MaterialModule } from 'modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { UserAccountComponent } from './user-account/user-account.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import { AuthGuard } from 'src/guards/auth.guard';
import { IssueComponent } from './issue/issue.component';
import { HomeComponent } from './home/home.component';
import { NewIssueComponent } from './issue/new-issue/new-issue.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactToIssueComponent } from './issue/react-to-issue/react-to-issue.component';
import { CommentIssueComponent } from './issue/react-to-issue/comment-issue/comment-issue.component';
import { ReactionComponent } from './issue/react-to-issue/reaction/reaction.component';
import { VisitUserAccountComponent } from './visit-user-account/visit-user-account.component';
import { DialogUnAuthorizedComponent } from 'src/dialogs/unauthorized/dialog-unauthorized';
import { DialogConfirmLeaveComponent } from 'src/dialogs/confirmLeave/dialog-confirmLeave';
import { DialogDeleteComponent } from 'src/dialogs/deleteDialog/dialog-delete';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserAccountComponent,
    IssueComponent,
    HomeComponent,
    NewIssueComponent,
    ReactToIssueComponent,
    CommentIssueComponent,
    ReactionComponent,
    VisitUserAccountComponent,
    DialogUnAuthorizedComponent,
    DialogConfirmLeaveComponent,
    DialogDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
