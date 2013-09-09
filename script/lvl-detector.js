angular
.module('lvl.services',[])
.factory('detector', function() {
	var svc = {
		this.Audio = {
			Any: function() {
				return !!document.createElement('audio').canPlayType;
			},
			Mp3: funciton() {
				var a = document.createElement('audio');
				return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
			},
			Vorbis: function() {
				var a = document.createElement('audio');
				return !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
			},
			Wav: function() {
				var a = document.createElement('audio');
				return !!(a.canPlayType && a.canPlayType('audio/wav; codecs="1"').replace(/no/, ''));
			},
			Aac: function() {
				var a = document.createElement('audio');
				return !!(a.canPlayType && a.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ''));
			}
		};

		this.Canvas = {
			Drawing: function() {
				return !!document.createElement('canvas').getContext;
			},
			Text: function() {
				var c = document.createElement('canvas');
				return c.getContext && typeof c.getContext('2d').fillText == 'function';
			}
		};

		this.Command = function() {
			return 'type' in document.createElement('command');
		};

		this.DataList = function() {
			return 'options' in document.createElement('datalist');
		};

		this.Details = function() {
			return 'open' in document.createElement('details');
		};

		this.FormConstraintValidation = function() {

		};

	}
});
