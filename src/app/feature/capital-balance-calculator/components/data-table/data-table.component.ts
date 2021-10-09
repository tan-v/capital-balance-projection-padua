import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CapitalBalanceTableDataModel } from '../../models/capital-balance-table-data.model';
import { TableRows } from './constants/table-rows.constants';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnChanges {
  @Input() data: CapitalBalanceTableDataModel = {};

  public cols: number[] = [];
  public tableData: { data: (string | number)[]; type: string }[] = [];
  public tableRows = TableRows;

  constructor() {}

  /**
   * Angular's OnChanges implementation
   *
   * @memberof DataTableComponent
   */
  public ngOnChanges({ data }: SimpleChanges): void {
    if (data?.currentValue) {
      this.cols = this.getColumns(data.currentValue);
      this.tableData = this.getTableData(data.currentValue);
    }
  }

  /**
   *  returns table columns array
   *
   * @param {CapitalBalanceTableDataModel} data
   * @returns {number[]}
   * @memberof DataTableComponent
   */
  private getColumns(data: CapitalBalanceTableDataModel): number[] {
    return data.year || [];
  }

  /**
   *  returns the fees for current year
   *
   * @param {CapitalBalanceTableDataModel} data
   * @returns { data: (string | number)[]; type: string }[]
   * @memberof DataTableComponent
   */
  private getTableData(
    data: CapitalBalanceTableDataModel
  ): { data: (string | number)[]; type: string }[] {
    const tableData: { data: (string | number)[]; type: string }[] = [];
    this.tableRows.forEach((item) =>
      tableData.push({
        data: [item.title, ...data[item.field]],
        type: item.type,
      })
    );
    return tableData;
  }
}
