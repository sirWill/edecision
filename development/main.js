;(function(){
	'use strict';

	angular
		.module('eDecision', [])
		.factory('Decision', DecisionFactory)
		.controller('DecisionCtrl', DecisionController)
		.filter('sum', function(){
			return function(_i){
				var s = 0;
				angular.forEach(_i, function(e){
					s += e.rate;
				})
				return s;
			}
		})
		.filter('result', function(){
			return function(_pros, _cons){
				var sP = 0, sC = 0;
				angular.forEach(_pros, function(e){
					sP += e.rate;
				});
				angular.forEach(_cons, function(e){
					sC += e.rate;
				})
				if(sC)
					return sP/sC;
				else if(sP)
					return sP;
				else
					return 0;
			}
		});

		function DecisionFactory(){
			var o = {};

			var decision = null;

			o.new = function(){
				decision = {
					name : '',
					pros : [],
					cons : [],
					new : true	
				};
				return decision;
			}

			o.rem = function(){
				decision = null;
			}

			return o;
		}

		function DecisionController($filter){
			var s = this;

			s.decision = undefined;

			s.new = function(){
				s.decision = {
					name : '',
					pros : [],
					cons : [],
					new : true	
				};
			}

			s.rem = function(){
				s.decision = undefined;
			}

			s.text = '';

			s.addPros = function(){
				s.decision.pros.push({
					title: s.text,
					rate: 0
				});
				s.text = '';
			}

			s.addCons = function(){
				s.decision.cons.push({
					title: s.text,
					rate: 0
				});
				s.text = '';
			}

			s.bodyClass = function(){
				if(!s.decision)
					return 'bg-info';
				var result = $filter('result')(s.decision.pros,s.decision.cons);
				if(result>=2)
					return 'bg-success';
				else if(result < 2 && result > 1)
					return 'bg-danger';
				else
					return 'bg-warning';
			}

		}

})();
