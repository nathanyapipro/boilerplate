export default {
  type: "object",
  properties: {
    models: {
      type: "array",
      items: {
        type: "object",
        properties: {
          modelNumber: { type: "string" },
          hardwareRevision: { type: "string" },
          colorNumber: { type: "string" },
          imageUrl: { type: "string" },
          lastModifiedAdminId: { type: "number" },
          id: { type: "number" },
          createdDate: {},
          modifiedDate: {}
        },
        required: [
          "colorNumber",
          "createdDate",
          "hardwareRevision",
          "id",
          "lastModifiedAdminId",
          "modelNumber",
          "modifiedDate"
        ]
      }
    },
    description: { type: "string" },
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
    "id",
    "lastModifiedAdminId",
    "models",
    "modifiedDate",
    "publishedDate",
    "version"
  ],
  $schema: "http://json-schema.org/draft-07/schema#"
};
