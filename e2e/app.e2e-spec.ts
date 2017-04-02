import { AssignmentProject2Page } from './app.po';

describe('assignment-project2 App', () => {
  let page: AssignmentProject2Page;

  beforeEach(() => {
    page = new AssignmentProject2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
