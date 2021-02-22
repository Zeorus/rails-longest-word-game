// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import "channels"
import { initSortable } from '../plugins/init_sortable';

Rails.start()
Turbolinks.start()

document.addEventListener('turbolinks:load', () => {
  initSortable();
  if (document.getElementById('submit')) {
    const input = document.getElementById('word');
    const submit = document.getElementById('submit');
    const firstZone = document.getElementById('firstLetters');
    const dropZone = document.getElementById('secondLetters');
    const letters = document.querySelectorAll('.letter');

    letters.forEach((letter) => {
      letter.addEventListener('dblclick', event => {
        if (event.currentTarget.parentElement == firstZone) {
          dropZone.insertAdjacentElement('beforeend', event.currentTarget);
        } else {
          firstZone.insertAdjacentElement('beforeend', event.currentTarget);
        }
      });
    });

    submit.addEventListener('focus', (event) => {
      const dropLetters = dropZone.children;
      let word = '';
      for (let i = 0; i < dropZone.childElementCount; i += 1) {
        word += dropLetters[i].innerText;
      }
      input.value = word;
    });
  };
});
