describe('Non Functional Requirement 2: time to translate label', () => {
  
    it ('Login with user', async () => {
    
      const email = element(by.id('Email-Input-Login'));
      const pw = element(by.id('Password-Input-Login'));
  
      await email.replaceText('testuser6@gmail.com');
      await pw.replaceText('testuser6');
  
      await element(by.text("SIGN IN")).tap();
      await waitFor(element(by.text("My Pilldex"))).toBeVisible().withTimeout(30000);
    });

    it ('Determines the time required to get a response from server', async () => {  

        await element(by.text("NEW PILL")).tap();
        await waitFor(element(by.text("New Prescription"))).toBeVisible().withTimeout(30000);

        var time1 = Date.now();
        await element(by.text("CONFIRM")).tap();
        await waitFor(element(by.text("VERIFY"))).toBeVisible().withTimeout(60000);
        var time2 = Date.now();
        
        // Check if time less than 8 seconds
        console.assert(time2 - time1 <= 8000);
    });

    
});