import moment from 'moment'

/**
 * 根据日期获取星期几
 */
export const getWeek = (date: string, format:string): string => {

  const week = moment(date, format).day();
  switch (week) {
    case 1:
      return '星期一'
    case 2:
      return '星期二'
    case 3:
      return '星期三'
    case 4:
      return '星期四'
    case 5:
      return '星期五'
    case 6:
      return '星期六'
    case 0:
      return '星期日'
    default:
      return '';
  }
}
