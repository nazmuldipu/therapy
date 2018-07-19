import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  // Date functions
  getTodayFirst() {
    const date = new Date();
    date.setHours(0, 0, 0);
    return date;
  }
  getTodayLast() {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  }

  getYesterdayFirst() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(0, 0, 0);
    return date;
  }
  getYesterdayLast() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(23, 59, 59, 999);
    return date;
  }

  getCurrentMonthFirstDay() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    firstDay.setHours(0, 0, 0);
    return firstDay;
  }
  getCurrentMonthLastDay() {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59, 999);
    return lastDay;
  }
  getLastMonthFirstDay() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    firstDay.setHours(0, 0, 0);
    return firstDay;
  }
  getLastMonthLastDay() {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    lastDay.setHours(23, 59, 59, 999);
    return lastDay;
  }

  getNextMonthFirstDay() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    firstDay.setHours(0, 0, 0);
    return firstDay;
  }
  getNextMonthLastDay() {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
    lastDay.setHours(23, 59, 59, 999);
    return lastDay;
  }
}
