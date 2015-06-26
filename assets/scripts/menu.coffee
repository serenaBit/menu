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
		@hover()

	initMenu : =>
		@btnToggle.click (e)=>
			e.preventDefault()
			if !window.menuIsOpen
				window.menuIsOpen = true
				$(e.currentTarget).addClass 'active'
				window.container.addClass 'open'

			else
				$(e.currentTarget).removeClass 'active'
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
			@closeMenu()
		else
			window.desktopSize = false

	hover : =>
		@openers.hover (e)=>
			if window.desktopSize	then $(e.currentTarget).find('.js-subMenu').css 'display', 'block'
		, (e)=>
			if window.desktopSize	then $(e.currentTarget).find('.js-subMenu').css 'display', 'none'

			



