module.exports = function timeoutMethodDecorator(fn, ms) {
  return function () {
    var timeout = false;
    var args = [].slice.call(arguments, 0, arguments.length - 1);
    var callback = arguments[arguments.length - 1];

    var timeoutId = setTimeout(function () {
      timeout = true;
      var err = new Error('Timeout of ' + ms + 'ms exceeded');
      callback(err);
    }, ms);

    args.push(function decoratorCallback () {
      if (timeout) {
        return;
      }
      clearTimeout(timeoutId);
      callback.apply(null, arguments);
    })

    fn.apply(null, args);
  }
}