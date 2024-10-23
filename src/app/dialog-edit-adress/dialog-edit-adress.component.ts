import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressBarModule,
    FormsModule,
    MatCardModule,
  ],
  templateUrl: './dialog-edit-adress.component.html',
  styleUrl: './dialog-edit-adress.component.scss',
})
export class DialogEditAdressComponent {
  user: User | undefined;
  loading: boolean = false;
  birthDate!: Date;
  userId!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogEditAdressComponent>,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {}

  saveUser() {
    this.loading = true;
    
    const userDocRef = doc(this.firestore, `users/${this.userId}`);

    updateDoc(userDocRef, {
      street: this.user?.street,
      city: this.user?.city, 
      zipCode: this.user?.zipCode,   
    }).then(() => {
      this.loading = false;
      this.dialogRef.close(this.user);
    }).catch(error => {
      console.error('Error updating address: ', error);
      this.loading = false; 
    });
  }
}
