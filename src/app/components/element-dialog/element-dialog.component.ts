import { Component, Inject, OnInit } from '@angular/core';
import { PeriodicElement } from '../info-card/info-card.component';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-element-dialog',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogClose,
    FormsModule,
  ],
  templateUrl: './element-dialog.component.html',
  styleUrl: './element-dialog.component.scss',
})
export class ElementDialogComponent implements OnInit {
  public element!: PeriodicElement;
  public isChange!: boolean;
  public isFormValid(){
    if(this.validData()){
      return false;
    };
    return true;
  };

  public validData(){
    return this.data.id != null &&
    this.data.placa != null &&
    this.data.chassi != null &&
    this.data.renavan != null &&
    this.data.modelo != null &&
    this.data.marca != null &&
    this.data.ano != null;
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PeriodicElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.id != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    };
  };

  onCancel(): void {
    this.dialogRef.close();
  };
}
