// onboarding slider
document.addEventListener('DOMContentLoaded', function () {
    const swiperElements = document.querySelectorAll('.onboardin__slider');
    
    if (swiperElements.length > 0) { // Проверка наличия элементов с классом .onboardin__slider
        swiperElements.forEach(function(swiperElement) {
            const nextButton = swiperElement.querySelector('.onboardin-button-next');

            const swiperInstance = new Swiper(swiperElement, {
                slidesPerView: 1,
                allowTouchMove: false, 
                pagination: {
                    el: '.onboardin-pagination',
                },
                navigation: {
                    nextEl: nextButton,
                },
                on: {
                    slideChange: function () {
                        const onboardingHeader = document.querySelector('.onboarding-header_skip');

                        if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
                            if (onboardingHeader) {
                                onboardingHeader.remove();
                            }
                            nextButton.textContent = 'Start';

                            nextButton.onclick = function() {
                                window.location.href = 'authorization.html'; 
                            };
                        } else {
                            nextButton.textContent = 'Continue';
                            nextButton.onclick = null;
                        }
                    }
                }
            });
        });
    }

    const skipButton = document.querySelector('.onboarding-header_skip');
    const modal = document.getElementById('skipModal');
    const modalOk = document.getElementById('modalOk');
    const modalCancel = document.getElementById('modalCancel');

    // Проверка наличия кнопки skipButton, модального окна и его элементов перед добавлением событий
    if (skipButton && modal && modalOk && modalCancel) {
        skipButton.addEventListener('click', function () {
            modal.style.display = 'flex';
        });

        modalOk.addEventListener('click', function () {
            window.location.href = 'authorization.html'; 
        });

        modalCancel.addEventListener('click', function () {
            modal.style.display = 'none'; 
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});


// Login authorization tabs
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const forgotForm = document.getElementById('forgot-form');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const backToLoginBtn = document.getElementById('back-to-login');
    const resetPasswordBtn = document.getElementById('reset-password');
    const backToEmailBtn = document.getElementById('back-to-email'); // Кнопка для возврата к email
    const authorizationBox = document.querySelector('.authorization-page__box'); // Используем querySelector для класса
    const newPasswordContainer = document.querySelector('.auth-box__new-password-container'); // Селектор для нового блока пароля
    const formMain = document.querySelector('.auth-box__form-main'); // Селектор для блока с email

    // Скрываем блок для ввода нового пароля по умолчанию
    if (newPasswordContainer) {
        newPasswordContainer.classList.add('hidden'); // Предполагается, что класс 'hidden' управляет видимостью
    }

    if (loginBtn && signupBtn && loginForm && signupForm && forgotForm && forgotPasswordLink && backToLoginBtn && resetPasswordBtn && backToEmailBtn && authorizationBox) {
        // Переключение между формами входа и регистрации
        loginBtn.addEventListener('click', () => {
            loginForm.classList.add('auth-box__form--active');
            signupForm.classList.remove('auth-box__form--active');
            forgotForm.classList.remove('auth-box__form--active'); // Скрываем форму восстановления пароля
            loginBtn.classList.add('auth-box__toggle-btn--active');
            signupBtn.classList.remove('auth-box__toggle-btn--active');
            authorizationBox.classList.remove('active'); // Убираем класс active при переключении на вход
            newPasswordContainer.classList.add('hidden'); // Скрываем блок нового пароля
            if (formMain) formMain.classList.remove('hidden'); // Показываем блок с email
        });

        signupBtn.addEventListener('click', () => {
            signupForm.classList.add('auth-box__form--active');
            loginForm.classList.remove('auth-box__form--active');
            forgotForm.classList.remove('auth-box__form--active'); // Скрываем форму восстановления пароля
            signupBtn.classList.add('auth-box__toggle-btn--active');
            loginBtn.classList.remove('auth-box__toggle-btn--active');
            authorizationBox.classList.remove('active'); // Убираем класс active при переключении на регистрацию
            newPasswordContainer.classList.add('hidden'); // Скрываем блок нового пароля
            if (formMain) formMain.classList.remove('hidden'); // Показываем блок с email
        });

        // Показываем форму восстановления пароля и скрываем блок авторизации
        forgotPasswordLink.addEventListener('click', () => {
            authorizationBox.classList.add('hidden'); // Скрываем блок авторизации
            forgotForm.classList.add('auth-box__form--active');
            authorizationBox.classList.add('active'); // Добавляем класс active
            newPasswordContainer.classList.add('hidden'); // Скрываем блок нового пароля
            if (formMain) formMain.classList.remove('hidden'); // Показываем блок с email
        });

        // Возвращаемся к форме входа и показываем блок авторизации
        backToLoginBtn.addEventListener('click', () => {
            forgotForm.classList.remove('auth-box__form--active');
            authorizationBox.classList.remove('hidden'); // Показываем блок авторизации
            loginForm.classList.add('auth-box__form--active');
            authorizationBox.classList.remove('active'); // Убираем класс active при возвращении к входу
            newPasswordContainer.classList.add('hidden'); // Скрываем блок нового пароля
            if (formMain) formMain.classList.remove('hidden'); // Показываем блок с email
        });

        // Обработка нажатия на кнопку сброса пароля
        resetPasswordBtn.addEventListener('click', () => {
            // Скрываем блок для ввода email
            if (formMain) formMain.classList.add('hidden'); // Скрываем блок с email
            newPasswordContainer.classList.remove('hidden'); // Показываем блок для нового пароля
        });

        // Обработка нажатия на кнопку возврата к email
        backToEmailBtn.addEventListener('click', () => {
            // Скрываем блок для нового пароля и показываем блок для email
            newPasswordContainer.classList.add('hidden'); // Скрываем блок нового пароля
            if (formMain) formMain.classList.remove('hidden'); // Показываем блок с email
        });
    }

    // Очищаем поле ввода только для email
    document.querySelectorAll('.auth-box__input[type="text"]').forEach(input => {
        const clearBtn = input.nextElementSibling;

        if (clearBtn) {
            input.addEventListener('input', function() {
                if (input.value.length > 0) {
                    clearBtn.classList.add('visible');
                } else {
                    clearBtn.classList.remove('visible');
                }
            });

            clearBtn.addEventListener('click', function(e) {
                e.preventDefault(); // Предотвращаем отправку формы, если кнопка находится внутри формы
                input.value = '';
                input.focus();
                clearBtn.classList.remove('visible');
            });
        }
    });

    // Переключение видимости пароля
    const togglePasswordIcons = document.querySelectorAll('.auth-box__toggle-password');

    togglePasswordIcons.forEach(togglePasswordIcon => {
        togglePasswordIcon.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;

            // Переключаем атрибут type
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.add('visible');  // Добавляем класс, чтобы показать, что пароль видим
            } else {
                passwordInput.type = 'password';
                this.classList.remove('visible');  // Убираем класс, чтобы показать, что пароль скрыт
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal.terms'); 
    const termsButtons = document.querySelectorAll('.terms-button'); 
    const closeButton = document.querySelector('.modal__close');

    
    if (modal && termsButtons.length > 0 && closeButton) {
      
        termsButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); 
                console.log('Terms button clicked');
                modal.classList.remove('modal--hidden'); 
            });
        });

        closeButton.addEventListener('click', () => {
            console.log('Close button clicked'); 
            modal.classList.add('modal--hidden'); 
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                console.log('Modal background clicked');
                modal.classList.add('modal--hidden'); 
            }
        });
    }
});













