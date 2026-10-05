const parsingData = (json) => {
  try {
    return JSON.parse(json).join(", ");
  } catch {
    return "-";
  }
};

export { parsingData };
