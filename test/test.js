process.env.NODE_ENV = "test"

const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../index.js")
const should = chai.should()

chai.use(chaiHttp)

describe("/POST number", () => {
  it("it should not POST with number 0", done => {
    const body = {
      number: 2032
    }
    chai
      .request(server)
      .post("/api/t9")
      .send(body)
      .end((err, res) => {
        res.body.should.have.property('error')
        res.body.error.should.eql(
          'available only digits with text: 2, 3, 4, 5, 6, 7, 8'
        )
        done()
      })
  })
  it("it should not POST with number 1", done => {
    const body = {
      number: 1412
    }
    chai
      .request(server)
      .post("/api/t9")
      .send(body)
      .end((err, res) => {
        res.body.should.have.property('error')
        res.body.error.should.eql(
          'available only digits with text: 2, 3, 4, 5, 6, 7, 8'
        )
        done()
      })
  })
  it("it should not POST with a number with more than 9 digits", done => {
    const body = {
      number: 234562345623
    }
    chai
      .request(server)
      .post("/api/t9")
      .send(body)
      .end((err, res) => {
        res.body.should.have.property('error')
        res.body.error.should.eql(
          'currently up to 9 digit numbers supported'
        )
        done()
      })
  })
  it("it should not POST with a non number", done => {
    const body = {
      number: 'test0'
    }
    chai
      .request(server)
      .post("/api/t9")
      .send(body)
      .end((err, res) => {
        res.body.should.have.property('error')
        res.body.error.should.eql(
          'only numbers'
        )
        done()
      })
  })
  it("it should POST successfully and get an object with two arrays back", done => {
    const body = {
      number: 23
    }
    chai
      .request(server)
      .post("/api/t9")
      .send(body)
      .end((err, res) => {
        res.body.should.be.a('object')
        res.body.combos.should.be.a('array')
        res.body.words.should.be.a('array')
        done()
      })
  })
})
