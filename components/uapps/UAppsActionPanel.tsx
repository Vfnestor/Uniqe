import Link from "next/link";

export default function UAppsActionPanel() {
  return (
    <section className="uapps-action-panel">
      <div className="uapps-action-content">
        <span className="uapps-eyebrow">
          BUILD WITH UNIQE
        </span>

        <h2>
          نرم‌افزار خودت را بساز
        </h2>

        <p>
          اگر نرم‌افزاری ساخته‌ای، می‌توانی آن را
          برای بررسی و انتشار در اکوسیستم Uniqe
          ارسال کنی؛ یا ساخت نرم‌افزار موردنیازت را
          به Uniqe سفارش بدهی.
        </p>
      </div>

      <div className="uapps-action-buttons">
        <Link
          href="/uapps/build"
          className="uapps-action-primary"
        >
          <span>
            ＋
          </span>
          ساخت نرم‌افزار
        </Link>

        <Link
          href="/uapps/my-apps"
          className="uapps-action-secondary"
        >
          <span>
            ▣
          </span>
          نرم‌افزارهای من
        </Link>

        <Link
          href="/uapps/order"
          className="uapps-action-secondary"
        >
          <span>
            ◇
          </span>
          سفارش ساخت نرم‌افزار
        </Link>

        <Link
          href="/uapps/orders"
          className="uapps-action-secondary"
        >
          <span>
            ◫
          </span>
          سفارش‌های من
        </Link>
      </div>
    </section>
  );
}