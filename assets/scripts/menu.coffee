class window.Menu
	constructor: (@ref)->
		console.log 'hola patata'
		@btnToggle = @ref.find '.js-toggle'
		@menu = @ref.find '.js-nav'
		@subMenuIsOpen = false
		@openers = @menu.find '.js-navItem'
		@delay = 300
		@sizeScreen = 1024
		@initMenu()
		@initOpeners()
		$(window).resize @resize
		@resize()
		@scroll()
		@hover()	

	initMenu : =>
		@btnToggle.click ()=>
			@openMenu()
		$(document).on('pageinit', (e)=>
			window.container.swiperight(@openMenu))

	openMenu : =>
		if !window.menuIsOpen
			window.menuIsOpen = true
			@btnToggle.addClass 'active'
			window.container.addClass 'open'
		else
			@btnToggle.removeClass 'active'
			window.container.removeClass 'open'
			window.menuIsOpen = false	

	initOpeners : =>
		for i in [0...@openers.length]
			opener = $ @openers[i]
			opener.click (e)=>
				e.preventDefault()
				if !@subMenuIsOpen
					@subMenuIsOpen = true
					@menu.addClass 'out'
					$(e.currentTarget).find('.js-subMenu').css 'display', 'block'
			opener.find('.js-back').click (e)=>
				e.preventDefault()
				@closeMenu $ e.currentTarget

	closeMenu : (element=null)=>
		if @subMenuIsOpen
			@menu.removeClass 'out'
			@timeout = window.setTimeout ()=>
				@subMenuIsOpen = false
				if element? then element.closest('.js-subMenu').css 'display', 'none'
				clearTimeout @timeout
			, @delay


	resize : =>
		@ref.find('.js-subMenu').css 'display', 'none'
		if $(window).width() >= @sizeScreen
			window.desktopSize = true
			window.container.removeClass 'open'
			@btnToggle.removeClass 'active'
			@btnToggle.css 'display', 'none'
			@closeMenu()
		else
			window.desktopSize = false
			@btnToggle.css 'display', 'block'


	hover : =>
		@openers.hover (e)=>
			if window.desktopSize	then $(e.currentTarget).find('.js-subMenu').css 'display', 'block'
		, (e)=>
			if window.desktopSize	then $(e.currentTarget).find('.js-subMenu').css 'display', 'none'

	scroll : =>
		lastScrollTop = 0
		$(window).scroll (e)=>
			if $(window).width() <= @sizeScreen
				st = $(e.currentTarget).scrollTop()
				if st > lastScrollTop
					@btnToggle.css 'display', 'none'
				else
					@btnToggle.css 'display', 'block'
				lastScrollTop = st


# var lastScrollTop = 0;
# $(window).scroll(function(event){
#    var st = $(this).scrollTop();
#    if (st > lastScrollTop){
#        // downscroll code
#    } else {
#       // upscroll code
#    }
#    lastScrollTop = st;
# });





