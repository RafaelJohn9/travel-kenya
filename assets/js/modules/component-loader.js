async function loadComponent(selector, componentPath) {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.querySelector(selector).innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('#landing', 'components/landing_page.html');
    loadComponent('#cards', 'components/card.html');
    // loadComponent('#reviews', 'components/review_card.html');
    loadComponent('#footer', 'components/footer.html');
});

// document.addEventListener('DOMContentLoaded', async () => {
//     const payload = ['Nairobi', 'Mombasa', 'Kisumu']; // Example payload
//     await renderCards(payload);
// });