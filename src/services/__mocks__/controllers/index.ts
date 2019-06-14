import { matchPath, match as matchType } from "react-router";
import { AxiosRequestConfig } from "axios";
import { HasId } from "../../../types";

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
  const match = getParamsfromRequest<{ modelId: string }>(
    requestConfig,
    `/v1/:modelType/:modelId`
  );
  return match.params.modelId;
}

interface Cursors {
  previous?: string;
  next?: string;
}

export function generateCursors<T extends HasId>(
  items: Array<T>,
  cursorPos: number,
  pageSize: number
): Cursors {
  const previous =
    cursorPos - pageSize < 0 ? undefined : btoa(items[cursorPos - pageSize].id);
  const next =
    cursorPos + pageSize >= items.length
      ? undefined
      : btoa(items[cursorPos + pageSize].id);
  return {
    previous,
    next
  };
}
