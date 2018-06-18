import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  // Date functions
  getCurrentMonthFirstDay() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
  }
  getCurrentMonthLastDay() {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;
  }
  getLastMonthFirstDay() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    return firstDay;
  }
  getLastMonthLastDay() {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    return lastDay;
  }

  getNextMonthFirstDay() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return firstDay;
  }
  getNextMonthLastDay() {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
    return lastDay;
  }
}
