import Container from "@/components/ui/Container";

import type {
  UWebContract,
  UWebProject,
} from "@/lib/uweb/types";

import UWebContractStatus from "./UWebContractStatus";
import UWebContractParties from "./UWebContractParties";
import UWebContractSignature from "./UWebContractSignature";

type Props = {
  contract: UWebContract;
  project: UWebProject;
};

export default function UWebContractViewer({
  contract,
  project,
}: Props) {
  return (
    <section className="uweb-contract-page">
      <Container>
        <header className="uweb-contract-header">
          <div>
            <span className="section-eyebrow">
              UWeb Contract
            </span>

            <div className="uweb-contract-number">
              {project.projectNumber}
            </div>

            <h1>
              {contract.title}
            </h1>

            <p>
              قرارداد پروژه{" "}
              <strong>
                {project.title}
              </strong>
            </p>
          </div>

          <UWebContractStatus
            status={contract.status}
          />
        </header>

        <div className="uweb-contract-layout">
          <main>
            <UWebContractParties
              parties={
                contract.parties
              }
            />

            <section className="uweb-contract-document">
              <div className="uweb-contract-section-heading">
                <span className="section-eyebrow">
                  Contract Document
                </span>

                <h2>
                  متن قرارداد
                </h2>
              </div>

              <div className="uweb-contract-document-meta">
                <span>
                  نسخه {contract.version}
                </span>

                <span>
                  نوع قرارداد: سه‌طرفه
                </span>
              </div>

              <article className="uweb-contract-document-content">
                <h3>
                  {contract.title}
                </h3>

                <p>
                  این قرارداد در چارچوب
                  پلتفرم UWeb برای اجرای
                  پروژه موردنظر ایجاد شده
                  است.
                </p>

                <h4>
                  موضوع قرارداد
                </h4>

                <p>
                  موضوع این قرارداد اجرای
                  پروژه «
                  {project.title}
                  » مطابق مشخصات، نیازمندی‌ها
                  و توافقات ثبت‌شده در UWeb
                  است.
                </p>

                <h4>
                  طرفین قرارداد
                </h4>

                <ul>
                  <li>
                    کارفرما: صاحب پروژه
                  </li>

                  <li>
                    متخصص: مجری پروژه
                  </li>

                  <li>
                    UWeb / مدیریت: ناظر
                    و مدیریت فرآیند پروژه
                  </li>
                </ul>

                <h4>
                  محدوده پروژه
                </h4>

                <p>
                  محدوده اجرای پروژه بر اساس
                  نیازمندی‌های ثبت‌شده در
                  پروژه تعیین می‌شود و هرگونه
                  تغییر اساسی باید در سیستم
                  پروژه ثبت و تأیید شود.
                </p>

                <h4>
                  مسئولیت اجرای پروژه
                </h4>

                <p>
                  مسئولیت اجرای فنی و تحویل
                  خروجی پروژه بر عهده متخصص
                  انتخاب‌شده است.
                </p>

                <h4>
                  تحویل و بازبینی
                </h4>

                <p>
                  خروجی پروژه از طریق فضای
                  کاری UWeb تحویل داده می‌شود
                  و کارفرما می‌تواند مطابق
                  فرآیند پروژه درخواست اصلاح
                  یا تأیید نهایی ثبت کند.
                </p>

                <h4>
                  وضعیت قرارداد
                </h4>

                <p>
                  این قرارداد تا زمانی که
                  امضاهای موردنیاز تکمیل نشده
                  باشد، در وضعیت انتظار امضا
                  قرار دارد.
                </p>

                <div className="uweb-contract-demo-notice">
                  نسخه فعلی رابط قرارداد یک
                  نمونه عملیاتی اولیه است و
                  جایگزین قرارداد حقوقی نهایی
                  نیست.
                </div>
              </article>
            </section>

            <UWebContractSignature
              contract={contract}
            />
          </main>

          <aside className="uweb-contract-sidebar">
            <div className="uweb-contract-sidebar-card">
              <span>
                پروژه
              </span>

              <strong>
                {project.projectNumber}
              </strong>

              <p>
                {project.title}
              </p>
            </div>

            <div className="uweb-contract-sidebar-card">
              <span>
                وضعیت
              </span>

              <UWebContractStatus
                status={contract.status}
              />
            </div>

            <div className="uweb-contract-sidebar-card">
              <span>
                آخرین بروزرسانی
              </span>

              <strong>
                {new Date(
                  contract.updatedAt,
                ).toLocaleDateString(
                  "fa-IR",
                )}
              </strong>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}