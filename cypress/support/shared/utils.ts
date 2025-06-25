
export const getPrefix = (): string => {
  let url = window.location.pathname;
  if (url.includes("%2F")) {
    return getNameWithUnderscore(url.split("%2F").pop() ?? "");
  }
  return getNameWithUnderscore(url.split("%5C").pop() ?? "");
};


function getNameWithUnderscore(fileName: string): string {
  if (fileName.includes("_")) {
    return fileName.split("_")[0];
  }
  return "";
}
