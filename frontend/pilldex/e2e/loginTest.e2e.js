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

  it ('Create User Bad Email', async () => {
    await element(by.text("NEW USER")).tap();

    const email = element(by.id('Email-Input'));
    const pw = element(by.id('Password-Input'));

    await email.replaceText('bobjohnson');
    await pw.replaceText('123456');

    await element(by.text("CREATE ACCOUNT")).tap();

    await expect(element(by.text("Invalid Email Address"))).toBeVisible();
    await element(by.text("OK")).tap();
  });

  it ('Create User Bad Password', async () => {
    await element(by.text("NEW USER")).tap();

    const email = element(by.id('Email-Input'));
    const pw = element(by.id('Password-Input'));

    await email.replaceText('bobjohnson@gmail.com');
    await pw.replaceText('1234');

    await element(by.text("CREATE ACCOUNT")).tap();

    await expect(element(by.text("This password is too weak, please enter a new one"))).toBeVisible();
    await element(by.text("OK")).tap();
  });

  it ('Create User Bad Password', async () => { // put a timeout thing here
    await element(by.text("NEW USER")).tap();

    const email = element(by.id('Email-Input'));
    const pw = element(by.id('Password-Input'));

    await email.replaceText('bobjohnson@gmail.com');
    await pw.replaceText('1234');

    await element(by.text("CREATE ACCOUNT")).tap();

    await expect(element(by.text("This password is too weak, please enter a new one"))).toBeVisible();
    await element(by.text("OK")).tap();
  });

  it ('Email in Use', async () => {
    await element(by.text("NEW USER")).tap();

    const email = element(by.id('Email-Input'));
    const pw = element(by.id('Password-Input'));

    await email.replaceText('meepmoop@gmail.com');
    await pw.replaceText('meepmoop');

    await element(by.text("CREATE ACCOUNT")).tap();

    await expect(element(by.text("Smart Scheduler"))).toBeVisible();
    const wake = element(by.id('Wakeup'));
    const bed = element(by.id('Bedtime'));
    const brfst = element(by.id('Breakfast'));
    const lnch = element(by.id('Lunch'));
    const din = element(by.id('Dinner'));

    await wake.replaceText('7:00');
    await element(by.id('WakeupAM')).tap();

    await bed.replaceText('11:00');
    await element(by.id('BedtimePM')).tap();

    await brfst.replaceText('8:00');
    await element(by.id('BreakfastAM')).tap();

    await lnch.replaceText('12:00');
    await element(by.id('LunchPM')).tap();

    await din.replaceText('6:00');
    await element(by.id('DinnerPM')).tap();

    await element(by.text("SUBMIT")).tap();
    await waitFor(element(by.text("An account already exists with this email"))).toBeVisible().withTimeout(10000);
    await element(by.text("OK")).tap();
  });

  it ('No Dinner AM/PM', async () => {
    await element(by.text("NEW USER")).tap();

    const email = element(by.id('Email-Input'));
    const pw = element(by.id('Password-Input'));

    await email.replaceText('meepitymoop@gmail.com');
    await pw.replaceText('meepitymoop');

    await element(by.text("CREATE ACCOUNT")).tap();

    await expect(element(by.text("Smart Scheduler"))).toBeVisible();
    const wake = element(by.id('Wakeup'));
    const bed = element(by.id('Bedtime'));
    const brfst = element(by.id('Breakfast'));
    const lnch = element(by.id('Lunch'));
    const din = element(by.id('Dinner'));

    await wake.replaceText('7:00');
    await element(by.id('WakeupAM')).tap();

    await bed.replaceText('11:00');
    await element(by.id('BedtimePM')).tap();

    await brfst.replaceText('8:00');
    await element(by.id('BreakfastAM')).tap();

    await lnch.replaceText('12:00');
    await element(by.id('LunchPM')).tap();

    await din.replaceText('6:00');

    await element(by.text("SUBMIT")).tap();
    await expect(element(by.text("Please select AM or PM for Dinner"))).toBeVisible();
    await element(by.text("OK")).tap();
  });

  it ('No Dinner Time', async () => {
    await element(by.text("NEW USER")).tap();

    const email = element(by.id('Email-Input'));
    const pw = element(by.id('Password-Input'));

    await email.replaceText('meepitymoop@gmail.com');
    await pw.replaceText('meepitymoop');

    await element(by.text("CREATE ACCOUNT")).tap();

    await expect(element(by.text("Smart Scheduler"))).toBeVisible();
    const wake = element(by.id('Wakeup'));
    const bed = element(by.id('Bedtime'));
    const brfst = element(by.id('Breakfast'));
    const lnch = element(by.id('Lunch'));
    const din = element(by.id('Dinner'));

    await wake.replaceText('7:00');
    await element(by.id('WakeupAM')).tap();

    await bed.replaceText('11:00');
    await element(by.id('BedtimePM')).tap();

    await brfst.replaceText('8:00');
    await element(by.id('BreakfastAM')).tap();

    await lnch.replaceText('12:00');
    await element(by.id('LunchPM')).tap();

    await element(by.id('DinnerPM')).tap();

    await element(by.text("SUBMIT")).tap();
    await expect(element(by.text("Please enter a time for Dinner"))).toBeVisible();
    await element(by.text("OK")).tap();
  });

  it ('Bad Format Breakfast Time', async () => {
    await element(by.text("NEW USER")).tap();

    const email = element(by.id('Email-Input'));
    const pw = element(by.id('Password-Input'));

    await email.replaceText('meepitymoop@gmail.com');
    await pw.replaceText('meepitymoop');

    await element(by.text("CREATE ACCOUNT")).tap();

    await expect(element(by.text("Smart Scheduler"))).toBeVisible();
    const wake = element(by.id('Wakeup'));
    const bed = element(by.id('Bedtime'));
    const brfst = element(by.id('Breakfast'));
    const lnch = element(by.id('Lunch'));
    const din = element(by.id('Dinner'));

    await wake.replaceText('7:00');
    await element(by.id('WakeupAM')).tap();

    await bed.replaceText('11:00');
    await element(by.id('BedtimePM')).tap();

    await brfst.replaceText('8');
    await element(by.id('BreakfastAM')).tap();

    await lnch.replaceText('12:00');
    await element(by.id('LunchPM')).tap();

    await din.replaceText('6:00');
    await element(by.id('DinnerPM')).tap();

    await element(by.text("SUBMIT")).tap();
    await expect(element(by.text("Please enter a valid time for Breakfast"))).toBeVisible();
    await element(by.text("OK")).tap();
  });

  it ('Bad Format Lunch Hour', async () => {
    await element(by.text("NEW USER")).tap();

    const email = element(by.id('Email-Input'));
    const pw = element(by.id('Password-Input'));

    await email.replaceText('meepitymoop@gmail.com');
    await pw.replaceText('meepitymoop');

    await element(by.text("CREATE ACCOUNT")).tap();

    await expect(element(by.text("Smart Scheduler"))).toBeVisible();
    const wake = element(by.id('Wakeup'));
    const bed = element(by.id('Bedtime'));
    const brfst = element(by.id('Breakfast'));
    const lnch = element(by.id('Lunch'));
    const din = element(by.id('Dinner'));

    await wake.replaceText('7:00');
    await element(by.id('WakeupAM')).tap();

    await bed.replaceText('11:00');
    await element(by.id('BedtimePM')).tap();

    await brfst.replaceText('8:00');
    await element(by.id('BreakfastAM')).tap();

    await lnch.replaceText('13:00');
    await element(by.id('LunchPM')).tap();

    await din.replaceText('6:00');
    await element(by.id('DinnerPM')).tap();

    await element(by.text("SUBMIT")).tap();
    await expect(element(by.text("Please enter a valid time for Lunch"))).toBeVisible();
    await element(by.text("OK")).tap();
  });

  it ('Bad Format Lunch Minutes', async () => {
    await element(by.text("NEW USER")).tap();

    const email = element(by.id('Email-Input'));
    const pw = element(by.id('Password-Input'));

    await email.replaceText('meepitymoop@gmail.com');
    await pw.replaceText('meepitymoop');

    await element(by.text("CREATE ACCOUNT")).tap();

    await expect(element(by.text("Smart Scheduler"))).toBeVisible();
    const wake = element(by.id('Wakeup'));
    const bed = element(by.id('Bedtime'));
    const brfst = element(by.id('Breakfast'));
    const lnch = element(by.id('Lunch'));
    const din = element(by.id('Dinner'));

    await wake.replaceText('7:00');
    await element(by.id('WakeupAM')).tap();

    await bed.replaceText('11:00');
    await element(by.id('BedtimePM')).tap();

    await brfst.replaceText('8:00');
    await element(by.id('BreakfastAM')).tap();

    await lnch.replaceText('12:60');
    await element(by.id('LunchPM')).tap();

    await din.replaceText('6:00');
    await element(by.id('DinnerPM')).tap();

    await element(by.text("SUBMIT")).tap();
    await expect(element(by.text("Please enter a valid time for Lunch"))).toBeVisible();
    await element(by.text("OK")).tap();
  });

  it ('Lunchtime Not a Number', async () => {
    await element(by.text("NEW USER")).tap();

    const email = element(by.id('Email-Input'));
    const pw = element(by.id('Password-Input'));

    await email.replaceText('meepitymoop@gmail.com');
    await pw.replaceText('meepitymoop');

    await element(by.text("CREATE ACCOUNT")).tap();

    await expect(element(by.text("Smart Scheduler"))).toBeVisible();
    const wake = element(by.id('Wakeup'));
    const bed = element(by.id('Bedtime'));
    const brfst = element(by.id('Breakfast'));
    const lnch = element(by.id('Lunch'));
    const din = element(by.id('Dinner'));

    await wake.replaceText('7:00');
    await element(by.id('WakeupAM')).tap();

    await bed.replaceText('11:00');
    await element(by.id('BedtimePM')).tap();

    await brfst.replaceText('8:00');
    await element(by.id('BreakfastAM')).tap();

    await lnch.replaceText('abcd');
    await element(by.id('LunchPM')).tap();

    await din.replaceText('6:00');
    await element(by.id('DinnerPM')).tap();

    await element(by.text("SUBMIT")).tap();
    await expect(element(by.text("Please enter a valid time for Lunch"))).toBeVisible();
    await element(by.text("OK")).tap();
  });


});
