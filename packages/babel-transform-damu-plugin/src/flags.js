export default {
  APPEND_CHILDREN: Symbol('__has_appendChildren__'),
  APPEND_COMPONENT: Symbol('__has_appendComponent__'),
};

export function turnOnFlag(path, flag) {
  findProgram(path)[flag] = true;
}

function findProgram(path) {
  return path.findParent(parent => parent.isProgram());
}
