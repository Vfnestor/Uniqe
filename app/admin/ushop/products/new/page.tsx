"use client";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminProductForm from "@/components/admin/AdminProductForm";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function NewProductPage() {
  const { language } = useLanguage();

  const fa = language === "fa";

  return (
    <div className="admin-module-page">
      <AdminPageHeader
        eyebrow="USHOP / PRODUCTS / NEW"
        title={
          fa
            ? "افزودن محصول"
            : "Add Product"
        }
        description={
          fa
            ? "یک محصول جدید برای فروشگاه UShop ایجاد کنید."
            : "Create a new product for the UShop marketplace."
        }
      />

      <AdminProductForm />
    </div>
  );
}