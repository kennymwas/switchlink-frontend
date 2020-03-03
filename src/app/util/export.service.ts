import {ElementRef, Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  exportToExcel(elem: ElementRef, name: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(elem.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, name);

    /* save to file */
    XLSX.writeFile(wb, name + '.xlsx');
  }

  exportToPdf(id: string, name: string) {

    const data = document.getElementById(id);
    console.log(data);
    html2canvas(data).then(canvas => {
      const pdf = new jspdf('p', 'mm', 'a4');
      pdf.save(name + '.pdf'); // Generated PDF
    });
  }
}
