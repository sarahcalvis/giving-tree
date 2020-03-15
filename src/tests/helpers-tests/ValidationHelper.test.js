import { validateField } from '../../helpers/ValidationHelper.js';

describe('Validate Passwords', () => {
    it('not matching passwording', () => {
      expect(validateField({name:'passwordOne', value:{passwordOne: "abc", passwordTwo: "ABC"}})).toBe('');
    });

    it('matching passwording', () => {
        expect(validateField({name:'passwordOne', value:{passwordOne: "abc", passwordTwo: "abc"}})).toBe('');
      }); 
  })
 
  describe('Validate Title', () => {
    it('empty title', () => {
      expect(validateField('title', '')).toBe('*Please enter a grant title.');
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
    it('empty address', () => {
      expect(validateField('address', '')).toBe('*Please select a grant location.');
    });
    
    it('good address', () => {
      expect(validateField('address', "Good address")).toBe('');
    }); 
  })

  describe('Validate date deadline', () => {
    it('empty date', () => {
      expect(validateField('date_deadline', '')).toBe('*Please select a grant deadline.');
    });

    it('old date', () => {
        expect(validateField('date_deadline', (new Date() - 100)/1000 )).toBe('*Please select a grant deadline.');
      });
    
    it('good date', () => {
      expect(validateField('date_deadline', "Good date")).toBe('');
    }); 
  })
 