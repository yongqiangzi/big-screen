export const deepCopy = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  let copy: any;

  if (Array.isArray(obj)) {
    copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepCopy(obj[i]);
    }
  } else {
    copy = {};
    // eslint-disable-next-line
    for (const key in obj) {
      // eslint-disable-next-line
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopy(obj[key]);
      }
    }
  }

  return copy;
};

export const dealData = (obj: any) => {
  return obj;
};
