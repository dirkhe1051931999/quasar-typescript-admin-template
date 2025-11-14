import { reactive } from 'vue';

export type PaginationParameter = Pick<Paginator, 'page' | 'rowsPerPage'>;

export interface Paginator {
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
}

export type UsePaginationOptions = {
  page?: number;
  rowsPerPage?: number;
  rowsNumber?: number;
};

export type UsePaginationReturn = {
  paginationInfo: Paginator;
  getNum: () => number;
  getPaginationParam: () => PaginationParameter;
  setNum: (value?: number) => void;
  setSize: (value?: number) => void;
  setTotal: (value?: number) => void;
};

export const DEFAULT_ROWS_PER_PAGE = 15;
export const ROWS_PER_PAGE_OPTIONS = [10, 15, 20, 30, 50];

export function usePagination(options?: UsePaginationOptions): UsePaginationReturn {
  const defaultPageSize = options?.rowsPerPage ?? DEFAULT_ROWS_PER_PAGE;

  const paginationInfo = reactive<Paginator>({
    page: options?.page ?? 1,
    rowsPerPage: defaultPageSize,
    rowsNumber: 0,
  });

  const getPaginationParam: UsePaginationReturn['getPaginationParam'] = () => {
    return paginationInfo;
  };

  const getNum: UsePaginationReturn['getNum'] = () => {
    return paginationInfo.page;
  };

  const setNum: UsePaginationReturn['setNum'] = (value) => {
    paginationInfo.page = value ?? 1;
  };

  const setSize: UsePaginationReturn['setSize'] = (value) => {
    paginationInfo.rowsPerPage = value ?? defaultPageSize;
  };

  const setTotal: UsePaginationReturn['setTotal'] = (value) => {
    paginationInfo.rowsNumber = value ?? 0;
  };

  return { paginationInfo, getPaginationParam, getNum, setNum, setSize, setTotal };
}