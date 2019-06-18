export default {
  type: "object",
  properties: { ids: { type: "array", items: { type: "number" } } },
  required: ["ids"],
  $schema: "http://json-schema.org/draft-07/schema#"
};
