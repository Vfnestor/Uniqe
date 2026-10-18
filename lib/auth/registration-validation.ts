export type RegistrationInput = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export function validateRegistration(
  input: RegistrationInput,
): string | null {
  const name = input.name.trim();
  const email = input.email.trim();
  const password = input.password;
  const passwordConfirm =
    input.passwordConfirm;

  if (name.length < 2) {
    return "نام باید حداقل ۲ نویسه داشته باشد.";
  }

  if (name.length > 100) {
    return "نام نمی‌تواند بیشتر از ۱۰۰ نویسه باشد.";
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return "یک نشانی ایمیل معتبر وارد کنید.";
  }

  if (password.length < 8) {
    return "رمز عبور باید حداقل ۸ نویسه داشته باشد.";
  }

  if (password.length > 128) {
    return "رمز عبور بیش از حد طولانی است.";
  }

  if (password !== passwordConfirm) {
    return "رمز عبور و تکرار آن یکسان نیستند.";
  }

  return null;
}