'use strict';

const titleStart = document.querySelector('.title-start'),              //* Сообщение о старте игры
    titlePlayerStep = document.querySelector('.title-player-step'),     //* Сообщение о ходе следующего игрока
    titleWinner = document.querySelector('.title-winner'),              //* Сообщение о победителе
    titleDraw = document.querySelector('.title-draw'),                  //* Сообщение о ничье
    table = document.querySelector('.table'),                           //* Игровое поле
    tableCell = document.querySelectorAll('.table-cell'),               //* Клетка в игровом поле
    tableReset = document.querySelector('.reset'),                      //* Кнопка запуска\перезапуска игры
    namePlayerStep = document.querySelector('#player-step-name'),       //* Имя игрока, который ходит следующим
    namePlayerWinner = document.querySelector('#player-winner-name');   //* Имя победителя
    

let counter = 0;                                                        //* Счетчик ходов
let isVictory = false;                                                  //* Обработка конца игры

//* Проверка победы\ничьи
const checkWinner = () => {
    if ((tableCell[0].textContent == tableCell[1].textContent && tableCell[1].textContent == tableCell[2].textContent &&
    tableCell[1].textContent !== '') ||
    (tableCell[3].textContent == tableCell[4].textContent && tableCell[4].textContent == tableCell[5].textContent &&
    tableCell[4].textContent !== '') ||
    (tableCell[6].textContent == tableCell[7].textContent && tableCell[7].textContent == tableCell[8].textContent &&
    tableCell[7].textContent !== '') ||                 //* Проверка на победу по горизонтали

    (tableCell[0].textContent == tableCell[3].textContent && tableCell[3].textContent == tableCell[6].textContent &&
    tableCell[3].textContent !== '') ||
    (tableCell[1].textContent == tableCell[4].textContent && tableCell[4].textContent == tableCell[7].textContent &&
    tableCell[4].textContent !== '') ||
    (tableCell[2].textContent == tableCell[5].textContent && tableCell[5].textContent == tableCell[8].textContent &&
    tableCell[5].textContent !== '') ||                 //* Проверка на победу по вертикали

    (tableCell[0].textContent == tableCell[4].textContent && tableCell[4].textContent == tableCell[8].textContent &&
    tableCell[4].textContent !== '') ||
    (tableCell[2].textContent == tableCell[4].textContent && tableCell[4].textContent == tableCell[6].textContent &&
    tableCell[4].textContent !== '') )                  //* Проверна на победу по диагонали
    {
        isVictory = true;
        titlePlayerStep.classList.add('hide');
        titleWinner.classList.remove('hide');
        tableReset.classList.remove('hide');
        table.removeEventListener('click', playerStep);
        if (counter % 2 == 0) {
            namePlayerWinner.textContent = 'O';
        } else {
            namePlayerWinner.textContent = 'X';
        }
    } else if (counter == 9 && !isVictory) {
        titlePlayerStep.classList.add('hide');
        titleDraw.classList.remove('hide');
        tableReset.classList.remove('hide');
    }
};

//* Считавыание и запись ходов игроков
const playerStep = function(event) {
    const target = event.target;
    if (target.closest('.table-cell')){
        if (target.textContent.length < 1){
            if (counter % 2 == 0) {
                target.textContent += 'X';
                namePlayerStep.textContent = 'O';
            } else {
                target.textContent += 'O';
                namePlayerStep.textContent = 'X';
            }
            counter += 1;
            checkWinner();
        } console.log(counter);
        
    };
};

//* Запуск\Перезапуск игрового поля
tableReset.addEventListener('click', () => {
    for (let str of tableCell) {
        str.textContent = '';
    }
    titleStart.classList.add('hide');
    titleWinner.classList.add('hide');
    titleDraw.classList.add('hide');
    tableReset.classList.add('hide');
    titlePlayerStep.classList.remove('hide');
    table.addEventListener('click', playerStep);
    namePlayerStep.textContent = 'X';
    tableReset.textContent = 'Заново';
    counter = 0;
    isVictory = false;
});
