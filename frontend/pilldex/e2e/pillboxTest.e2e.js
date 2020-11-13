describe('Pillbox Tests', () => {
  
    it ('Login with user', async () => {
    
      const email = element(by.id('Email-Input-Login'));
      const pw = element(by.id('Password-Input-Login'));
  
      await email.replaceText('testuser6@gmail.com');
      await pw.replaceText('testuser6');
  
      await element(by.text("SIGN IN")).tap();
      await waitFor(element(by.text("My Pilldex"))).toBeVisible().withTimeout(10000);
    });

    it ('Creates a pill', async () => {  

        await element(by.text("NEW PILL")).tap();
        await waitFor(element(by.text("New Prescription"))).toBeVisible().withTimeout(10000);
        await element(by.text("MANUAL")).tap();
        await waitFor(element(by.text("VERIFY"))).toBeVisible().withTimeout(10000);

        await element(by.id('Medication-Name')).replaceText('TestMed');
        await element(by.id('Units-Refill')).replaceText('10');
        await element(by.id('Units-Dosage')).replaceText('1');
        await element(by.id('Units-Frequency')).replaceText('2');
        await element(by.id('Daily')).tap();
        await element(by.id('Sleep-No')).tap();
        await element(by.id('Food-Yes')).tap();

        await element(by.text('VERIFY')).tap();
        await waitFor(element(by.text("My Pilldex"))).toBeVisible().withTimeout(10000);

        
        await element(by.id("Refresh")).tap();
        await waitFor(element(by.text("TestMed"))).toBeVisible().withTimeout(10000);
    });

    it ('Gets to the pillbox screen', async () => {  
        await element(by.text("Pillbox")).tap();
        await waitFor(element(by.text("Patient's Pillbox"))).toBeVisible().withTimeout(10000);
    });

    it ('Fetches the pill from the database', async () => {  
        await element(by.id("Refresh")).tap();
        await waitFor(element(by.text("TestMed"))).toBeVisible().withTimeout(10000);
    });

    it ('Fetches more information about a pill', async () => {  
        await element(by.text("More Details")).tap();
        await waitFor(element(by.text("Take with food."))).toBeVisible().withTimeout(10000);
    });

    it ('Refills the info screen', async () => {  
        await element(by.text("REFILL")).tap();
        await waitFor(element(by.text("20"))).toBeVisible().withTimeout(10000);
    });

    it ('Refills the pillbox', async () => {  
        await element(by.text("BACK")).tap();
        await element(by.id("Refresh")).tap();
        await waitFor(element(by.text("20"))).toBeVisible().withTimeout(10000);
    });

    it ('Deletes a pill', async () => {  
        await element(by.text("Delete-Pill")).tap();
        await waitFor(element(by.text("20"))).toNotExist().withTimeout(10000);
    });

    
});