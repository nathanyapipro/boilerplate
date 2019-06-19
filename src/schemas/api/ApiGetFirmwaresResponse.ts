export default {
  type: "object",
  properties: {
    list: {
      type: "array",
      items: {
        type: "object",
        properties: {
          description: { type: "string" },
          model: { type: "string" },
          publishedDate: { type: "string" },
          url: { type: "string" },
          version: { type: "string" },
          deleted: { type: "boolean" },
          lastModifiedAdminId: { type: "number" },
          id: { type: "number" },
          createdDate: {},
          modifiedDate: {}
        },
        required: [
          "createdDate",
          "deleted",
          "description",
          "id",
          "lastModifiedAdminId",
          "model",
          "modifiedDate",
          "publishedDate",
          "url",
          "version"
        ]
      }
    },
    endRow: { type: "number" },
    hasNextPage: { type: "boolean" },
    hasPreviousPage: { type: "boolean" },
    isFirstPage: { type: "boolean" },
    isLastPage: { type: "boolean" },
    navigateFirstPage: { type: "number" },
    navigateLastPage: { type: "number" },
    navigatePages: { type: "number" },
    navigatePageNums: { type: "array", items: { type: "number" } },
    nextPage: { type: "number" },
    prePage: { type: "number" },
    pageNum: { type: "number" },
    pageSize: { type: "number" },
    pages: { type: "number" },
    size: { type: "number" },
    startRow: { type: "number" },
    total: { type: "number" }
  },
  required: [
    "hasNextPage",
    "hasPreviousPage",
    "list",
    "navigateFirstPage",
    "navigateLastPage",
    "pageNum",
    "pageSize",
    "pages",
    "size",
    "total"
  ],
  $schema: "http://json-schema.org/draft-07/schema#"
};
