const addCardBtn = document.getElementById('addCardBtn');
const container = document.getElementById('cardContainer');
const modal = document.getElementById('cardModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const profileTitleInput = document.getElementById('profileTitle');
const profileDescriptionInput = document.getElementById('profileDescription');

let cards = JSON.parse(localStorage.getItem('cards')) || [
  { title: "Profile 1", description: "This is the detailed info for Project 1." },
  { title: "Profile 2", description: "More about Project 2 here. It is awesome." }
];

function renderCards() {
  container.innerHTML = '';
  cards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    cardDiv.innerHTML = `
      <div class="card-content">
        <div class="editable">
          <h3 contenteditable="true" class="card-title">${card.title}</h3>
          <p contenteditable="true" class="card-description">${card.description}</p>
        </div>
        <div class="card-buttons">
          <button class="save-button">Save</button>
          <button class="remove-button">Remove</button>
        </div>
        <div class="show-more">Show More</div>
      </div>
    `;

    const showMoreBtn = cardDiv.querySelector(".show-more");

    showMoreBtn.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      document.body.appendChild(overlay);

      cardDiv.classList.add("expanded");

      showMoreBtn.remove();

      const closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.classList.add("close-button");
      cardDiv.appendChild(closeButton);

      closeButton.addEventListener("click", () => {
        overlay.remove();
        cardDiv.classList.remove("expanded");
        closeButton.remove();
        cardDiv.querySelector(".card-content").appendChild(showMoreBtn);
      });
    });

    cardDiv.querySelector('.save-button').addEventListener('click', () => {
      const newTitle = cardDiv.querySelector('.card-title').textContent;
      const newDesc = cardDiv.querySelector('.card-description').textContent;

      cards[index] = { title: newTitle, description: newDesc };
      localStorage.setItem('cards', JSON.stringify(cards));
    });

    cardDiv.querySelector('.remove-button').addEventListener('click', () => {
      if (confirm("Are you sure you want to remove this card?")) {
        cards.splice(index, 1);
        localStorage.setItem('cards', JSON.stringify(cards));
        renderCards();
      }
    });

    container.appendChild(cardDiv);
  });
}

addCardBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

saveProfileBtn.addEventListener('click', () => {
  const newTitle = profileTitleInput.value.trim();
  const newDesc = profileDescriptionInput.value.trim();

  if (newTitle && newDesc) {
    const newCard = { title: newTitle, description: newDesc };
    cards.push(newCard);
    localStorage.setItem('cards', JSON.stringify(cards));
    modal.style.display = 'none';
    renderCards();
    profileTitleInput.value = '';
    profileDescriptionInput.value = '';
  }
});

renderCards();