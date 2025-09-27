const Status = {
  BACKLOG: `backlog`,
  PROCESSING: `in-process`,
  DONE: `done`,
  BASKET: `bin`,
};

const StatusLabel = {
  [Status.BACKLOG]: `Бэклог`,
  [Status.PROCESSING]: `В процессе`,
  [Status.DONE]: `Готово`,
  [Status.BASKET]: `Корзина`,
};

export { Status, StatusLabel };
