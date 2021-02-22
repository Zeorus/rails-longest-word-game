import Sortable from 'sortablejs';

const initSortable = () => {
  if (document.getElementById('firstLetters')) {
    const firstLetters = document.getElementById('firstLetters');
    const secondLetters = document.getElementById('secondLetters');

    new Sortable(firstLetters, {
      group: 'shared',
      animation: 150
    });

    new Sortable(secondLetters, {
      group: 'shared',
      animation: 150
    });
  };
};

export { initSortable };
