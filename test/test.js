'use strict';

// MODULES //

var test = require( 'tape' );
var urls = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof urls === 'function', 'main export is a function' );
	t.end();
});

test( 'an `options` argument is required', function test( t ) {
	t.throws( foo, TypeError, 'throws error' );
	t.end();

	function foo() {
		urls();
	}
});

test( 'a repository `owner` must be specified', function test( t ) {
	t.throws( foo, TypeError, 'throws error' );
	t.end();

	function foo() {
		urls({
			'repo': 'beep'
		});
	}
});

test( 'a repository name must be specified', function test( t ) {
	t.throws( foo, TypeError, 'throws error' );
	t.end();

	function foo() {
		urls({
			'owner': 'beep'
		});
	}
});

test( 'the function returns an object containing `image` and `url` fields', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});

	t.equal( typeof out.image, 'string', 'image field is a string' );
	t.equal( typeof out.url, 'string', 'url field is a string' );
	t.end();
});

test( 'the `image` field corresponds to a shields.io badge url', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/github/stars/beep/boop.svg?style=social&label=Star&link=https://github.com/beep/boop&link=https://github.com/beep/boop/stargazers', 'image url' );
	t.end();
});

test( 'the `url` field corresponds to the repository url on Github', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.url, 'https://github.com/beep/boop', 'Github url' );
	t.end();
});

test( 'the default social action is `star`', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/github/stars/beep/boop.svg?style=social&label=Star&link=https://github.com/beep/boop&link=https://github.com/beep/boop/stargazers', 'image url' );
	t.end();
});

test( 'the social action can be specified', function test( t ) {
	var out;

	// Fork:
	out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'action': 'fork'
	});
	t.equal( out.image, 'https://img.shields.io/github/forks/beep/boop.svg?style=social&label=Fork&link=https://github.com/beep/boop&link=https://github.com/beep/boop/network', 'image url' );

	// Watch:
	out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'action': 'watch'
	});
	t.equal( out.image, 'https://img.shields.io/github/watchers/beep/boop.svg?style=social&label=Watch&link=https://github.com/beep/boop&link=https://github.com/beep/boop/watchers', 'image url' );

	// Star:
	out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'action': 'star'
	});
	t.equal( out.image, 'https://img.shields.io/github/stars/beep/boop.svg?style=social&label=Star&link=https://github.com/beep/boop&link=https://github.com/beep/boop/stargazers', 'image url' );

	t.end();
});

test( 'the default badge style is `social`', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/github/stars/beep/boop.svg?style=social&label=Star&link=https://github.com/beep/boop&link=https://github.com/beep/boop/stargazers', 'image url' );
	t.end();
});

test( 'the badge style can be specified', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'style': 'flat'
	});
	t.equal( out.image, 'https://img.shields.io/github/stars/beep/boop.svg?style=flat&label=stars', 'image url' );
	t.end();
});

test( 'the default badge format is `svg`', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop'
	});
	t.equal( out.image, 'https://img.shields.io/github/stars/beep/boop.svg?style=social&label=Star&link=https://github.com/beep/boop&link=https://github.com/beep/boop/stargazers', 'image url' );
	t.end();
});

test( 'the badge format can be specified', function test( t ) {
	var out = urls({
		'owner': 'beep',
		'repo': 'boop',
		'format': 'png'
	});
	t.equal( out.image, 'https://img.shields.io/github/stars/beep/boop.png?style=social&label=Star&link=https://github.com/beep/boop&link=https://github.com/beep/boop/stargazers', 'image url' );
	t.end();
});
