import { ById } from "../../types/index";
import { User } from "../../types/models";

export default function generateUsers(): ById<User> {
  return {
    "1": {
      id: 1,
      appToken: "34145ytrhfgwdnjghyt2y3t43564ytgfgwrty51345",
      disabled: false,
      lastModifiedAdminId: 1,
      parentId: undefined,
      profiles: [],
      roles: [],
      name: "Admin",
      email: "admin@airgraft.com",
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString()
    }
  };
}
