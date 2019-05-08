const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const app = require('../app');
const { Server, DEFAULT_PORT } = require('../server');

const server = new Server(app, DEFAULT_PORT);

describe('Controllers', () => {
  before(() => {
    server.startServer();
  });

  after(() => {
    server.closeServer();
  });

  describe('Discogs', () => {
    it('should retrieve collection from discogs', (done) => {
      chai.request(app)
        .get('/discogs/search')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
