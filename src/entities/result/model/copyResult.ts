export const copyResult = (text: string) => {
  const copyText = navigator.clipboard.writeText(text);
  return copyText;
};
