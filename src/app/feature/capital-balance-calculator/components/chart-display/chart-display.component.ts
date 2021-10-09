import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';
import { BalancePerYearDataModel } from '../../models/start-balance-graph-data.model';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: ['./chart-display.component.scss'],
})
export class ChartDisplayComponent implements OnChanges {
  @Input() data!: BalancePerYearDataModel;
  public chartData!: any;

  constructor(private elementRef: ElementRef) {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      CategoryScale,
      Title
    );
  }

  public ngOnChanges({ data }: SimpleChanges): void {
    if (data.currentValue && data.currentValue.startBalances?.length) {
      if (this.chartData) {
        this.chartData.destroy();
      }
      this.chartData = this.getChartData();
    }
  }

  private getChartData() {
    let htmlRef = this.elementRef.nativeElement
      .querySelector(`#canvas`)
      .getContext('2d');
    return new Chart(htmlRef, {
      type: 'line',
      data: {
        labels: this.data.years,
        datasets: [
          {
            label: 'Balance per year',
            fill: false,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: '#d3d3d3',
            borderWidth: 2,
            data: this.data.startBalances,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
