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
          profiletype: { type: "string" }
        },
        required: ["id", "name", "profiletype"]
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
    isAdmin: { type: "boolean" },
    createdDate: { type: "string" },
    id: { type: "number" },
    modifiedDate: {}
  },
  required: [
    "appToken",
    "createdDate",
    "disabled",
    "email",
    "id",
    "isAdmin",
    "lastModifiedAdminId",
    "modifiedDate",
    "name",
    "profiles",
    "roles"
  ],
  $schema: "http://json-schema.org/draft-07/schema#"
};
