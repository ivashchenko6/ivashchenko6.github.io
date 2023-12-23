


window.addEventListener('DOMContentLoaded', () => {
  function randomaizer(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function hideElementBlock(elem, status) {
    elem.classList.add(status);
  }

  const parentSettingsButtons = document.querySelector('.choose-settings'),
    parentSettingsBlock = document.querySelector('.settings-for-game'),
    bodyElement = document.body;
    
  class TicTacToe {
    firstPlayerSign = '';
    secondPlayerSign = '';
    currentPlayerTurn = '';
    areaParent = document.querySelector('.game-area');
    gameArea = [
      [],
      [],
      []
    ]

    
    start() {
      const startedTitle = document.querySelector('.started-title');

      [...this.areaParent.children].forEach((box, i) => {
        if (i < 3) {
          this.gameArea[0].push(box);
        } else if (i < 6) {
          this.gameArea[1].push(box);
        } else {
          this.gameArea[2].push(box);
        }
      });


      startedTitle.textContent = `YOUR TURN, PLAYER: ${this.currentPlayerTurn}`;
      let moveCounter = 0;
      this.areaParent.addEventListener('click', (e) => {
        
        const clickedBox = e.target;
        if (clickedBox.closest('.box')) {

          if (this.currentPlayerTurn === 1) {

            if (clickedBox.textContent === '' && !startedTitle.textContent.includes('WON')) {
              clickedBox.textContent = this.firstPlayerSign;
              this.currentPlayerTurn = 2;
              this.changeMainTitleTag(startedTitle,  `YOUR TURN, PLAYER: ${this.currentPlayerTurn}`);
            }

          } else if (this.currentPlayerTurn === 2) {

            if (clickedBox.textContent === '' && !startedTitle.textContent.includes('WON')) {
              clickedBox.textContent = this.secondPlayerSign;
              this.currentPlayerTurn = 1;
              this.changeMainTitleTag(startedTitle,  `YOUR TURN, PLAYER: ${this.currentPlayerTurn}`); 
            }

          }

          moveCounter++;
        }
        if (moveCounter >= 5) {
          this.checkCombinations(startedTitle);
        }

      })
      
    }

    checkCombinations(startedTitle) {
      const combinations = {
        'horizontalUpperLine': [this.gameArea[0][0], this.gameArea[0][1], this.gameArea[0][2]],
        'horizontalMiddleLine': [this.gameArea[1][0], this.gameArea[1][1], this.gameArea[1][2]],
        'horizontalBottomLine': [this.gameArea[2][0], this.gameArea[2][1], this.gameArea[2][2]],
        'verticalLeftLine': [this.gameArea[0][0], this.gameArea[1][0], this.gameArea[2][0]],
        'verticalMiddleLine': [this.gameArea[0][1], this.gameArea[1][1], this.gameArea[2][1]],
        'verticalRightLine': [this.gameArea[0][2], this.gameArea[1][2], this.gameArea[2][2]],
        'crossLeftToRight': [this.gameArea[0][0], this.gameArea[1][1], this.gameArea[2][2]],
        'crossRightToLeft': [this.gameArea[0][2], this.gameArea[1][1], this.gameArea[2][0]]
      };
      Object.keys(combinations).forEach(combo => {
        let currComboInCombinations = '';
        [...combinations[combo]].forEach(box => currComboInCombinations += box.textContent);
        
        if ((currComboInCombinations === 'xxx' || currComboInCombinations === 'ooo') && !startedTitle.textContent.includes('WON')) {
          
          [...combinations[combo]].forEach(item => {
            item.style.background = `green`;
          });
          const winner = this.firstPlayerSign.includes(currComboInCombinations[0]) ? 'FIRST' : 'SECOND';
          this.changeMainTitleTag(startedTitle,`${winner} PLAYER WON`);

        }
      })

    }

    changeMainTitleTag(titleSelector,  text) {
      titleSelector.textContent = text;
    }

    showPlayers() {
      const newElement = document.createElement('div')
      newElement.classList.add('signs-information')

      newElement.innerHTML = `
          <h3>P1 - ${this.firstPlayerSign}</h3>
          <h3>P2 - ${this.secondPlayerSign}</h3>
        `
      bodyElement.prepend(newElement);
      const startedTitle = document.createElement('h1');
      startedTitle.textContent = 'STARTED'
      startedTitle.style.color = 'green'
      startedTitle.classList.add('started-title')
      newElement.after(startedTitle)


    }

    randomMode() {
      const randomNumber = randomaizer(1, 2);
      if (randomNumber === 1) {
        this.firstPlayerSign = 'x';
        this.secondPlayerSign = 'o'
        this.currentPlayerTurn = 1
      } else {
        this.firstPlayerSign = 'o';
        this.secondPlayerSign = 'x'
        this.currentPlayerTurn = 2
      }
      hideElementBlock(parentSettingsBlock, 'hide')
      this.showPlayers()
      this.start();

    }

    customMode() {
      const customUi = document.createElement('div');
      hideElementBlock(parentSettingsBlock, 'hide')

      customUi.classList.add('custom-panel')
      customUi.innerHTML = `
        <div class="choosing-panel-first d-f">
          <h3>P1</h3>
          <div class="choices-div">
            <div data-sign="1-x" class="choice">x</div>
            <div data-sign="1-o" class="choice">o</div>
          </div>

        </div>

        <div class="choosing-panel-second d-f">
          <h3>P2</h3>
          <div class="choices-div">
            <div data-sign="2-x" class="choice">x</div>
            <div data-sign="2-o" class="choice">o</div>
          </div>

        </div>
      `
      bodyElement.prepend(customUi)

      const customPanel = document.querySelector('.custom-panel');
      customPanel.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.choice')) {
          const [player, sign] = target.getAttribute('data-sign').split('-');
          
          if (player == 1) {
            this.firstPlayerSign = sign;
            this.secondPlayerSign = sign === 'x' ? 'o' : 'x';
            hideElementBlock(customPanel, 'hide')
            this.showPlayers()
            this.currentPlayerTurn = sign === 'x' ? 1 : 2;

          } else if (player == 2) {
            this.firstPlayerSign = (sign === 'x') ? 'o' : 'x';
            this.secondPlayerSign = sign;
            hideElementBlock(customPanel, 'hide')
            this.showPlayers()
            this.currentPlayerTurn = sign === 'x' ? 2 : 1;

          }

        }
        ticTacToe.start();
      })





    }

  }

  const ticTacToe = new TicTacToe();

  parentSettingsButtons.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.btn-mode')) {
      if (target.getAttribute('id') === 'random') {
        ticTacToe.randomMode();

      } else {
        ticTacToe.customMode();

      }

    }
  })

}) 