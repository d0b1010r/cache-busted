var cacheBust = module.exports = function cacheBust (options) {
	options = options || {
		version: null,
		packageLocation: __dirname + '/../../package.json'
	};
	if (!options.version) {
		try {
			options.version = require(options.packageLocation).version;
		} catch(e) {
			throw(new Error('No version information found. Looked in ' + options.packageLocation));
		}
	}

	var querystring;
	if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'integration') {
		querystring = options.version;
	} else {
		querystring = options.version + '-' + cacheBust.getTimestamp();
	}

	return function (ressource, type) {
		type = type || getType(ressource);
		if (type === 'js') {
			return '<script src="' + ressource + '?v=' + querystring + '"></script>';
		} else if (type === 'css') {
			return '<link rel="stylesheet" href="' + ressource + '?v=' + querystring + '" />';
		}
	};
};

cacheBust.handler = function handler (app, options) {
	app.locals.cacheBust = cacheBust(options);
};

cacheBust.getTimestamp = function getTimestamp () {
	return new Date().valueOf();
};

function getType (ressource) {
	var extension = ressource.split('.').pop();
	return extension;
}
