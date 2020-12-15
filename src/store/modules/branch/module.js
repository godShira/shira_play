import { createModule } from '@/store/util'
import {
  BRANCH_PROVINCE_LIST,
  BRANCH_CITY_LIST,
  BRANCH_ALL_LIST,
  BRANCH_NEAR_LIST,
  BRANCH_SEARCH_HISTORY
} from './index'

export const branchInitState = [
  [BRANCH_PROVINCE_LIST, []],
  [BRANCH_CITY_LIST, []],
  [BRANCH_ALL_LIST, []],
  [BRANCH_NEAR_LIST, []],
  [BRANCH_SEARCH_HISTORY, []]
]

export default createModule(branchInitState)
