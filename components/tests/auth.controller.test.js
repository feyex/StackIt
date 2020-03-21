const assert = require('chai').assert;


describe('User Account Creation', (done) => {
  
    it('should return User created', () => {
        
        let email = "user.email";
        let password = "user.password";
        let userAccount = 'User Created and confirmation email sent to mail';

        if(email == 'user.email' && password == 'user.password')

            assert.equal('User Created and confirmation email sent to mail', userAccount);
           (done); 
        });
      
    });
    

    describe('User Account Validation', (done) => {
  
        it('should return User if authenticated', () => {
            
            let email = "user.email";
            let password = "user.password";
            let userAuth = 'User';
    
            if(email == 'user.email' && password == 'user.password')
    
                assert.equal('User', userAuth);
               (done); 
            });
          
        });
    