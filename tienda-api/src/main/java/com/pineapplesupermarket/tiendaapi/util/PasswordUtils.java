package com.pineapplesupermarket.tiendaapi.util;

import java.util.Arrays;

import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.LengthRule;
import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.RuleResult;
import org.passay.WhitespaceRule;

public class PasswordUtils {

	public static boolean isValid(String password) {
		PasswordValidator validator = new PasswordValidator(Arrays.asList(
				new LengthRule(8,30),
				new CharacterRule(EnglishCharacterData.UpperCase, 1),
				new CharacterRule(EnglishCharacterData.LowerCase, 4),
				new CharacterRule(EnglishCharacterData.Digit,2),
				new CharacterRule(EnglishCharacterData.Special,1),
				new CharacterRule(EnglishCharacterData.UpperCase,1),
				new WhitespaceRule()			
				));
		
		RuleResult result = validator.validate(new PasswordData(password));
		if(result.isValid()) {
			return true;
		}
		return false;
	}
}
