type RegistrationPasswordHintProps = {
  passwordLength: number;
};

export default function RegistrationPasswordHint({
  passwordLength,
}: RegistrationPasswordHintProps) {
  const valid =
    passwordLength >= 8 &&
    passwordLength <= 128;

  return (
    <small
      className={
        valid
          ? "auth-password-hint auth-password-hint-valid"
          : "auth-password-hint"
      }
    >
      رمز عبور باید بین ۸ تا ۱۲۸ نویسه باشد.
    </small>
  );
}