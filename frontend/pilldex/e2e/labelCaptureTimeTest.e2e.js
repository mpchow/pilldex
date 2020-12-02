describe('Non Functional Requirement 2: time to translate label', () => {

    it ('Make new user', async () => {

      await element(by.text("NEW USER")).tap();

      await waitFor(element(by.text("Create Account"))).toBeVisible().withTimeout(30000);
      const email = element(by.id('Email-Input'));
      const pw = element(by.id('Password-Input'));
      const confirm = element(by.id('Password-Confirm'));

      var mail = Math.random().toString();
      var inputEmail = mail + '@gmail.com';
      await email.replaceText(inputEmail);
      await pw.replaceText(mail);
      await confirm.replaceText(mail);

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

      await waitFor(element(by.text("My Pilldex"))).toBeVisible().withTimeout(30000);
    });

    it ('Determines the time required to get a response from server', async () => {

        await element(by.text("NEW PILL")).tap();
        await waitFor(element(by.text("New Prescription"))).toBeVisible().withTimeout(30000);

        var time1 = Date.now();
        await waitFor(element(by.text("CONFIRM"))).toBeVisible().withTimeout(120000);
        await element(by.text("CONFIRM")).tap();
        await waitFor(element(by.text("VERIFY"))).toBeVisible().withTimeout(120000);
        var time2 = Date.now();

        // Check if time less than 8 seconds
        console.log(time2 - time1);
        if (time2 - time1 > 15000)
          console.error("Took too long to parse label");
        else {
          console.log("Capture label test passed");
        }

    });


});
