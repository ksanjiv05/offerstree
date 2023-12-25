export const onlyNumbersAccept = (value: string) => {
  let newText = '';
  let numbers = '0123456789';

  for (let i = 0; i < value.length; i++) {
    if (numbers.indexOf(value[i]) > -1) {
      newText = newText + value[i];
    }
  }

  return newText;
};
