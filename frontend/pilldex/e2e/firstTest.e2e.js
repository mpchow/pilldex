
describe('M7 Tests', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Log In Screen Exists Test', async () => {
    await expect(element(by.text('SIGN IN'))).toBeVisible();
  });

  it('Click New User Button Test', async () => {
    await element(by.text("NEW USER")).tap();
    await expect(element(by.text("Create Account"))).toBeVisible();
  });


});
