import { validateField, confirmMatching } from '../../helpers/ValidationHelper.js';

describe('Validate Passwords', () => {
    it('everything is breakage', () => {
      expect(validateField('passwordOne', 'blah')).toBe('*Password fails the following requirements: a minimum of 8 characters, a number, an uppercase letter, a special character (e.g. !@#$%^&*)');
    });

    it('breakage is not extant', () => {
        expect(validateField('passwordOne', 'abA123$usid')).toBe('');
    }); 
  })

describe('Match Passwords', () => {
  it('not matching passwording', () => {
    expect(confirmMatching('passwordOne', 'blah')).toBe('*Passwords do not match.');
  });

  it('matching passwording', () => {
      expect(validateField('password1', 'password1')).toBe('');
    });
})
 
  describe('Validate Title', () => {
    it('empty title', () => {
      expect(validateField('title',  '')).toBe('*Please enter a grant title.');
    });

    it('mega length too long title', () => {
        expect(validateField('title', "abavavaavavadavacabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcc")).toBe('*Grant title must be less than 60 characters.');
      }); 
    
    it('good title', () => {
      expect(validateField('title', "Good Title")).toBe('');
    }); 
  })

  describe('Validate Description', () => {
    it('empty desc', () => {
      expect(validateField('desc', '')).toBe('*Please enter a grant description.');
    });
    
    it('good desc', () => {
      expect(validateField('desc', "Good Desc")).toBe('');
    }); 
  })

  describe('Validate nonProfit name', () => {
    it('empty name', () => {
      expect(validateField('nonprofit_name', '')).toBe('*Please select a nonprofit or add a new one.');
    });
    
    it('good name', () => {
      expect(validateField('nonprofit_name', "Good name")).toBe('');
    }); 
  })

  describe('Validate address', () => {
    it('empty name', () => {
      expect(validateField('nonprofit_name', '')).toBe('*Please select a nonprofit or add a new one.');
    });
    
    it('good name', () => {
      expect(validateField('nonprofit_name', "Good name")).toBe('');
    }); 
  })
 