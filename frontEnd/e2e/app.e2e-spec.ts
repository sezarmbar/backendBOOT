import { ParkhausPage } from './app.po';

describe('parkhaus App', () => {
  let page: ParkhausPage;

  beforeEach(() => {
    page = new ParkhausPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
