$(document).ready(function () {

	//page-nav
	$('#page-nav').onePageNav({
		currentClass: 'active',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
		begin: function () {},
		end: function () {},
		scrollChange: function ($currentListItem) {}
	});

	//мобильное меню
	const toggleMenu = document.querySelector('.toggle-menu'); // иконка гамбургер
	const mobMenu = document.querySelector('.mobile-menu'); //mob menu
	const overlay = document.querySelector('#overlay'); // overlay
	const bodyEl = document.body;

	//прослушиваем событие клик по гамбургеру
	toggleMenu.addEventListener('click', function(){

		this.classList.toggle('active'); 
		mobMenu.classList.toggle('active'); 
		overlay.classList.toggle('active');
		bodyEl.classList.toggle('noscroll'); 

	});

	//прослушиваем событие клик моб меню
	mobMenu.addEventListener('click', function(){
		this.classList.remove('active');
		toggleMenu.classList.remove('active');
		overlay.classList.remove('active');
		bodyEl.classList.remove('noscroll'); 

	});

	//-фильтрация проектов
	let containerEl = document.querySelector('#portfolio-content');

	let mixer = mixitup(containerEl, {
		classNames: {
			block: ""
		}
	});

	//отображение/скрытие карточек проектов по загрузке страницы
	if($(window).width() < 1200){
		$('.portfolio-card.hide-card').hide();
		
		$('.show-project-cards').on('click', function() {
			$('.portfolio-card.hide-card').fadeIn();
			$(this).hide();
		})
	}
	else{
		$('.portfolio-card.hide-card').fadeIn();
		$('.show-project-cards').hide();
	}

	//отображение/скрытие карточек проектов при ресайзе страницы
	$(window).on('resize', function(){
		if($(window).width() <1200){
			$('.portfolio-card.hide-card').hide();
			$('.show-project-cards').fadeIn();
			$('.show-project-cards').on('click', function(){
				$('.portfolio-card.hide-card').fadeIn();
				$(this).css('display', 'none');
			});
		}
		else{
			$('.portfolio-block.hide-card').fadeIn();
			$('.show-project-cards').hide();
		}
	});

	// form placeholder
	const formItems = document.querySelectorAll('.form-field');
	
	for(let item of formItems){
		const thisParent = item.closest('.form-item');
		const thisPlaceholder = thisParent.querySelector('.fake-palceholder');

		// Если инпут в фокусе	

		item.addEventListener('focus', function(){
			thisPlaceholder.classList.add('active');
		});

		// Если инпут теряет фокус

		item.addEventListener('blur', function(){

			if(item.value.length > 0){
				thisPlaceholder.classList.add('active');
			}
			else{
				thisPlaceholder.classList.remove('active');
			}
		})
	}

	//FORM VALIDATE
	$('.contacts-form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			subject: {
				required: true
			},
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'Отсутсвует символ @'
			},
			subject: {
				required: 'Введите тему сообщения'
			},
			message: {
				required: 'Введите текст сообщения'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	})

	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".contacts-form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".contacts-form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}

	// ПАРАЛЛАКС ДВИЖЕНИЯ ЗА МЫШКОЙ​
	let prxScene = document.querySelector('.section-contacts')
	let prxItem = document.querySelectorAll('.move-quot');
	prxScene.addEventListener('mousemove', function (e) {
		let x = e.clientX / window.innerWidth;
		let y = e.clientY / window.innerHeight;
		for (let item of prxItem) {
			item.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
		}
	});

	// показать кнопку скролл вверх

	$('#back-arrow').hide();

	$(window).scroll(function(){

		if($(this).scrollTop() > 300){
			console.log(1);
			$('#back-arrow').fadeIn();
		}
		else{
			$('#back-arrow').fadeOut();
		}
	});

	$(".contacts-btn").click(function (event) {
        event.preventDefault();
        let top = $('#section-contacts').offset().top;
		$('body,html').animate({scrollTop: top}, 100);
		// window.location.href = 'http://yandex.ru';
	});
	
	$(".works").click(function (event) {
        event.preventDefault();
        let top = $('#section-portfolio').offset().top;
		$('body,html').animate({scrollTop: top}, 100);
		// window.location.href = 'http://yandex.ru';
	});
	
	$(".hello-btn").click(function (event) {
        event.preventDefault();
        let top = $('#header-information').offset().top;
		$('body,html').animate({scrollTop: top}, 100);
		// window.location.href = 'http://yandex.ru';
	});
})	
