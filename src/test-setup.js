import chai from 'chai';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);

const jsdom = require('jsdom').jsdom;

global.document = jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
