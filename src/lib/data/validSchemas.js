import { z } from 'zod';

export const createAccountSchema = z.object({
	username: z.string().min(3, 'Username should have at least 1 character'),
	name: z
		.string()
		.regex(/^[^\d]+$/, 'Name should not contain numbers')
		.min(1, 'Name should have at least 1 character'),
	email: z.string().email(),
	password: z
		.string()
		.min(6, 'Password should have at least 6 characters')
		.regex(/[A-Z]/, 'Password should contain at least one uppercase letter')
});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6, 'Password should have at least 6 characters')
		.regex(/[A-Z]/, 'Password should contain at least one uppercase letter')
});

export const verifyEmailSchema = z.object({
	token: z
		.string()
		.min(6, 'Token must be 6 digits')
		.max(6, 'Token must be 6 digits')
		.regex(/[0-9]/, 'Token should be composed of numbers')
});

export const updatePreferencesSchema = z.object({
	userImage: z.string(),
	username: z.string().min(3, 'Username should have at least 1 character'),
	name: z
		.string()
		.regex(/^[^\d]+$/, 'Name should not contain numbers')
		.min(1, 'Name should have at least 1 character'),
	version: z.string()
});
