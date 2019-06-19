import * as queryString from "query-string";

export interface PaginationQuery {
  page: number;
  size: number;
  sort?: string;
}

// function parseQueryString(
//   value: string | number | (string | number)[] | null | undefined,
//   defaultValue: string
// ): string {
//   if (typeof value === "string") {
//     return value;
//   }
//   return defaultValue;
// }

function parseQueryInt(
  value: string | number | (string | number)[] | null | undefined,
  defaultValue: number
): number {
  if (typeof value === "string") {
    const parseValue = parseInt(value);
    if (!isNaN(parseValue)) {
      return parseValue;
    }
  }
  return defaultValue;
}

export const defaultPaginationQuery: PaginationQuery = {
  page: 1,
  size: 10
};

export function getPaginationQuery(serializedQuery: string): PaginationQuery {
  const deserializedQuery = queryString.parse(serializedQuery);
  const { page, size } = deserializedQuery;

  return {
    page: parseQueryInt(page, 1),
    size: parseQueryInt(size, 10)
  };
}
