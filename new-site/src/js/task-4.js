/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
const refs = {
  routeSelector: document.getElementById('route'),
  timeSelector: document.getElementById('time'),
  numSelector: document.getElementById('num'),
  submitBtn: document.getElementById('sub'),
  backWay: document.getElementById('back'),
  openModal: document.querySelector('.open_modal'),
  closeModal: document.getElementById('close_modal'),
  modal: document.getElementById('modal'),
  body: document.getElementsByTagName('body')[0],
  text: document.querySelector('.modal_txt'),
  allWayFromA: document.querySelectorAll('.from__a'),
  allWayFromB: document.querySelectorAll('.from__b'),
  allWayFromC: document.querySelectorAll('.from__c'),
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
  finishTime: 0,
};
const nowMinutes = refs.hours * 60 + refs.minutes;

document.addEventListener('click', () => {
  if (refs.routeSelector.value === 'из A в B') {
    for (const rout of refs.allWayFromB) {
      rout.style.display = 'none';
    }
    for (const rout of refs.allWayFromA) {
      rout.style.display = 'block';
      const hoursTravel = Number(rout.textContent.split('(')[0].split(':')[0]);
      const minutesTravel = Number(
        rout.textContent.split('(')[0].split(':')[1],
      );
      const timeTravel = hoursTravel * 60 + minutesTravel;
      if (nowMinutes >= timeTravel) {
        rout.style.display = 'none';
      }
    }
  }
  if (refs.routeSelector.value === 'из B в A') {
    for (const rout of refs.allWayFromA) {
      rout.style.display = 'none';
    }
    for (const rout of refs.allWayFromB) {
      rout.style.display = 'block';
      const minutesTravel = Number(
        rout.textContent.split('(')[0].split(':')[1],
      );
      const hoursTravel = Number(rout.textContent.split('(')[0].split(':')[0]);
      const timeTravel = hoursTravel * 60 + minutesTravel;
      if (nowMinutes >= timeTravel) {
        rout.style.display = 'none';
      }
    }
  }
  if (refs.routeSelector.value === 'из A в B и обратно в А') {
    refs.backWay.style.display = 'block';
    for (const rout of refs.allWayFromB) {
      rout.style.display = 'none';
    }
    for (const rout of refs.allWayFromA) {
      rout.style.display = 'block';
      const hoursTravel = Number(rout.textContent.split('(')[0].split(':')[0]);
      const minutesTravel = Number(
        rout.textContent.split('(')[0].split(':')[1],
      );
      const timeTravel = hoursTravel * 60 + minutesTravel;
      if (nowMinutes >= timeTravel) {
        rout.style.display = 'none';
      }
    }
    for (const rout of refs.allWayFromC) {
      const hoursTravelFromA = Number(
        refs.timeSelector.value.split('(')[0].split(':')[0],
      );
      const minutesTravelFromA = Number(
        refs.timeSelector.value.split('(')[0].split(':')[1],
      );
      const timeTravelFromA = hoursTravelFromA * 60 + minutesTravelFromA + 50;
      const hoursTravel = Number(rout.textContent.split('(')[0].split(':')[0]);
      const minutesTravel = Number(
        rout.textContent.split('(')[0].split(':')[1],
      );
      const timeTravel = hoursTravel * 60 + minutesTravel;
      if (timeTravelFromA >= timeTravel) {
        rout.style.display = 'none';
      }
    }
  } else {
    refs.backWay.style.display = 'none';
  }
});

document.addEventListener('keyup', () => {
  if (refs.routeSelector.value === 'из A в B и обратно в А') {
    refs.backWay.style.display = 'block';
  }
  if (refs.numSelector.value) {
    refs.submitBtn.disabled = false;
  } else {
    refs.submitBtn.disabled = true;
  }
});

function getTimeFromMins(mins) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  refs.finishTime = `${hours}:${minutes}`;
  return refs.finishTime;
}

refs.openModal.addEventListener('click', (e) => {
  e.preventDefault();
  const hoursTravel = Number(
    refs.timeSelector.value.split('(')[0].split(':')[0],
  );
  const minutesTravel = Number(
    refs.timeSelector.value.split('(')[0].split(':')[1],
  );
  const timeTravel = hoursTravel * 60 + minutesTravel;
  const hoursTravelBack = Number(
    refs.backWay.value.split('(')[0].split(':')[0],
  );
  const minutesTravelBack = Number(
    refs.backWay.value.split('(')[0].split(':')[1],
  );
  const timeTravelBack = hoursTravelBack * 60 + minutesTravelBack;

  refs.modal.classList.add('modal_vis');
  refs.modal.classList.remove('bounceOutDown');
  refs.body.classList.add('body_block');
  if (refs.routeSelector.value === 'из A в B и обратно в А') {
    getTimeFromMins(timeTravelBack + 50);
    refs.text.textContent = `Вы выбрали ${
      refs.numSelector.value
    } билета по маршруту ${refs.routeSelector.value} стоимостью ${
      refs.numSelector.value * 1000 * 2
    }р.
Это путешествие займет у вас 1 час 40 мин минут. 
Теплоход отправляется в ${
      refs.timeSelector.value.split('(')[0]
    }, а прибудет в ${refs.finishTime}.`;
  } else {
    getTimeFromMins(timeTravel + 50);
    refs.text.textContent = `Вы выбрали ${
      refs.numSelector.value
    } билета по маршруту ${refs.routeSelector.value} стоимостью ${
      refs.numSelector.value * 1000
    }р.
Это путешествие займет у вас 50 минут. 
Теплоход отправляется в ${
      refs.timeSelector.value.split('(')[0]
    }, а прибудет в ${refs.finishTime}.`;
  }
});

refs.closeModal.addEventListener('click', () => {
  refs.modal.classList.add('bounceOutDown');
  refs.modal.classList.remove('modal_vis');
  refs.body.classList.remove('body_block');
});
