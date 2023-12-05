type TDate = Date | number | string;

export const formatYYMMDD = (data: TDate) => {
  if (data) {
    return new Intl.DateTimeFormat('ko', {
      dateStyle: 'medium',
    })
      .format(new Date(data))
      .slice(0, -1)
  } else return '';
};
