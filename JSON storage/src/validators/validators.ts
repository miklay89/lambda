export const validationEntries = (data: Object) => {
  let isValid = true;
  
  if(Array.isArray(data)) {
    for(let prop of data) {
      if(Object.keys(prop).length === 0) {
        isValid = false;
        break;
      }
    }
  }
  return isValid;
}