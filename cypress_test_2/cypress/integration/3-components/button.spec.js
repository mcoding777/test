describe('메인 테스트', () => {
    it('방문하다', () => {
        cy.visit('');
    });

    it("count is 버튼 클릭!", () => {
        cy.contains("count is:").click();
        cy.get('.button').should('contain', '1');
    });
})