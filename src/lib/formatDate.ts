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



export const formatYYMMDDHHMMSS = (data: TDate) => {
  if (data) {
    const date = new Intl.DateTimeFormat('ko', {
      dateStyle: 'medium',
    })
      .format(new Date(data))

    const time = new Intl.DateTimeFormat('en', {
      timeStyle: 'medium'
    })
      .format(new Date(data))
      .toLowerCase()

    return date + ' ' + time

  } else return '';
};
