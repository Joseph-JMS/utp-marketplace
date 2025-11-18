export function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export function validateNotEmpty(value) {
  return value.trim() !== "";
}