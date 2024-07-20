const AccessControl = require("accesscontrol");

const allRights = {
  "create:any": ["*"],
  "read:any": ["*"],
  "update:any": ["*"],
  "delete:any": ["*"],
};
let grantsObject = {
  admin: {
    profile: allRights,
    brand: allRights,
    product: allRights,
    site: allRights,
    category: allRights,
    subcategory: allRights,
    order: allRights,
    retur: allRights,
    discount: allRights,
  },
  user: {
    profile: {
      "read:own": ["*", "!password", "!_id"],
      "update:own": ["*"],
    },
    brand: {
      "read:any": ["*"],
    },
    product: {
      "read:any": ["*"],
    },
    category: {
      "read:any": ["*"],
    },
    subcategory: {
      "read:any": ["*"],
    },
    order: {
      "create:any": ["*"],
      "read:own": ["*"],
    },
    retur: {
      "create:any": ["*"],
      "read:own": ["*"],
    },
    discount: {
      "read:any": ["*"],
    },
  },
};

const roles = new AccessControl(grantsObject);

module.exports = {
  roles,
};
