/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
const index = require('../index');

const resource = index.resource;

const url = path => `http://localhost:3000${path}`

describe('Validate article functionality', () => {

	it('should give me three or more articles', (done) => {
        resource('GET', 'articles')
        .then(body => {
            expect(body.articles.length).to.be.at.least(3);
        })
        .then(done)
        .catch(done)
 	}, 500)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
        let firstId;

        resource('POST', 'article', {'text': 'one'})
        .then(body => {
            expect(body).to.be.ok;
            expect(body.articles.length).to.be.eql(1);
            expect(body.articles[0].text).to.be.eql('one');

            firstId = body.articles[0]._id;

            resource('POST', 'article', {'text': 'two'})
            .then(body => {
                expect(body).to.be.ok;
                expect(body.articles.length).to.be.eql(1);
                expect(body.articles[0].text).to.be.eql('two');

                expect(body.articles[0]._id).to.be.eql(firstId + 1);
            })
            .then(done)
            .catch(done)
        })

 	}, 500)

	it('should add one article', (done) => {
        // Counting number of articles first, adding an article, then checking 
        // the length of articles has increased by 1 and the new article is 
        // returned in the list of articles.
        
        let firstLength;
        let postedId;

        resource('GET', 'articles')
        .then(body => {
            expect(body).to.be.ok;
            firstLength = body.articles.length;

            resource('POST', 'article', {'text': 'new'})
            .then(body => {
                expect(body).to.be.ok;
                expect(body.articles.length).to.be.eql(1);
                expect(body.articles[0].text).to.be.eql('new');

                postedId = body.articles[0]._id;

                resource('GET', 'articles')
                .then(body => {
                    expect(body).to.be.ok;
                    expect(body.articles.length).to.be.eql(firstLength + 1);

                    let postedArticle = body.articles.filter(function(obj) {
                        return obj._id == postedId;
                    })

                    expect(postedArticle.length).to.be.eql(1);
                })
                .then(done)
                .catch(done)
            })
        })

 	}, 500)

	it('should return an article with a specified id', (done) => {
        let targetId;

        resource('GET', 'articles')
        .then(body => {
            expect(body.articles.length).to.be.at.least(3);
            targetId = body.articles[Math.floor(Math.random() * body.articles.length)]._id;

            resource('GET', 'articles/' + targetId)
            .then(body => {
                expect(body.articles.length).to.be.eql(1);
                expect(body.articles[0]._id).to.be.eql(targetId);
            })
            .then(done)
            .catch(done)
        })

	}, 500)

	it('should return nothing for an invalid id', (done) => {
        resource('GET', 'articles/hi')
        .then(body => {
            expect(body.articles.length).to.be.eql(0);
        })
        .then(done)
        .catch(done)
	}, 500)

    /*
	it('should post, then update the article', (done) => {
        let articleId;

        fetch(url("/article"), {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'text': 'original'})
        })
        .then(res => {
            expect(res.status).to.eql(200);
            return res.json();
        })
        .then(body => {
            expect(body).to.be.ok;
            expect(body.articles.length).to.be.eql(1);
            expect(body.articles[0].text).to.be.eql('original');

            articleId= body.articles[0]._id;

            fetch(url("/article"), {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'text': 'two'})
            })
            .then(res => {
                expect(res.status).to.eql(200);
                return res.json();
            })
            .then(body => {
                expect(body).to.be.ok;
                expect(body.articles.length).to.be.eql(1);
                expect(body.articles[0].text).to.be.eql('two');

                expect(body.articles[0]._id).to.be.eql(firstId + 1);
            })
            .then(done)
            .catch(done)
        })

	}, 500)
    */
});
