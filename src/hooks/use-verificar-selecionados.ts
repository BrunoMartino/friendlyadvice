export const useVerificarSelecionados = (data: any) => {
  let result = [];
  if (data && data.length > 0) {
    result = data.map((item: any) => item.checked);
  }

  if (!data) {
    return result;
  } else {
    return result.some(Boolean);
  }
};
