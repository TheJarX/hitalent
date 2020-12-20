document.addEventListener('DOMContentLoaded', _ => {

    const $signUpButtons = document.querySelectorAll('.signup-button');
    const $form = document.querySelector('#signup-form');
    const $closeModalButton = document.querySelector('#close-modal-btn');
    const $modal = document.querySelector('#signup-modal');

    $signUpButtons.forEach(btn => {
        btn.addEventListener('click', _ => {
            $modal.style.visibility = 'visible';
            $modal.style.opacity = '100%';
        })
    });

    $form.addEventListener('submit', e => {
        e.preventDefault();
        const $submitButton = document.querySelector('button.bg-blue[data-submit-btn]');
        $submitButton.disabled = true;
        $submitButton.textContent = 'Enviando...';

        const data = new FormData(e.target);
        const searchParams = new URLSearchParams();

        for(const entry of data) {
            searchParams.append(...entry);
        }

        fetch('api/users/', {
            method: 'POST',
            body: searchParams,
        }).then(res => res.json()).then(userCreated).catch(console.error)
    });

    [document.body, $closeModalButton].forEach( el => el.addEventListener('click', e => {
        const elementId = e.target.id
        if(elementId === 'signup-modal' || elementId === 'close-modal-btn') {
            $modal.style.opacity = '0';
            $modal.style.visibility = 'hidden';
        }
    }));
});

function userCreated(response) {
    if(response.ok) {
        const $modal = document.querySelector('#signup-modal')

        const successMessage = document.querySelector('#success-message');
        $modal.style.opacity = '0';
        $modal.style.visibility = 'hidden';

        successMessage.style.opacity = '100%';
        successMessage.style.right = '0';

        setTimeout(() => {
            successMessage.style.right = '-400px';
        }, 4000)
       
    } else {
        alert('Oops! parece que algo salió mal, revisa tus datos e intenta nuevamente 😔')
    }

        const $submitButton = document.querySelector('button.bg-blue[data-submit-btn]');
        $submitButton.disabled = false;
        $submitButton.textContent = 'Completar registro';
}