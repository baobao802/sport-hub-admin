const getItem = (name: string) => {
  const itemStr = localStorage.getItem(name);
  return itemStr ? JSON.parse(itemStr) : null;
};

const setItem = (name: string, value: any) => {
  localStorage.setItem(name, JSON.stringify(value));
};

const removeItem = (name: string) => {
  localStorage.removeItem(name);
};

const localStore = { getItem, setItem, removeItem };

export default localStore;
