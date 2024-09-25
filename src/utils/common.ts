/**
 * @author: gaoweixuan
 * @since: 2023-11-12
 */
import { SelectData } from '@/types/types.ts'

export const ROOT: SelectData = {
  value: '1111111111111111111',
  label: '根节点',
}

export enum DIALOG_FLAG {
  ADD = 'add',
  ADD_SUB = 'ADD_SUB',
  EDIT = 'EDIT',
}

export enum SORT {
  ASE = 'ascending',
  DESC = 'descending',
}

export enum DEVICE {
  PC = 'PC',
  PAD = 'PAD',
  MOBILE = 'MOBILE',
}

export enum LAYOUT {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  MIX = 'mix',
  COLUMNS = 'columns',
}

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
}
export enum LANGUAGE {
  ZH_CN = 'zhCn',
  EN = 'en',
}

export const camelCaseToUnderscore = (val: string) => {
  return val.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`)
}

/**
 * 定义一个递归函数，用于将对象中的 BigNumber 类型的值转换为字符串类型
 */
export const convertBigNumberToString = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (obj._isBigNumber) {
    return obj.toString()
  } else if (Array.isArray(obj)) {
    return obj.map((item) => convertBigNumberToString(item))
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = convertBigNumberToString(obj[key])
    }
  }
  return obj
}
