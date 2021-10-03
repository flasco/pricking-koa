class Validators {
  required(value: any, msg = '参数不得为空') {
    if (typeof value === 'number') return this;
    if (typeof value === 'string') {
      value = value.trim();
    }

    if (!value || value === 'null' || value === 'undefined') {
      throw new Error(msg);
    }
    return this;
  }

  isNumber(value: any, msg = '参数必须为数字') {
    const numeric = /^[+-]?([0-9]*[.])?[0-9]+$/;
    if (!numeric.test(value)) {
      throw new Error(msg);
    }
    return this;
  }

  isTruthy(value: boolean, msg = '参数不符合预期') {
    if (!value) {
      throw new Error(msg);
    }
    return this;
  }
}

export = Validators;
