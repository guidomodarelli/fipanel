export default function useAutocomplete() {
  const matchesPrefix = (text: string, inputValue: string) => {
    if (inputValue.length === 0) {
      return true;
    }

    // Normalize both strings so we can slice safely
    // take into account the ignorePunctuation option as well...
    const normalizedText = text.normalize('NFC').toLocaleLowerCase();
    const normalizaedInputValue = inputValue.normalize('NFC').toLocaleLowerCase();

    return normalizedText.slice(0, normalizaedInputValue.length) === normalizaedInputValue;
  };

  return { matchesPrefix };
}
