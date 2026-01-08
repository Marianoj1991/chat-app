import { IFormState } from "../types/auth"

export default function validateSignUpForm(formData: IFormState) {
  const errors: Partial<IFormState> = {}
  if (!formData?.fullName?.trim()) errors.fullName = 'Full name is required'
  if (!formData.email.trim()) errors.email = 'Email is required'
  if (!/\S+@\S+\.\S+/.test(formData.email))
    errors.email = 'Invalid email format'
  if (formData.password.length < 8)
    errors.password = 'Password must be at least 8 characters'
  return errors
}
