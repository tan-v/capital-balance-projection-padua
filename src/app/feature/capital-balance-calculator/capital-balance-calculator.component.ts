import { Component } from '@angular/core';
import { CapitalInputFormModel } from './components/input-form/models/input-form.model';
import {
  CapitalBalanceDataModel,
  CapitalBalanceTableDataModel,
} from './models/capital-balance-table-data.model';
import { BalancePerYearDataModel } from './models/start-balance-graph-data.model';
import {
  DEFAULT_BIRTH_YEAR,
  NUMBER_OF_YEARS,
  START_YEAR,
} from './constants/year-details.constants';
import Utils from './utils/capital-balance-utils';

@Component({
  selector: 'app-capital-balance-calculator',
  templateUrl: './capital-balance-calculator.component.html',
  styleUrls: ['./capital-balance-calculator.component.scss'],
})
export class CapitalBalanceCalculatorComponent {
  public tableData: CapitalBalanceTableDataModel = this.initTableData();
  public data: CapitalBalanceDataModel[] = [];
  public graphData: BalancePerYearDataModel = {
    startBalances: [],
    years: [],
  };
  public inputPercentageData!: CapitalInputFormModel;

  constructor() {}

  /**
   * initiates calculation for table and graph data on form submit
   *
   * @param {CapitalInputFormModel} inputPercentageData
   * @memberof CapitalBalanceCalculatorComponent
   */
  public calculateCapitalBalance(
    inputPercentageData: CapitalInputFormModel
  ): void {
    this.inputPercentageData = { ...inputPercentageData };
    this.calculateData();
    this.updateGraphData();
  }

  /**
   * clears table and graph data on form reset
   *
   * @memberof CapitalBalanceCalculatorComponent
   */
  public clearData(): void {
    this.tableData = this.initTableData();
    this.data = [];
    this.graphData = {
      startBalances: [],
      years: [],
    };
  }

  /**
   * calculates data in key:value format (CapitalBalanceDataModel[])
   * and table row arrays in format (CapitalBalanceTableDataModel) on form submit
   *
   * @memberof CapitalBalanceCalculatorComponent
   */
  private calculateData(): void {
    let data: CapitalBalanceDataModel[] = [];
    let tableData: CapitalBalanceTableDataModel = this.initTableData();
    if (this.inputPercentageData.salary) {
      for (let i = 0; i <= NUMBER_OF_YEARS; i++) {
        const currentYear = START_YEAR + i;
        const currentYearStartBalance =
          i === 0 ? this.getStartBalance() : data[i - 1].endBalance;
        const previousYearContribution =
          i === 0 ? 0 : data[i - 1].contributions;

        const currentYearRowData: CapitalBalanceDataModel = this.getRowData(
          this.inputPercentageData.salary,
          currentYearStartBalance,
          currentYear,
          previousYearContribution
        );
        data.push(currentYearRowData);
        tableData = this.updateTableData(tableData, currentYearRowData);
      }
    }
    this.data = [...data];
    this.tableData = { ...tableData };
  }

  /**
   * updates tableData row arrays in format (CapitalBalanceTableDataModel)
   *
   * @memberof CapitalBalanceCalculatorComponent
   */
  private updateTableData(
    tableData: CapitalBalanceTableDataModel,
    rowData: CapitalBalanceDataModel
  ): CapitalBalanceTableDataModel {
    for (const property in rowData) {
      if (rowData.hasOwnProperty(property)) {
        tableData[property] = [...tableData[property], rowData[property]];
      }
    }
    return tableData;
  }

  /**
   * updates graphData array
   *
   * @memberof CapitalBalanceCalculatorComponent
   */
  private updateGraphData(): void {
    const startBalanceArray: number[] = [];
    const yearArray: string[] = [];
    this.data.forEach((row) => {
      startBalanceArray.push(row.startBalance);
      yearArray.push(row.year.toString());
    });
    this.graphData = {
      startBalances: [...startBalanceArray],
      years: [...yearArray],
    };
  }

  /**
   * calculates and returns data for each year
   *
   * @param {number} baseSalary
   * @param {number} startBalance
   * @param {number} year
   * @param {number} previousYearContribution
   * @returns {CapitalBalanceDataModel}
   * @memberof CapitalBalanceCalculatorComponent
   */
  private getRowData(
    baseSalary: number,
    startBalance: number,
    year: number,
    previousYearContribution: number
  ): CapitalBalanceDataModel {
    const contributions = this.getContributionsValue(
      baseSalary,
      year,
      previousYearContribution
    );
    const earnings = this.getEarningsValue(startBalance, contributions);
    const fees = this.getFeeValue(startBalance, contributions, earnings);
    const tax = this.getTaxValue(contributions, earnings);
    const withdrawals = this.getWithdrawalAmount(startBalance, year);
    const endBalance = this.getEndBalance(
      startBalance,
      contributions,
      earnings,
      fees,
      tax,
      withdrawals
    );

    return {
      startBalance,
      contributions,
      earnings,
      fees,
      tax,
      withdrawals,
      endBalance,
      year,
      age: year - DEFAULT_BIRTH_YEAR,
    };
  }

  /**
   * returns the initial start balance for first year
   *
   * @returns {number}
   * @memberof CapitalBalanceCalculatorComponent
   */
  private getStartBalance(): number {
    return this.inputPercentageData.salary + 200000; // assumption
  }

  /**
   *  returns the contribution for current year
   *
   * @param {number} baseSalary
   * @param {number} currentYear
   * @param {number} previousYearContribution
   * @returns {number}
   * @memberof CapitalBalanceCalculatorComponent
   */
  private getContributionsValue(
    baseSalary: number,
    currentYear: number,
    previousYearContribution: number
  ): number {
    let contribution = 0;
    if (
      this.inputPercentageData.withdrawalStartYear &&
      currentYear >= this.inputPercentageData.withdrawalStartYear
    ) {
      return contribution;
    }
    if (previousYearContribution) {
      contribution =
        previousYearContribution *
        (1 + Utils.getPercentage(this.inputPercentageData.inflation_rate));
    } else {
      contribution =
        baseSalary *
        Utils.getPercentage(this.inputPercentageData.contributions);
    }
    return Utils.getRoundedValue(contribution);
  }

  /**
   *  returns the earnings for current year
   *
   * @param {number} startBalance
   * @param {number} contributions
   * @returns {number}
   * @memberof CapitalBalanceCalculatorComponent
   */
  private getEarningsValue(
    startBalance: number,
    contributions: number
  ): number {
    return Utils.getRoundedValue(
      (startBalance + contributions) *
        Utils.getPercentage(this.inputPercentageData.earnings)
    );
  }

  /**
   *  returns the fees for current year
   *
   * @param {number} startBalance
   * @param {number} contributions
   * @param {number} earnings
   * @returns {number}
   * @memberof CapitalBalanceCalculatorComponent
   */
  private getFeeValue(
    startBalance: number,
    contributions: number,
    earnings: number
  ): number {
    return Utils.getRoundedValue(
      (startBalance + contributions + earnings) *
        Utils.getPercentage(this.inputPercentageData.fees)
    );
  }

  /**
   *  returns the tax for current year
   *
   * @param {number} contributions
   * @param {number} earnings
   * @returns {number}
   * @memberof CapitalBalanceCalculatorComponent
   */
  private getTaxValue(contributions: number, earnings: number): number {
    return Utils.getRoundedValue(
      (earnings + contributions) *
        Utils.getPercentage(this.inputPercentageData.tax)
    );
  }

  /**
   *  returns the withdrawal amount for year from withdrawalStartYear onwards
   *
   * @param {number} startBalance
   * @param {number} year
   * @returns {number}
   * @memberof CapitalBalanceCalculatorComponent
   */
  private getWithdrawalAmount(startBalance: number, year: number): number {
    if (year >= this.inputPercentageData.withdrawalStartYear) {
      return Utils.getRoundedValue(
        startBalance * Utils.getPercentage(this.inputPercentageData.withdrawals)
      );
    }
    return 0;
  }

  /**
   *  returns the end Balance for current year
   *
   * @param {number} startBalance
   * @param {number} contributions
   * @param {number} earnings
   * @param {number} fee
   * @param {number} tax
   * @param {number} withdrawalAmount
   * @returns {number}
   * @memberof CapitalBalanceCalculatorComponent
   */
  private getEndBalance(
    startBalance: number,
    contributions: number,
    earnings: number,
    fee: number,
    tax: number,
    withdrawalAmount: number
  ): number {
    return (
      startBalance + contributions + earnings - (fee + tax + withdrawalAmount)
    );
  }

  /**
   *  returns the initial table data object
   *
   * @returns {CapitalBalanceTableDataModel}
   * @memberof CapitalBalanceCalculatorComponent
   */
  private initTableData(): CapitalBalanceTableDataModel {
    return {
      startBalance: [],
      contributions: [],
      earnings: [],
      fees: [],
      tax: [],
      withdrawals: [],
      endBalance: [],
      age: [],
      year: [],
    };
  }
}
