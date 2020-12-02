describe('Add Pill Test', () => {

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

    it ('Launches the Camera module', async () => {
        await element(by.text("NEW PILL")).tap();
        await waitFor(element(by.text("New Prescription"))).toBeVisible().withTimeout(30000);
    });

    it ('Should take a picture', async () => {
        await element(by.text("CONFIRM")).tap();
        await waitFor(element(by.text("VERIFY"))).toBeVisible().withTimeout(60000);
    });

    it ('Catches missing information', async () => {
        await element(by.id('Medication-Name')).replaceText('TestMed');
        await element(by.id('Units-Refill')).replaceText('a');
        await element(by.id('Units-Dosage')).replaceText('1');
        await element(by.id('Units-Frequency')).replaceText('2');
        await element(by.id('Daily')).tap();
        await element(by.id('Sleep-Yes')).tap();
        await element(by.id('Food-Yes')).tap();

        await element(by.text('VERIFY')).tap();
        await expect(element(by.text("Please enter a valid number of units for refill field"))).toBeVisible();
        await element(by.text('OK')).tap();
    });


    it ('Catches NaN input for frequency', async () => {
        await element(by.id('Units-Refill')).replaceText('10');
        await element(by.id('Units-Frequency')).replaceText('a');

        await element(by.text('VERIFY')).tap();
        await expect(element(by.text("Please enter a valid number of units for frequency field"))).toBeVisible();
        await element(by.text('OK')).tap();
    });

    it ('Catches missing medication name', async () => {
        await element(by.id('Units-Frequency')).replaceText('1');
        await element(by.id('Medication-Name')).replaceText("");

        await element(by.text('VERIFY')).tap();
        await expect(element(by.text("Please enter a valid medication name"))).toBeVisible();
        await element(by.text('OK')).tap();
    });

    it ('Accepts valid information', async () => {
        await element(by.id('Medication-Name')).replaceText("TestPill");

        await element(by.text('VERIFY')).tap();
        await waitFor(element(by.text("My Pilldex"))).toBeVisible().withTimeout(30000);
    });


});
