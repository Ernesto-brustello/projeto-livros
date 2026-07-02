document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-field input');
    const addButton = document.querySelector('.button-primary');

    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.boxShadow = '0 0 0 4px rgba(143, 158, 139, 0.12)';
        });

        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.style.boxShadow = 'inset 0 1px 2px rgba(47, 62, 50, 0.06)';
        });
    }

    if (addButton) {
        addButton.addEventListener('click', () => {
            alert('Funcionalidade de adicionar livro em desenvolvimento.');
        });
    }
});
