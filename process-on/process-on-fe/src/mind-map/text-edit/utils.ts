const getStrWithBrFromHtml = (str: string) => {
  str = str.replace(/<br>/gim, '\n');
  const el = document.createElement('div');
  el.innerHTML = str;
  str = el.textContent || '';
  return str;
};

export default getStrWithBrFromHtml;
