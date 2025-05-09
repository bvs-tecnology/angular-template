const process = require('process');
const puppeteer = require('puppeteer');

process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage'),
			require('@angular-devkit/build-angular/plugins/karma'),
		],
		client: {
			clearContext: false,
		},
		coverageReporter: {
			dir: require('path').join(__dirname, 'coverage'),
			subdir: '.',
			reporters: [{ type: 'html' }, { type: 'text-summary' }],
			check: {
				global: {
					statements: 80,
					branches: 80,
					functions: 80,
					lines: 80,
				},
			},
		},
		reporters: ['progress', 'kjhtml'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['ChromeHeadlessNoSandbox'],
		singleRun: false,
		restartOnFileChange: false,
		customLaunchers: {
			ChromeHeadlessNoSandbox: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox', '--disable-gpu', '--remote-debugging-port=9222'],
			},
		},
	});
};
