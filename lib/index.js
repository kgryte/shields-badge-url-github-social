'use strict';

// MODULES //

var mustache = require( 'mustache' );
var validate = require( './validate.js' );
var ACTIONS = require( './actions.json' );


// TEMPLATES //

var URL = 'https://github.com/{{owner}}/{{repo}}';
var IMAGE = 'https://img.shields.io/github/{{action.type}}/{{owner}}/{{repo}}.{{format}}?style={{style}}&label={{#links}}{{action.label}}&link=https://github.com/{{owner}}/{{repo}}&link=https://github.com/{{owner}}/{{repo}}/{{action.link}}{{/links}}{{^links}}{{action.type}}{{/links}}';

mustache.parse( URL );
mustache.parse( IMAGE );


// URLS //

/**
* FUNCTION: urls( options )
*	Creates Shields.io badge URLs.
*
* @param {Object} options - function options
* @param {String} options.owner - repository owner
* @param {String} options.repo - repository name
* @param {String} [options.action="star"] - social action
* @param {String} [options.style="social"] - badge style
* @param {String} [options.format="svg"] - badge format
* @returns {Object}
*/
function urls( options ) {
	var opts;
	var out;
	var err;

	opts = {};
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	opts.action = opts.action || ACTIONS.star;
	opts.style = opts.style || 'social';
	if ( opts.style === 'social' ) {
		opts.links = true;
	}
	opts.format = opts.format || 'svg';

	out = {};
	out.image = mustache.render( IMAGE, opts );
	out.url = mustache.render( URL, opts );

	return out;
} // end FUNCTION urls()


// EXPORTS //

module.exports = urls;
