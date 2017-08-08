import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Rating, Review } from '../../';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import * as jsPDF from 'jspdf';
import * as jpt from 'jspdf-autotable';

@Component({ selector: 'app-rating-info', templateUrl: './rating-info.component.html', styleUrls: ['./rating-info.component.scss'] })
export class RatingInfoComponent implements OnInit {

  @ViewChild('chartContainer') chartContainer: ElementRef;
  @Input() rating: Rating;
  @Input() reviews: Review[];
  @Input() chartDate: any;
  @Output() updateRating: EventEmitter<Rating> = new EventEmitter<Rating>();
  @Output() deletRatingId: EventEmitter<any> = new EventEmitter<any>();


  checked: boolean = false;
  showChart: boolean = true;
  highlights = new Set<string>();
  displayedColumns = ['userName'];
  reviewDatabase;
  EnablePdfButton:boolean = true;
  dataSource: ReviewDataSource | null;
  createdAt: string;
  waitingTime;
  constructor(public dialog: MdDialog) { }
  outRatingStatus(data: boolean): void {
    this.rating.active = data;
    this.updateRating.emit(this.rating);
  }
  waitingTimeOnChange(value){
    this.rating.waitingTime = value;
    this.updateRating.emit(this.rating);
  }
  deletRating(): void {
    const dialogRef = this.dialog.open(RatingDeleteDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.deletRatingId.emit(this.rating);
      }

    });
  }

  setReviewData(reviews): void {
    this.checked = this.rating.active;
    this.reviewDatabase = new ReviewDatabase(reviews);
    this.dataSource = new ReviewDataSource(this.reviewDatabase);
    this
      .highlights
      .add('odd');
    this.convertCreatedAt();
    if(reviews.length > 0){
      this.EnablePdfButton = false;
    }else{
      this.EnablePdfButton = true;
    }
  }
  ngOnInit() {
    this.setReviewData(this.reviews);
  }

  convertCreatedAt() {
    let todate = new Date(this.rating.createdAt).getDate();
    let tomonth = new Date(this.rating.createdAt).getMonth() + 1;
    let toyear = new Date(this.rating.createdAt).getFullYear();
    this.createdAt = tomonth + '/' + todate + '/' + toyear;
  }
  
  ceatePDF() {
    const me = this
    var doc = new jsPDF();
    var startingPage = doc
      .internal
      .getCurrentPageInfo()
      .pageNumber;
    let columns = ['SCHLICHT', 'UNZUFRIEDEN', 'NORMAL', 'ZUFRIEDEN', 'GLÜCKLICH']
    let rows = [
      [this.rating.veryBad, this.rating.bad, this.rating.normal, this.rating.god, this.rating.veryGod]
    ];
    var doc = new jsPDF('p', 'pt');
    jpt;

    doc.setFontSize(14);
    doc.setFontType('normal');
    doc.text('Name: ' + this.rating.nameOfRat, 30, 40);
    doc.text('Beschreibung: ' + this.rating.description, 30, 60);
    doc.text('Hergestellt in: ' + this.createdAt, 30, 80);

    doc.autoTable(columns, rows, {
      startY: 100,
      margin: {
        top: 6,
        left: 30,
        right: 30
      },
      theme: 'striped'

    });

    let rowsRev = [];
    for (let rev of this.reviews) {
      let item = rev
      rowsRev.push({ 'Reviews': item });
    }
    let columnsRev = [
      {
        title: 'Bewertungen',
        dataKey: 'Reviews'
      }
    ]
    doc.text('Bewertungen', 30, doc.autoTable.previous.finalY + 20);

    doc.autoTable(columnsRev, rowsRev, {
      styles: {
        overflow: 'linebreak'
      },
      showHeader: 'everyPage',
      drawHeaderRow: function (row, data) {
        //return false; //if you want to hide header
        return true;
      },
      startY: doc.autoTable.previous.finalY + 30,
      margin: {
        top: 6,
        left: 30,
        right: 30
      },
      theme: 'striped',
      columnStyles: {
        0: {
          columnWidth: 2.5
        },
        1: {
          columnWidth: 5.4
        }
      }
    });

    doc.setProperties({ title: this.rating.nameOfRat, subject: this.rating.description })
    // doc.fromHTML(document.getElementById('chartContainer'),3,4)
    doc.save(this.rating.nameOfRat + '.pdf');

  }

}

export interface Reviews {
  name: string;
}

export class ReviewDatabase {
  dataChange: BehaviorSubject<Reviews[]> = new BehaviorSubject<Reviews[]>([]);
  get data(): Reviews[] {
    return this.dataChange.value;
  }
  reviews: [any]
  constructor(reviews) {
    this.reviews = reviews
    if (reviews != undefined)
      for (let i = 0; i < reviews.length; i++) {
        this.addUser(i);
      }
  }

  addUser(i) {
    const copiedData = this
      .data
      .slice();
    copiedData.push(this.createNewUser(i));
    this
      .dataChange
      .next(copiedData);
  }

  private createNewUser(i) {
    const name = this.reviews[i];

    return { name: name };
  }
}

export class ReviewDataSource extends DataSource<any> {
  constructor(private _ReviewDatabase: ReviewDatabase) {
    super();
  }
  connect(): Observable<Reviews[]> {
    return this._ReviewDatabase.dataChange;
  }

  disconnect() { }
}



@Component({
  selector: 'rating-delet-dialog',
  template: `
    <h1 md-dialog-title>Dialog</h1>
    <div md-dialog-content>Möchten Sie diese Bewertung löschen?</div>
    <div md-dialog-actions>
      <button md-button md-dialog-close='false'>Nein</button>
      <button md-button md-dialog-close='true'>Ja</button>
    </div>
`,
})
export class RatingDeleteDialog {
  constructor(public dialogRef: MdDialogRef<RatingDeleteDialog>) { }
}
