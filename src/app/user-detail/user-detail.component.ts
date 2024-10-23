import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    CommonModule,
    MatCardTitle,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    DialogEditAdressComponent,
    DialogEditUserComponent,
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  userId = '';
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id') ?? '';
      console.log('The user id is: ', this.userId);
      if (this.userId) {
        this.getUsers(this.userId);
      }
    });
  }

  async getUsers(userId: string) {
    try {
      const userDoc = doc(this.firestore, `users/${userId}`);
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log('The user is: ', userData);

        this.user = new User(userData);
      } else {
        console.log('No such user document!');
      }
    } catch (error) {
      console.error('Error fetching user: ', error);
    }
  }

  editUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = this.user;
    dialog.componentInstance.userId = this.userId;

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.user = result;
      }
    });
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user = this.user;
    dialog.componentInstance.userId = this.userId;
  }
}
