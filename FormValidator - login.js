var Validator = (function () {
      function Validator(input, container, validateFn, fa, msg) {
          this.input = document.getElementById(input);
          this.container = document.querySelector(container);
          this.jqcontainer = $(container);
          this.validateFn = validateFn;
          this.fa = fa;
          this.msg = msg;
          this.timeOut = null;
          this.bindEvents();
      };
      Validator.prototype.bindEvents = function () {
          this.input.addEventListener('keyup', this.onKeyUp.bind(this), false);
      };
      Validator.prototype.onKeyUp = function () {
          clearTimeout(this.timeOut);
          this.timeOut = setTimeout(function(){this.validate();}.bind(this), 500);
      }
      Validator.prototype.validate = function () {
          var result = this.validateFn(this.input.value);
          result && this.isValid();
          !result && this.isInvalid();
      };
      Validator.prototype.isValid = function () {
        this.container.querySelector('.change').classList.remove(this.fa , 'fa-exclamation');
        this.container.querySelector('.change').classList.add('fa-check');
        this.container.querySelector('.input-group-addon').classList.remove("incorrect");
        this.container.querySelector('.input-group-addon').classList.add("correct");
        this.jqcontainer.find('.tool_tip').tooltip({trigger:'manual'}).tooltip('hide');
      }
      Validator.prototype.isInvalid = function () {
        this.container.querySelector('.change').classList.remove(this.fa, 'fa-check');
        this.container.querySelector('.change').classList.add('fa-exclamation');
        this.container.querySelector('.input-group-addon').classList.remove("correct");
        this.container.querySelector('.input-group-addon').classList.add("incorrect");
        this.jqcontainer.find('.tool_tip').attr('title', this.msg);
        this.jqcontainer.find('.tool_tip').tooltip({trigger:'manual'}).tooltip('show');
      }
      return Validator;
  }());

  mail = new Validator('id_auth_form-username', '.username', function(v){return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v)}, 'fa-envelope', 'Podaj poprawny email');
  haslo = new Validator('id_auth_form-password', '.password', function(v){return /^.{4,}$/.test(v)}, 'fa-lock', 'Podaj poprawne hasło');

  login_reg = new Validator('id_register_form-username', '.username_reg', function(v){return /^.{4,}$/.test(v)}, 'fa-user', 'Podaj poprawny login');
  mail_reg = new Validator('id_register_form-email', '.mail_reg', function(v){return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v)}, 'fa-envelope', 'Podaj poprawny mail');
  haslo_reg = new Validator('id_register_form-password1', '.haslo_reg', function(v){return /^.{4,}$/.test(v)}, 'fa-lock', 'Podaj poprawne hasło');
