type ApiStatusProps = {
  connected?: boolean;
};

export default function ApiStatus({
  connected = false,
}: ApiStatusProps) {
  return (
    <div className="api-status">
      <span
        className={`api-status-indicator ${
          connected
            ? "is-connected"
            : "is-disconnected"
        }`}
      />

      <div className="api-status-content">
        <strong>
          Central API
        </strong>

        <span>
          {connected
            ? "Connected"
            : "Backend not connected"}
        </span>
      </div>
    </div>
  );
}
