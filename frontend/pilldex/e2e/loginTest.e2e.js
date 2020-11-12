describe('Create Account Test', () => {
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

  it ('Email Test 1', async () => {
    await element(by.text("NEW USER")).tap();

    const email = element(by.id('Email-Input'));
    const pw = element(by.id('Password-Input'));

    await email.replaceText('bobjohnson');
    await pw.replaceText('123456');

    await element(by.text("CREATE ACCOUNT")).tap();

    await expect(element(by.text("Invalid Email Address"))).toBeVisible();
  });


});
