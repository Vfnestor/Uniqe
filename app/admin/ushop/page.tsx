"use client";

import Link from "next/link";

import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPanel from "@/components/admin/AdminPanel";

const stats = [
  {
    icon: "📦",
    label: "Products",
    value: "0",
    description: "Total products",
  },
  {
    icon: "🛒",
    label: "Orders",
    value: "0",
    description: "Total orders",
  },
  {
    icon: "💰",
    label: "Revenue",
    value: "0",
    description: "Total revenue",
  },
  {
    icon: "👁️",
    label: "Views",
    value: "0",
    description: "Product views",
  },
];

const navigation = [
  {
    icon: "📦",
    title: "Products",
    description: "Create and manage your products.",
    href: "/admin/ushop/products",
  },
  {
    icon: "🛒",
    title: "Orders",
    description: "View and manage customer orders.",
    href: "/admin/ushop/orders",
  },
  {
    icon: "🏷️",
    title: "Categories",
    description: "Organize products into categories.",
    href: "/admin/ushop/categories",
  },
];

export default function UShopAdminPage() {
  return (
    <div className="admin-module-page">
      <AdminPageHeader
        eyebrow="USHOP"
        title="UShop"
        description="Manage products, orders, categories and the UShop commerce system."
        actions={
          <Link
            href="/admin/ushop/products"
            className="admin-button admin-button-primary"
          >
            <span>＋</span>
            <span>Add Product</span>
          </Link>
        }
      />

      <section className="admin-module-stat-grid">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="admin-module-stat-card"
          >
            <div className="admin-module-stat-icon">
              {stat.icon}
            </div>

            <div className="admin-module-stat-content">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.description}</small>
            </div>
          </div>
        ))}
      </section>

      <section className="admin-module-grid">
        <AdminPanel
          title="UShop Management"
          description="Manage the main areas of your store."
        >
          <div className="admin-module-navigation">
            {navigation.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="admin-module-navigation-item"
              >
                <div className="admin-module-navigation-icon">
                  {item.icon}
                </div>

                <div className="admin-module-navigation-content">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>

                <span className="admin-module-navigation-arrow">
                  →
                </span>
              </Link>
            ))}
          </div>
        </AdminPanel>

        <AdminPanel
          title="Recent Orders"
          description="Latest activity from your store."
        >
          <AdminEmptyState
            icon="🛒"
            title="No orders yet"
            description="Orders will appear here once customers start purchasing products."
          />
        </AdminPanel>
      </section>

      <AdminPanel
        title="Products"
        description="Your latest products will appear here."
      >
        <AdminEmptyState
          icon="📦"
          title="No products yet"
          description="Create your first UShop product to start building your store."
          action={
            <Link
              href="/admin/ushop/products"
              className="admin-button admin-button-primary"
            >
              Add Product
            </Link>
          }
        />
      </AdminPanel>
    </div>
  );
}