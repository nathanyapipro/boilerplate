export default {
  type: "object",
  properties: {
    appToken: { type: "string" },
    email: { type: "string" },
    disabled: { type: "boolean" },
    lastModifiedAdminId: { type: "number" },
    parentId: { type: "number" },
    profiles: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
          profileType: { type: "string" }
        },
        required: ["id", "name", "profileType"]
      }
    },
    roles: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          id: { type: "number" },
          createdDate: {},
          modifiedDate: {}
        },
        required: ["createdDate", "id", "modifiedDate", "name"]
      }
    },
    name: { type: "string" },
    id: { type: "number" },
    createdDate: {},
    modifiedDate: {}
  },
  required: [
    "appToken",
    "createdDate",
    "disabled",
    "email",
    "id",
    "lastModifiedAdminId",
    "modifiedDate",
    "profiles",
    "roles"
  ],
  $schema: "http://json-schema.org/draft-07/schema#"
};
