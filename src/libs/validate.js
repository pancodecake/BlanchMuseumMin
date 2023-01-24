const selector = document.querySelector("input[type='tel']");
const im = new Inputmask("+7 (999)-999-99-99");

im.mask(selector);

const validation = new JustValidate(".form", {
  errorLabelStyle: {
    textDecoration: "underlined"
  }
});

validation
  .addField("#name", [
    {
      rule: "required",
      errorMessage: "Вы не ввели имя"
    },
    {
      rule: "minLength",
      value: 3,
      errorMessage: "Не короче 3 символов"
    },
    {
      rule: "maxLength",
      value: 30,
      errorMessage: "Слишком длинное имя"
    },
    {
      rule: 'customRegexp',
     value:/[A-Za-z]+$/,
     errorMessage: 'Недопустимый формат'
     }
  ])
  .addField("#phone", [
    {
      rule: "required",
      errorMessage: "Вы не ввели телефон"
    },
    {
      validator: (value) => {
        const phone = selector.inputmask.unmaskedvalue();
        console.log(phone);
        return Number(phone) && phone.length === 10;
      },
      errorMessage: "Недопустимый формат"
    }
  ]);