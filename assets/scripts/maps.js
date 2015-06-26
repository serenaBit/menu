//mobile, swipe
//far apparire da edestra
//fr apparire in overlay
//far apparire da sopra
//toggle con funzione da js -
//scrivere in coffee
//mobile, tocco su pagina chiude il menu
//container che si chiude al resize -
//toggle che sparisce al resize -
//toggle che sparisce allo sroll verso il basso e ricompare verso l'alto

$( document ).ready(function() {

	//funzione che assegna al cklick su js-toggle l'apertura del menu
	var menuIsOpen = false;
	$('.js-toggle').click(function(){
		if(menuIsOpen === false){
			menuIsOpen = true;
			$(this).addClass('active');
			$('.js-container').addClass('open');
		}
		else {
			$(this).removeClass('active');
			$('.js-container').removeClass('open');
			menuIsOpen = false;

		}
		})
	

	//funzione che assegna al click su ogni elemnto js-navItem l'apertura del submenu
	var subMenuIsOpen = false;
	$('#js-nav').find('.js-navItem').each(function(){
		$(this).click(function(e){
			e.preventDefault();
			if(subMenuIsOpen===false){
				subMenuIsOpen = true;
				$('#js-nav').addClass('out');
				$(e.currentTarget).find('.js-subMenu').css('display', 'block');
			}
		})
		
		//funzione che assegna al click su ogni elemento js-back la chiusura del submenu
		$(this).find('.js-back').each(function(){
			$(this).click(function(e){
				e.preventDefault();
				if(subMenuIsOpen===true){
					$('#js-nav').removeClass('out');

					var tm=window.setTimeout(function(){
						subMenuIsOpen = false;
						$(e.currentTarget).closest('.js-subMenu').css('display', 'none');

						clearTimeout(tm);
					},300);

				}
			})
		})
	})

	//funzone che controlla la larghezza della pagina (< o > di 1024)
	//se maggiore di 1024, sposta il container, rimuovendo la clase open
	//chiude il toggle
	//chiude il submenu se aperto
	$(window).resize(function(){
		$('.js-subMenu').css('display', 'none');
		if ($(window).width() >= 1024){
			window.desktopSize = true;
			$('#container').removeClass('open');
			$('.js-toggle').removeClass('active');
			if(subMenuIsOpen===true){
					$('#js-nav').removeClass('out');

					var tm=window.setTimeout(function(){
						subMenuIsOpen = false;
						$(e.currentTarget).closest('.js-subMenu').css('display', 'none');

						clearTimeout(tm);
					},300);

				}
		}
		else {
			window.desktopSize = false;
		}
	});

	//funzione che associa l'apretura del submenu all'hover sull'elemmento js-navItem
		//solo quando width maggiore di 1024
	$( '.js-navItem' ).hover(
		 function() {
		 	if(window.desktopSize === true){
		    $( this ).find('.js-subMenu').css('display', 'block');
		  }}, function() {
		  	if(window.desktopSize === true){
		    $( this ).find('.js-subMenu').css('display', 'none');
			}
		  }
		)
	$(window).resize();
});





