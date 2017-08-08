import { Component, OnInit, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({ selector: 'app-rating-chart', templateUrl: './rating-chart.component.html', styleUrls: ['./rating-chart.component.scss'] })
export class RatingChartComponent implements OnInit {

  @Input() chartDate: any;
  single: any[];
  multi: any[];
  view: any[] = [370, 280];

  colorScheme = {domain: ['#E83237', '#E86939', '#EAC341', '#25CF3C', '#38A4E8']};
  showLegend = false;
  showLabels = false;
  explodeSlices = false;
  doughnut = false;
  tooltipDisabled = true;
  constructor() {}
  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
  }

}
