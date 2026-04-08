if (document.getElementById('enable')) {
  document.getElementById('enable').addEventListener('click', () => {
    document.querySelectorAll('.corn-form--item').forEach((input) => {
      input.querySelectorAll('input').forEach((item) => item.toggleAttribute('disabled', false));
    });
  });
}
if (document.getElementById('disable')) {
  document.getElementById('disable').addEventListener('click', () => {
    document.querySelectorAll('.corn-form--item').forEach((input) => {
      input.querySelectorAll('input').forEach((item) => item.toggleAttribute('disabled', true));
    });
  });
}

if (document.getElementById('rtl')) {
  document.getElementById('rtl').addEventListener('click', () => {
    document.querySelectorAll('.corn-form--item').forEach((input) => {
      input.setAttribute('dir', 'rtl');
      input.querySelector('label').innerHTML = 'מה השם שלך?';
      input.querySelector('input').setAttribute('placeholder', 'הזן שם מלא...');
      if (input.querySelector('.corn-form--item--message')) {
        input.querySelector('.corn-form--item--message').innerHTML = 'הודעת סטטוס';
      }
    });
  });
}

if (document.getElementById('ltr')) {
  document.getElementById('ltr').addEventListener('click', () => {
    document.querySelectorAll('.corn-form--item').forEach((input) => {
      input.removeAttribute('dir', true);
      input.querySelector('label').innerHTML = 'What is your name?';
      input.querySelector('input').setAttribute('placeholder', 'Enter Full Name...');
      if (input.querySelector('.corn-form--item--message')) {
        input.querySelector('.corn-form--item--message').innerHTML = 'status message';
      }
    });
  });
}
function getStatusIcon(state) {
  const iconStates = {
    warning: 'exclamation',
    error: 'x',
    success: 'check',
  };
  const iconState = iconStates[state];
  if (iconState) {
    return `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="corn-icon">
        <use href="/node_modules/bootstrap-icons/bootstrap-icons.svg#${iconState}"></use>
      </svg>
  `;
  } else {
    return '';
  }
}

document
  .querySelectorAll('#error-state, #warning-state, #success-state, #default-state')
  .forEach((statusButton) =>
    statusButton.addEventListener('click', (evt) => {
      console.log('hello');
      const status = evt.target.id.replace('-state', '');
      document.querySelectorAll('.corn-form--item').forEach((input) => {
        let message = '';
        input.classList.remove(
          'corn-status--error',
          'corn-status--warning',
          'corn-status--success'
        );
        if (status !== 'default') input.classList.add('corn-status--' + status);
        if (status == 'default' && document.getElementById('enable')) {
          document.getElementById('enable').click();
        }
        document.getElementById('current-state').innerHTML = status;
        input.querySelector('.corn-status') &&
          input.removeChild(input.querySelector('.corn-status'));
        if (input.hasAttribute('dir')) {
          message = 'הודעת סטטוס';
        } else {
          message = getStatusIcon(status) + status + ' message';
        }
        input.insertAdjacentHTML('beforeend', '<div class="corn-status">' + message + '</div>');
      });
    })
  );
