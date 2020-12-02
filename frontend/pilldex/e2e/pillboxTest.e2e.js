describe('Pillbox Tests', () => {

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

    it ('Creates a pill', async () => {

        await element(by.text("NEW PILL")).tap();
        await waitFor(element(by.text("New Prescription"))).toBeVisible().withTimeout(30000);
        await element(by.text("MANUAL")).tap();
        await waitFor(element(by.text("VERIFY"))).toBeVisible().withTimeout(30000);

        await element(by.id('Medication-Name')).replaceText('TestMed');
        await element(by.id('Units-Refill')).replaceText('10');
        await element(by.id('Units-Dosage')).replaceText('1');
        await element(by.id('Units-Frequency')).replaceText('2');
        await element(by.id('Daily')).tap();
        await element(by.id('Sleep-No')).tap();
        await element(by.id('Food-Yes')).tap();

        await element(by.text('VERIFY')).tap();
        await waitFor(element(by.text("My Pilldex"))).toBeVisible().withTimeout(30000);


        await element(by.id("Refresh")).tap();
        await waitFor(element(by.text("TestMed"))).toBeVisible().withTimeout(30000);
    });

    it ('Gets to the pillbox screen', async () => {
        await element(by.text("Pillbox")).tap();
        await waitFor(element(by.text("Patient's Pillbox"))).toBeVisible().withTimeout(30000);
    });

    it ('Fetches the pill from the database', async () => {
        await element(by.id("Refresh")).tap();
        await waitFor(element(by.text("TestMed"))).toBeVisible().withTimeout(30000);
    });

    it ('Fetches more information about a pill', async () => {
        await element(by.text("More Details")).tap();
        await waitFor(element(by.text("Take with food."))).toBeVisible().withTimeout(30000);
    });

    it ('Refills the info screen', async () => {
        await element(by.text("REFILL")).tap();
        await waitFor(element(by.text("20"))).toBeVisible().withTimeout(30000);
    });

    it ('Refills the pillbox', async () => {
        await element(by.text("BACK")).tap();
        await element(by.id("Refresh")).tap();
        await waitFor(element(by.text("20"))).toBeVisible().withTimeout(30000);
    });

    it ('Deletes a pill', async () => {
        await element(by.text("Delete-Pill")).tap();
        await waitFor(element(by.text("TestMed"))).toNotExist().withTimeout(30000);
    });


});
