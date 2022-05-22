import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  isLoading = true;
  user: User ;

  password: string = '';
  confirm_password: string = ''

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  deleteUser(user: User): void {
    // if (window.confirm('Are you sure you want to delete ' + user.username + '?')) {
    //   this.userService.deleteUser(user).subscribe(
    //     data => this.toast.setMessage('user deleted successfully.', 'success'),
    //     error => console.log(error),
    //     () => this.getUsers()
    //   );
    // }
    this.toast.setMessage('لم تفعل خاصية الحذف تواصل مع قسم البرمجة', 'danger')
  }

  modelData = (user)=>{
    this.user = user;
    this.password = '';
    this.confirm_password = '';
  }

  changePassword = ()=>{
    if( this.password && this.password == this.confirm_password){
      this.userService.resetPassword({_id: this.user._id, password: this.password}).subscribe(e=>{
        if(e.success){
          this.toast.setMessage('تمت العملية بنجاح','success')
        }else{
          this.toast.setMessage(e.message,'danger')
        }
      },(err)=> console.log(err))
    }else{
      this.toast.setMessage('كلمة المرور غير متطابقة','warnnig')
    }
  }

}
