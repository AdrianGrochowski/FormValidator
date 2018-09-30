	var Validator = (function () {
		function Validator(input, container, validateFn, fa, msg) {
				this.input = document.getElementById(input);
				this.container = document.querySelector(container);
				this.jqcontainer = (container);
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
			$('#adres_dostawy').find(this.jqcontainer).find('.tool_tip').tooltip({trigger:'manual'}).tooltip('hide');
		}
		Validator.prototype.isInvalid = function () {
			this.container.querySelector('.change').classList.remove(this.fa, 'fa-check');
			this.container.querySelector('.change').classList.add('fa-exclamation');
			this.container.querySelector('.input-group-addon').classList.remove("correct");
			this.container.querySelector('.input-group-addon').classList.add("incorrect");
			$('#adres_dostawy').find(this.jqcontainer).find('.tool_tip').attr('title', this.msg);
			$('#adres_dostawy').find(this.jqcontainer).find('.tool_tip').tooltip({trigger:'manual'}).tooltip('show');
		}
		return Validator;
}());

imie = new Validator('id_delivery-imie', '.imie', function(v){return /^.{3,}$/.test(v)}, 'fa-user', 'Podaj poprawne imię');
nazwisko = new Validator('id_delivery-nazwisko', '.nazwisko', function(v){return /^.{3,}$/.test(v)}, 'fa-user', 'Podaj poprawne nazwisko');
kod_pocztowy = new Validator('id_delivery-kod', '.kod', function(v){return /^\d{2}-\d{3}$/.test(v)}, 'fa-address-card', 'Podaj poprawny kod');
miasto = new Validator('id_delivery-miasto', '.miasto', function(v){return /^.{3,}$/.test(v)}, 'fa-road', 'Podaj poprawne miasto');
adres = new Validator('id_delivery-adres', '.adres', function(v){return /^((.){1,}(\d){1,}(.){0,})$/.test(v)}, 'fa-address-card', 'Podaj poprawny adres');
email = new Validator('id_delivery-email', '.email', function(v){return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v)}, 'fa-envelope', 'Podaj poprawny email');
telefon = new Validator('id_delivery-telefon', '.telefon', function(v){return /^(?:\(?\+?48)?(?:[-\.\(\)\s]*(\d)){9}\)?$/.test(v)}, 'fa-phone', 'Podaj poprawny telefon');
