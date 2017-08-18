import { Component, OnInit, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Rating } from '../../pages/rating';
@Component({ selector: 'app-chart', templateUrl: './chart.component.html', styleUrls: ['./chart.component.scss'] })
export class ChartComponent implements OnInit {

  @Input() rating: Rating;
  chartDate;
  single: any[];
  multi: any[];
  view: any[] = [370, 280];
  colorScheme = {
    domain: ['#E83237', '#E86939', '#EAC341', '#38A4E8', '#25CF3C']
    // domain: ['#25CF3C', '#38A4E8', '#EAC341','#E86939', '#E83237']
  };
  showLegend = false;
  showLabels = false;
  explodeSlices = true;
  doughnut = false;
  tooltipDisabled = true;

  show = true;

  constructor() { }

  constructorChartData() {
    this.chartDate = [
      {
        'name': 'schlicht',
        'value': this.rating.veryBad
      }, {
        'name': 'unzufrieden',
        'value': this.rating.bad
      }, {
        'name': 'normal',
        'value': this.rating.normal
      }, {
        'name': 'zufrieden',
        'value': this.rating.god
      }, {
        'name': 'glücklich',
        'value': this.rating.veryGod
      }
    ];

  }
  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    const checkIfZero = this.rating.veryBad + this.rating.bad + this.rating.normal + this.rating.god + this.rating.veryGod;
    if (checkIfZero === 0) {
      this.show = false;
    }
    this.constructorChartData();

  }

}
