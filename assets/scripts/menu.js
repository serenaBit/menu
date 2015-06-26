// Generated by CoffeeScript 1.8.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Menu = (function() {
    function Menu(ref) {
      this.ref = ref;
      this.hover = __bind(this.hover, this);
      this.resize = __bind(this.resize, this);
      this.closeMenu = __bind(this.closeMenu, this);
      this.initOpeners = __bind(this.initOpeners, this);
      this.initMenu = __bind(this.initMenu, this);
      console.log('hola patata');
      this.btnToggle = this.ref.find('.js-toggle');
      this.menu = this.ref.find('.js-nav');
      this.subMenuIsOpen = false;
      this.openers = this.menu.find('.js-navItem');
      this.delay = 300;
      this.sizeScreen = 1024;
      this.initMenu();
      this.initOpeners();
      $(window).resize(this.resize);
      this.resize();
      this.hover();
    }

    Menu.prototype.initMenu = function() {
      return this.btnToggle.click((function(_this) {
        return function(e) {
          e.preventDefault();
          if (!window.menuIsOpen) {
            window.menuIsOpen = true;
            $(e.currentTarget).addClass('active');
            return window.container.addClass('open');
          } else {
            $(e.currentTarget).removeClass('active');
            window.container.removeClass('open');
            return window.menuIsOpen = false;
          }
        };
      })(this));
    };

    Menu.prototype.initOpeners = function() {
      var i, opener, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.openers.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        opener = $(this.openers[i]);
        opener.click((function(_this) {
          return function(e) {
            e.preventDefault();
            if (!_this.subMenuIsOpen) {
              _this.subMenuIsOpen = true;
              _this.menu.addClass('out');
              return $(e.currentTarget).find('.js-subMenu').css('display', 'block');
            }
          };
        })(this));
        _results.push(opener.find('.js-back').click((function(_this) {
          return function(e) {
            e.preventDefault();
            return _this.closeMenu($(e.currentTarget));
          };
        })(this)));
      }
      return _results;
    };

    Menu.prototype.closeMenu = function(element) {
      if (element == null) {
        element = null;
      }
      if (this.subMenuIsOpen) {
        this.menu.removeClass('out');
        return this.timeout = window.setTimeout((function(_this) {
          return function() {
            _this.subMenuIsOpen = false;
            if (element != null) {
              element.closest('.js-subMenu').css('display', 'none');
            }
            return clearTimeout(_this.timeout);
          };
        })(this), this.delay);
      }
    };

    Menu.prototype.resize = function() {
      this.ref.find('.js-subMenu').css('display', 'none');
      if ($(window).width() >= this.sizeScreen) {
        window.desktopSize = true;
        window.container.removeClass('open');
        this.btnToggle.removeClass('active');
        return this.closeMenu();
      } else {
        return window.desktopSize = false;
      }
    };

    Menu.prototype.hover = function() {
      return this.openers.hover((function(_this) {
        return function(e) {
          if (window.desktopSize) {
            return $(e.currentTarget).find('.js-subMenu').css('display', 'block');
          }
        };
      })(this), (function(_this) {
        return function(e) {
          if (window.desktopSize) {
            return $(e.currentTarget).find('.js-subMenu').css('display', 'none');
          }
        };
      })(this));
    };

    return Menu;

  })();

}).call(this);
