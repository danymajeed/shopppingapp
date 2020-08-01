const checkValidity = (value, rules) => {
  let isValid = true;
  let message = "";
  if (!rules) {
    return true;
  }

  if (rules.isRequired) {
    isValid = value.trim() !== "" && isValid;
    if (!isValid) {
      message = "Required!";
      return { isValid, message };
    }
  }

  if (rules.isInteger) {
    isValid = value.match(/^\d+$/) && isValid;
    if (!isValid) {
      message = "Enter a valid integer";
      return { isValid, message };
    }
  }
  if (rules.isNumeric) {
    isValid = !isNaN(value) && isValid;
    if (!isValid) {
      message = "Enter a valid value";
      return { isValid, message };
    }
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    if (!isValid) {
      message = "Length should be greater than or equal to " + rules.minLength;
      return { isValid, message };
    }
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    if (!isValid) {
      message = "Length should be less than or equal to " + rules.maxLength;
      return { isValid, message };
    }
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
    if (!isValid) {
      message = "Invalid Email";
      return { isValid, message };
    }
  }

  if (rules.minWords) {
    function WordCount(str) {
      return str.split(" ").filter(function (n) {
        return n !== "";
      }).length;
    }
    isValid = WordCount(value) >= rules.minWords && isValid;
    if (!isValid) {
      message = "Title should contain Brand and Model (e.g Oneplus 6T)";
      return { isValid, message };
    }
  }
  return { isValid, message };
};

export default checkValidity;
