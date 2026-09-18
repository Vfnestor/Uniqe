"use client";

type AdminLoadingProps = {
  rows?: number;
};

export default function AdminLoading({
  rows = 5,
}: AdminLoadingProps) {
  return (
    <div
      className="admin-loading"
      aria-busy="true"
      aria-label="Loading"
    >
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="admin-loading-row"
        >
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}