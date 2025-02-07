import * as Yup from 'yup';

const isValidTime = (time: string | null | undefined): boolean => {
  if (!time) return true;
  const [hours, minutes] = time.split(':').map(Number);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};

export const schemaOrdemServico = Yup.object().shape({
  clientes: Yup.object().shape({
    id: Yup.string().required('O preenchimento do cliente é obrigatório'),
    descricao: Yup.string().required('Descrição do cliente é obrigatória'),
  }),
  data: Yup.date().required('Data é obrigatória').typeError('Data inválida'),
  hora: Yup.string()
    .nullable()
    .test('valid-time', 'Hora inválida. Use o formato HH:mm (00:00 até 23:59)', isValidTime),
  equipamento: Yup.object().shape({
    id: Yup.string(),
    descricao: Yup.string()
  }),
  fabricante: Yup.object().shape({
    id: Yup.string(),
    descricao: Yup.string()
  }),
  serie: Yup.string()
    .max(20, 'O preenchimento do campo Série deve conter até 20 caracteres'),
  problema: Yup.string(),
  descricao: Yup.string(),
  valor_orcado: Yup.mixed(),
  representantes: Yup.object().shape({
    id: Yup.string().required('Os dados do técnico são obrigatórios'),
    descricao: Yup.string().required('Os dados do técnico são obrigatórios'),
  }),
  posicao_atual: Yup.string(),
  agendamento_hora: Yup.string()
    .nullable()
    .test('valid-time', 'Hora inválida. Use o formato HH:mm (00:00 até 23:59)', isValidTime),
  agendamento_data: Yup.date(),
  situacaoOS: Yup.object().shape({
    id: Yup.string().required('O status da OS é obrigatório'),
    descricao: Yup.string().required('O status da OS é obrigatório'),
  }),
});
