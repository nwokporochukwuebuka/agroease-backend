const allRoles = {
  user: [],
  farmer: [],
  admin: ['adminManageProducts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
