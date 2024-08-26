const validateUsername = (username) => {
  const usernamePattern = /^[a-zA-Z][a-zA-Z0-9]/g;

  if (!usernamePattern.test(username)) {
    return {
      ok: false,
      message: 'Логин может содержать только латинские символы и цифры',
    };
  }

  if (username.length < 4 || username.length > 20) {
    return {
      ok: false,
      message: 'Длина Логина должна составлять от 4 до 20 символов',
    };
  }

  return {
    ok: true,
  };
};

const validatePassword = (password) => {
  const numberPattern = /\d/;
  const specialLettersPattern = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  if (password.length < 6) {
    return {
      ok: false,
      message: 'Длина пароля должна составлять не менее 6 символов',
    };
  }

  if (password === password.toLowerCase()) {
    return {
      ok: false,
      message: 'Пароль должен содержать заглавную букву',
    };
  }

  if (!numberPattern.test(password)) {
    return {
      ok: false,
      message: 'Пароль должен содержать цифру',
    };
  }

  if (!specialLettersPattern.test(password)) {
    return {
      ok: false,
      message: 'Пароль должен содержать специальный символ',
    };
  }

  return {
    ok: true,
  };
};

export { validateUsername, validatePassword };