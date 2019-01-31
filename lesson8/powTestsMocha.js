describe('Возведение в степень', () => {
    it('2^3 === 8', () => {
        assert.equal(pow(2, 3), 8)
    });
    it('2^5 === 32', () => {
        assert.equal(pow(2, 5), 32)
    });
    it('3^3 === 27', () => {
        assert.equal(pow(3, 3), 27)
    });
});

describe('Нестандартные ситуации', () => {
    it('Проверка на отрицательные значения', () => {
        assert(pow(-2, 5) === null);
        assert(pow(2, -5) === null);
        assert(pow(-2, -5) === null);
    });
    it('Проверка на дробные значения', () => {
        assert(pow(2.1, 5) === null);
        assert(pow(2, 5.1) === null);
        assert(pow(2.1, 5.1) === null);
    });
});