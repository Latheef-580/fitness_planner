export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function required(value) {
  return value != null && String(value).trim().length > 0;
}

export function minLength(value, length) {
  return value != null && String(value).trim().length >= length;
}
