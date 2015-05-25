var cacheBust = require('../');
var express = require('express');
var assert = require('assert');
var mocha = require('mocha');
var sinon = require('sinon');
var express = require('express');

describe('cacheBust', function () {
	beforeEach(function () {
		sinon.stub(cacheBust, 'getTimestamp').returns('12345');
	});

	afterEach(function () {
		cacheBust.getTimestamp.restore();
	});

	describe('express integration', function () {
		it('should set app locals', function () {
			var app = { locals: {} };
			var handlerFn = cacheBust.handler(app, { packageLocation: './test/package-test.json' });
			assert.equal(typeof app.locals.cacheBust, 'function');
		});
	});

	describe('when NODE_ENV is set to production', function () {
		var previousEnv;
		beforeEach(function () {
			previousEnv = process.env.NODE_ENV;
			process.env.NODE_ENV = 'production';
		});
		afterEach(function () {
			process.env.NODE_ENV = previousEnv;
		});
		it('should not append a timestamp', function () {
			var fn = cacheBust({ packageLocation: './test/package-test.json' });
			var out = fn('/scripts/app.js');
			assert.equal(out, '<script src="/scripts/app.js?v=1.0.0"></script>');
		});
	});

	it('should generate a script tag for js files', function () {
		var fn = cacheBust({ packageLocation: './test/package-test.json' });
		var out = fn('/scripts/app.js');
		assert.equal(out, '<script src="/scripts/app.js?v=1.0.0-12345"></script>');
	});

	it('should generate a link tag for css files', function () {
		var fn = cacheBust({ packageLocation: './test/package-test.json' });
		var out = fn('/scripts/style.css');
		assert.equal(out, '<link rel="stylesheet" href="/scripts/style.css?v=1.0.0-12345" />');
	});

	it('should use a type argument if given', function () {
		var fn = cacheBust({ packageLocation: './test/package-test.json' });
		var out = fn('/scripts/app', 'js');
		assert.equal(out, '<script src="/scripts/app?v=1.0.0-12345"></script>');
	});
});
