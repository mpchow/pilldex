describe('Add Pill Test', () => {
  
    it ('Login with user', async () => {
  
      const email = element(by.id('Email-Input-Login'));
      const pw = element(by.id('Password-Input-Login'));
  
      await email.replaceText('testuser6@gmail.com');
      await pw.replaceText('testuser6');
  
      await element(by.text("SIGN IN")).tap();
      await expect(element(by.text("My Pilldex"))).toBeVisible();
    });

    it ('Launches the Camera module', async () => {  
        await element(by.text("NEW PILL")).tap();
        await expect(element(by.text("New Prescription"))).toBeVisible();
    });

    it ('Launches the Camera module', async () => {  
        await element(by.text("NEW PILL")).tap();
        await expect(element(by.text("New Prescription"))).toBeVisible();
    });

    it ('Should take a picture', async () => {  
        await element(by.text("CONFIRM")).tap();
        await expect(element(by.text("1 - Medication Name"))).toBeVisible();
    });

    it ('Catches missing information', async () => {  
        await element(by.id('Medication-Name')).replaceText('TestMed');
        await element(by.id('Units-Refill')).replaceText('10');
        await element(by.id('Units-Dosage')).replaceText('1');
        await element(by.id('Units-Frequency')).replaceText('2');
        await element(by.id('Daily')).tap();
        await element(by.id('Sleep-Yes')).tap();

        await element(by.text('Verify')).tap();
        await expect(element(by.text("Make a selection for food field"))).toBeVisible();
        await element(by.text('OK')).tap();
    });
    
    it ('Catches NaN input for refill', async () => {  
        await element(by.id('Food-Yes')).tap();
        await element(by.id('Units-Refill')).replaceText('a');

        await element(by.text('Verify')).tap();
        await expect(element(by.text("Please enter a valid number of units for refill field"))).toBeVisible();
        await element(by.text('OK')).tap();
    });

    it ('Catches NaN input for frequency', async () => {  
        await element(by.id('Units-Refill')).replaceText('10');
        await element(by.id('Units-Frequency')).replaceText('a');

        await element(by.text('Verify')).tap();
        await expect(element(by.text("Please enter a valid number of units for frequency field"))).toBeVisible();
        await element(by.text('OK')).tap();
    });

    it ('Catches missing medication name', async () => {  
        await element(by.id('Units-Frequency')).replaceText('1');
        await element(by.id('Medication-Name')).replaceText("");

        await element(by.text('Verify')).tap();
        await expect(element(by.text("Please enter a valid medication name"))).toBeVisible();
        await element(by.text('OK')).tap();
    });

    it ('Accepts valid information', async () => {
        await element(by.id('Medication-Name')).replaceText("TestPill");

        await element(by.text('Verify')).tap();
        await expect(element(by.text("My Pilldex"))).toBeVisible();
    });

    
});
  