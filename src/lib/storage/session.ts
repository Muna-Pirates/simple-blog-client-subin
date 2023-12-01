const sessionStorage = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem: (name: string, value: any) => {
    window.sessionStorage.setItem(name, JSON.stringify(value));
  },

  getItem: (name: string) => {
    if (name) {
      return JSON.parse(
        window.sessionStorage.getItem(name) as string
      );
    } else return null
  },

  removeItem: (name: string) => {
    window.sessionStorage.removeItem(name);
  },
};

export default sessionStorage;