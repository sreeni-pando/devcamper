const assert = require('assert');
const expect = require('chai').expect;
const math = require('../math');

describe('Simple Math Test', () => {
 it('should return 2', () => {
        assert.equal(1 + 1, 2);
    });
 it('should return 9', () => {
        assert.equal(3 * 3, 9);
    });
});

describe('Math.js test case', ()=>{
    describe('math.add test case', ()=>{
       it('should return 3', ()=>{
        const result = math.add(1,2);
        expect(result).to.be.equal(3);
       }) 
    });
});