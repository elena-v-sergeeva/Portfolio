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

})	
