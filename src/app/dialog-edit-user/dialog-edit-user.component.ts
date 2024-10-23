import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent {
  user: User | undefined;
  userId!: string;
  loading: boolean = false;
  birthDate: Date | null = null;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    if (this.user) {
      this.birthDate = this.user.birthDateAsDate || null;
    }
  }

  saveUser() {
    this.loading = true;

    const userDocRef = doc(this.firestore, `users/${this.userId}`);

    updateDoc(userDocRef, {
      firstName: this.user?.firstName,
      lastName: this.user?.lastName,
      email: this.user?.email,
      birthDate: this.birthDate
        ? Math.floor(this.birthDate.getTime() / 1000)
        : null,
    })
      .then(() => {
        this.loading = false;
        this.dialogRef.close(this.user);
      })
      .catch((error) => {
        console.error('Error updating user: ', error);
        this.loading = false;
      });
  }
}
