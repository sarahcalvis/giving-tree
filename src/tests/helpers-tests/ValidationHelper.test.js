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
      expect(validateField({name:'title', value: ''})).toBe('*Please enter a grant title.');
    });

    it('mega length too long title', () => {
        expect(validateField({name:'title', title: "abavavaavavadavacabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcc"})).toBe('*Grant title must be less than 60 characters.');
      }); 
    
    it('good title', () => {
      expect(validateField({name:'title', value: {title: "Good Title"}})).toBe('');
    }); 
  })

  describe('Validate Description', () => {
    it('empty desc', () => {
      expect(validateField({name:'desc', value: ''})).toBe('*Please enter a grant description.');
    });
    
    it('good desc', () => {
      expect(validateField({name:'desc', value: "Good Desc"})).toBe('');
    }); 
  })

  describe('Validate nonProfit name', () => {
    it('empty name', () => {
      expect(validateField({name:'nonprofit_name', value: ''})).toBe('*Please select a nonprofit or add a new one.');
    });
    
    it('good name', () => {
      expect(validateField({name:'nonprofit_name', value: "Good name"})).toBe('');
    }); 
  })

  describe('Validate address', () => {
    it('empty name', () => {
      expect(validateField({name:'nonprofit_name', value: ''})).toBe('*Please select a nonprofit or add a new one.');
    });
    
    it('good name', () => {
      expect(validateField({name:'nonprofit_name', value: "Good name"})).toBe('');
    }); 
  })
 