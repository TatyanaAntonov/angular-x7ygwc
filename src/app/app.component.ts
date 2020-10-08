//our root app component
import {
  Component,
  NgModule,
  VERSION,
  AfterViewInit,
  OnInit
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  ModalDismissReasons,
  NgbDate,
  NgbModal
} from "@ng-bootstrap/ng-bootstrap";
import { registerLocaleData } from "@angular/common";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  private _users: User[];

  name: string;
  family: string;
  dateOfBirth?: Date;
  editingIndex: number;
  closeResult = "";
  modalForm: FormGroup;
  isValid: boolean = false;
  //submitted = false;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this._users = [
      new User("Ali", "Delshad",1977-10-10),
      new User("Hamid", "Sadeghi",1980-5-12),
      new User("Amir", "Olfat",1994-1-7),
      new User("Keyvan", "Nasr",1979-12-1)
    ];
  }
  ngOnInit() {
    this.modalForm = this.formBuilder.group({
      name: ["", Validators.required],
      family: ["", Validators.required],
      dateOfBirth: ["", [Validators.required]]
    });
  }
  get f() {
    return (this.isValid = this.modalForm.valid);
  }
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.setEditUser(result);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  onSubmit() {
    const controls = this.modalForm.controls;
    if (this.modalForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this._users.push(new User(this.name, this.family));
    this.name = "";
    this.family = "";
    this.dateOfBirth = new Date();
    this.modalService.dismissAll();
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.modalForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }
  get users(): User[] {
    return this._users;
  }

  delete(index: number) {
    this._users.splice(index, 1);
  }
  clearTable() {
    this._users = [];
  }

  setEditUser(index: number): void {
    this.editingIndex = index;
    this.name = this._users[index].name;
    this.family = this._users[index].family;
    this.getDismissReason("Save click");
  }

  edit(): void {
    this._users[this.editingIndex] = new User(this.name, this.family);
    this.editingIndex = undefined;
    this.name = "";
    this.family = "";
  }

  add(): void {
    this._users.push(new User(this.name, this.family));
    this.name = "";
    this.family = "";
    this.dateOfBirth = new Date();
  }
}

export class AppModule {}

export class User {
  private _name: string;
  private _family: string;
  private _itemNum: number;
  private _birthday: LocalDate;

  constructor(
    name: string,
    family: string,
    itemNum?: number,
    birthday?: LocalDate
  ) {
    this._name = name;
    this._family = family;
    this._birthday = birthday;
  }

  get name(): string {
    return this._name;
  }

  get family(): string {
    return this._family;
  }

  get itemNum(): number {
    return this._itemNum;
  }

  get birthday(): LocalDate {
    return this._birthday;
  }
}

export interface LocalDate {
  day: number;
  month: number;
  year: number;
}
