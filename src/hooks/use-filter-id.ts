export const useFilterId = (data: any, key: any = null) => {
  return (
    data &&
    data.length > 0 &&
    data.filter((el: any) => el.checked).map((i: any) => (key ? i[key] : i.id))
  );
};
