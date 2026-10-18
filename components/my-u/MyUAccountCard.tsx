import type {
  AccountResponse,
} from "@/lib/api/account";

type MyUAccountCardProps = {
  account: AccountResponse | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
};

function getInitials(name: string): string {
  const normalized = name.trim();

  if (!normalized) {
    return "U";
  }

  return normalized
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function formatRole(role: string): string {
  switch (role.toLowerCase()) {
    case "owner":
      return "Owner";

    case "admin":
      return "Administrator";

    case "user":
      return "Member";

    default:
      return role;
  }
}

export default function MyUAccountCard({
  account,
  isLoading,
  error,
  onRetry,
}: MyUAccountCardProps) {
  if (isLoading) {
    return (
      <section
        className="my-u-profile-card my-u-account-card"
        aria-label="Loading account"
        aria-busy="true"
      >
        <div className="my-u-account-loading-avatar" />

        <div className="my-u-account-loading-lines">
          <span />
          <span />
          <span />
        </div>

        <p className="my-u-account-muted">
          Loading your account...
        </p>
      </section>
    );
  }

  if (error || !account) {
    return (
      <section
        className="my-u-profile-card my-u-account-card"
        aria-label="Account information"
      >
        <div className="my-u-account-avatar">
          U
        </div>

        <span className="my-u-profile-eyebrow">
          Personal Space
        </span>

        <h3 className="my-u-account-heading">
          Your account
        </h3>

        <p className="my-u-account-muted">
          {error ||
            "Account information is currently unavailable."}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="my-u-account-retry"
        >
          Try again
        </button>

        <a
          href="/my-u/settings"
          className="my-u-account-settings-link"
        >
          Account settings ↗
        </a>
      </section>
    );
  }

  const { user, profile } = account;

  const displayName =
    profile?.displayName?.trim() || user.name;

  const avatarUrl =
    profile?.avatarUrl || user.avatarUrl;

  return (
    <section
      className="my-u-profile-card my-u-account-card"
      aria-label="Your account"
    >
      <div className="my-u-profile-top">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="my-u-account-avatar my-u-account-avatar-image"
          />
        ) : (
          <div className="my-u-account-avatar">
            {getInitials(displayName)}
          </div>
        )}

        <span className="my-u-profile-label">
          Personal Space
        </span>
      </div>

      <div className="my-u-profile-content my-u-account-content">
        <span className="my-u-profile-eyebrow">
          Welcome to My U
        </span>

        <h3 className="my-u-account-heading">
          {displayName}
        </h3>

        <p className="my-u-account-email">
          {user.email}
        </p>

        {profile?.bio && (
          <p className="my-u-account-bio">
            {profile.bio}
          </p>
        )}

        <div className="my-u-account-badges">
          <span className="my-u-account-badge">
            {formatRole(user.role)}
          </span>

          <span
            className={`my-u-account-badge my-u-account-status-${user.status}`}
          >
            {user.status}
          </span>
        </div>
      </div>

      <div className="my-u-profile-footer">
        <span>
          {profile
            ? `Profile language: ${profile.language.toUpperCase()}`
            : "Your profile has not been configured yet."}
        </span>

        <a
          href="/my-u/settings"
          className="my-u-account-settings-link"
        >
          Edit account settings ↗
        </a>
      </div>
    </section>
  );
}