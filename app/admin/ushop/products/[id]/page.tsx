"use client";

import { useParams } from "next/navigation";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminProductForm from "@/components/admin/AdminProductForm";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function EditProductPage() {
  const params = useParams();

  const { language } = useLanguage();

  const fa = language === "fa";

  return (
    <div className="admin-module-page">
      <AdminPageHeader
        eyebrow="USHOP / PRODUCTS / EDIT"
        title={
          fa
            ? "ویرایش محصول"
            : "Edit Product"
        }
        description={
          fa
            ? `ویرایش محصول ${String(params.id)}`
            : `Edit product ${String(params.id)}`
        }
      />

      <AdminProductForm mode="edit" />
    </div>
  );
}