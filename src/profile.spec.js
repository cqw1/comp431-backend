// Test suite for profile.js
//
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate profile functionality', () => {

	it('should update a headline and verify it changed', (done) => {
        let originalHeadline;

        fetch(url("/headlines"))
        .then(res => {
            expect(res.status).to.eql(200);
            return res.json();
        })
        .then(body => {
            expect(body.headlines.length).to.be.eql(1);
            originalHeadline = body.headlines[0].headline;

            fetch(url("/headline"), {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'headline': originalHeadline + ' revamped'})
            })
            .then(res => {
                expect(res.status).to.eql(200);
                return res.json();
            })
            .then(body => {
                expect(body).to.ok;
                expect(body.headline).to.be.eql(originalHeadline + ' revamped');
            })
            .then(done)
            .catch(done)
        })

	}, 500)

});
