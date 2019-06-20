export default {
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
  ],
  $schema: "http://json-schema.org/draft-07/schema#"
};
