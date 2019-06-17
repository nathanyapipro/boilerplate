export default {
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
  },
  $schema: "http://json-schema.org/draft-07/schema#"
};
