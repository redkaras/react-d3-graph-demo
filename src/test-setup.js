import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import { jsdom } from 'jsdom';

chai.use(chaiImmutable);

global.document = jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
