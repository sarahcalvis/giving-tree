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

  describe('Validate name', () => {
    it('empty name', () => {
      expect(validateField('name', '')).toBe('*Please enter a name.');
    });
    
    it('good name', () => {
      expect(validateField('name', "Good name")).toBe('');
    }); 
  })

  describe('Validate fname_contact', () => {
    it('empty name', () => {
      expect(validateField('fname_contact', '')).toBe('*Please enter a name.');
    });
    
    it('good name', () => {
      expect(validateField('fname_contact', "Good name")).toBe('');
    }); 
  })

  describe('Validate lname_contact', () => {
    it('empty name', () => {
      expect(validateField('lname_contact', '')).toBe('*Please enter a name.');
    });
    
    it('good name', () => {
      expect(validateField('lname_contact', "Good name")).toBe('');
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
        expect(validateField('date_deadline', (new Date() - 100)/1000 )).toBe('*Please choose a deadline that is in the future.');
      });
    
    it('good date', () => {
      expect(validateField('date_deadline', "Good date")).toBe('');
    }); 
  })

  describe('Validate goal', () => {
    it('empty goal', () => {
      expect(validateField('goal_amt', '')).toBe('*Please enter a goal amount.');
    });

    it('bad goal', () => {
        expect(validateField('goal_amt', "y")).toBe('*Please enter a valid money amount.');
      });
    
    it('negative goal', () => {
      expect(validateField('goal_amt', -10)).toBe('*Goal must be positive.');
    });
    
    it('good goal', () => {
        expect(validateField('goal_amt', "100")).toBe('');
      });
  })
 
  describe('Validate email', () => {
    it('empty email', () => {
      expect(validateField('email', '')).toBe("*Please enter your email.");
    });

    it('old date', () => {
        expect(validateField('email', "aaa" )).toBe("*Please enter a valid email.");
      });
    
    it('good email', () => {
      expect(validateField('email', "a@a.com")).toBe('');
    }); 
  })

  describe('Validate personal email', () => {
    it('empty email', () => {
      expect(validateField('personal_email', '')).toBe("*Please enter your email.");
    });

    it('old date', () => {
        expect(validateField('personal_email', "aaa" )).toBe("*Please enter a valid email.");
      });
    
    it('good email', () => {
      expect(validateField('personal_email', "a@a.com")).toBe('');
    }); 
  })

  describe('Validate public email', () => {
    it('empty email', () => {
      expect(validateField('public_email', '')).toBe("*Please enter your email.");
    });

    it('old date', () => {
        expect(validateField('public_email', "aaa" )).toBe("*Please enter a valid email.");
      });
    
    it('good email', () => {
      expect(validateField('public_email', "a@a.com")).toBe('');
    }); 
  })

  describe('Validate number', () => {
    it('empty number', () => {
      expect(validateField('number', '')).toBe("*Please enter your phone number.");
    });

    it('bad number', () => {
        expect(validateField('number', "7" )).toBe("*Please enter a valid phone number.");
      });
    
    it('good number', () => {
      expect(validateField('number', "(757)744-3516")).toBe('');
    }); 
  })

  describe('Validate personal_phone', () => {
    it('empty personal_phone', () => {
      expect(validateField('personal_phone', '')).toBe("*Please enter your phone number.");
    });

    it('bad personal_phone', () => {
        expect(validateField('personal_phone', "7" )).toBe("*Please enter a valid phone number.");
      });
    
    it('good personal_phone', () => {
      expect(validateField('personal_phone', "(757)744-3516")).toBe('');
    }); 
  })

  describe('Validate public_phone', () => {
    it('empty public_phone', () => {
      expect(validateField('public_phone', '')).toBe("*Please enter your phone number.");
    });

    it('bad public_phone', () => {
        expect(validateField('public_phone', "7" )).toBe("*Please enter a valid phone number.");
      });
    
    it('good public_phone', () => {
      expect(validateField('public_phone', "(757)744-3516")).toBe('');
    }); 
  })

  describe('Validate url', () => {
    it('empty url', () => {
      expect(validateField('url', '')).toBe("*Please enter the foundation website URL.");
    });

    it('bad url', () => {
        expect(validateField('url', "7" )).toBe("*Please enter a valid URL.");
      });
    
    it('good url', () => {
      expect(validateField('url', "https://github.com/sarahcalvis/giving-tree/pull/24")).toBe('');
    }); 
  })

  describe('Validate foundation_url', () => {
    it('empty url', () => {
      expect(validateField('foundation_url', '')).toBe("*Please enter the foundation website URL.");
    });

    it('bad url', () => {
        expect(validateField('foundation_url', "7" )).toBe("*Please enter a valid URL.");
      });
    
    it('good url', () => {
      expect(validateField('foundation_url', "https://github.com/sarahcalvis/giving-tree/pull/24")).toBe('');
    }); 
  })
