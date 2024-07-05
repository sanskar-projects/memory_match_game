document.addEventListener("DOMContentLoaded", () => {
    const allImages = [
        'a.jpg', 'aa.jpg', 'b.jpg', 'bb.jpg', 'c.jpg', 'cc.jpg', 'd.jpg', 'dd.jpg',
        'e.jpg', 'ee.jpg', 'f.jpg', 'ff.jpg', 'g.jpg', 'gg.jpg', 'h.jpg', 'hh.jpg'
    ];

    // Shuffle all images and select the first 8
    allImages.sort(() => 0.5 - Math.random());
    const cardImages = allImages.slice(0, 8);

    // Duplicate the selected images for pairs
    let cardsArray = [...cardImages, ...cardImages];
    cardsArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById('game-board');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matches = 0;
    let moves = 0;

    function createCard(image) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back" style="background-image: url('images/${image}')"></div>
            </div>
        `;
        card.addEventListener('click', flipCard);
        return card;
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        moves++;
        const isMatch = firstCard.innerHTML === secondCard.innerHTML;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matches++;
        resetBoard();
        if (matches === cardImages.length) {
            displayWinMessage();
        }
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    function displayWinMessage() {
        alert(`You Win!\nTotal moves: ${moves}`);
    }

    cardsArray.forEach(image => {
        const card = createCard(image);
        gameBoard.appendChild(card);
    });
});
