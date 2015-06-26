$ ->
	window.menuIsOpen = false
	window.container = $ '.js-container'
	if  $('.js-header').length isnt 0
		new Menu $ '.js-header'
