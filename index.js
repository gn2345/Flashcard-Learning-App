const flashcardsContainer = document.getElementById('flashcards');

// Load saved flashcards from localStorage
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

function renderFlashcards() {
  flashcardsContainer.innerHTML = '';
  flashcards.forEach((card, index) => {
    const flashcard = document.createElement('div');
    flashcard.classList.add('flashcard');
    flashcard.innerHTML = `
      <button class="delete-btn" onclick="deleteFlashcard(${index})">X</button>
      <div class="card-inner">
        <div class="card-front">${card.question}</div>
        <div class="card-back">${card.answer}</div>
      </div>
    `;
    flashcard.addEventListener('click', (e) => {
      // Prevent flip if delete button clicked
      if (!e.target.classList.contains('delete-btn')) {
        flashcard.classList.toggle('flip');
      }
    });
    flashcardsContainer.appendChild(flashcard);
  });
}

function addFlashcard() {
  const question = document.getElementById('question').value.trim();
  const answer = document.getElementById('answer').value.trim();

  if (question && answer) {
    flashcards.push({ question, answer });
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    document.getElementById('question').value = '';
    document.getElementById('answer').value = '';
    renderFlashcards();
  } else {
    alert('Please enter both a question and an answer.');
  }
}

function deleteFlashcard(index) {
  flashcards.splice(index, 1);
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
  renderFlashcards();
}

// Initial render
renderFlashcards();
