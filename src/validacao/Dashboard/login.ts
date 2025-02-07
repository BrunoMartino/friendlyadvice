import * as Yup from 'yup';

export const schemaLogin = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),

  senha:
    process.env.REACT_APP_ENV === 'DEV'
      ? Yup.string().trim().required('Senha obrigatória')
      : Yup.string()
          .trim()
          .required('Senha obrigatória')
          .min(8, 'Senha deve conter 8 digitos')
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Senha deve conter, maiúsculas e minúsculas, um numeral e um caracter especial',
          ),
});
