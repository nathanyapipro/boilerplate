import { matchPath, match as matchType } from "react-router";
import { AxiosRequestConfig } from "axios";
import { HasId } from "../../../types";
import { Pagination } from "../../../types/models";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "localhost:8080";
export function getParamsfromRequest<T>(
  requestConfig: AxiosRequestConfig,
  url: string
): matchType<T> {
  if (!requestConfig.url) {
    throw new Error("url not in axios request config");
  }

  const match = matchPath<T>(requestConfig.url, {
    path: `${BACKEND_URL}${url}`,
    exact: false,
    strict: false
  });

  if (!match) {
    throw new Error(`could not find params in url ${requestConfig.url}`);
  }

  return match;
}

export function getModelIdFromRequest(
  requestConfig: AxiosRequestConfig
): string {
  let match = getParamsfromRequest<{ modelId: string }>(
    requestConfig,
    `/:prefix/:modelType/:modelId`
  );
  if (Number.isNaN(parseInt(match.params.modelId, 10))) {
    match = getParamsfromRequest<{ modelId: string }>(
      requestConfig,
      `/:prefix/:modelType/:modelSubType/:modelId`
    );
  }
  return match.params.modelId;
}

export function generatePagination<T extends HasId>(
  items: Array<T>,
  page: number,
  size: number,
  sort?: string
): Pagination {
  const total = items.length;
  const navigateLastPage = Math.floor(total / size) + 1;
  const navigateFirstPage = 1;
  const hasNextPage = Boolean(page !== 1);
  const hasPreviousPage = Boolean(page !== navigateLastPage);
  const nextPage = hasNextPage ? page + 1 : undefined;
  const prePage = hasPreviousPage ? page - 1 : undefined;
  const pages = navigateLastPage;
  const pageSize = size;
  const pageNum = page;

  return {
    hasNextPage,
    hasPreviousPage,
    navigateLastPage,
    navigateFirstPage,
    nextPage,
    prePage,
    pages,
    pageNum,
    pageSize,
    size,
    total
  };
}
