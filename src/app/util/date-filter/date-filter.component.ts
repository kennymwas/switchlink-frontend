import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent {

  fromDate: Date;
  toDate: Date;

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  @Output() submitForm = new EventEmitter<any>();
  @Input() filterParams: string;
  filter_needle: string;


  filterById(): void {
    const dateFiltered = {
      fromDate: this.fromDate, toDate: this.toDate, filter_needle: this.filter_needle
    };
    this.submitForm.emit(dateFiltered);
  }

  clear(form: NgForm): void {
    const filter = {
      fromDate: undefined, toDate: undefined, filter_needle: undefined
    };
    this.submitForm.emit(filter);
    form.resetForm();
  }
}
