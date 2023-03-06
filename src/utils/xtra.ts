export const noop = () => null;

export const compose = (...args: any[]) => {
  for (
    var _len = args.length, funcs = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    funcs[_key] = args[_key];
  }

  if (funcs.length === 0) {
    return function (arg: any) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
};
