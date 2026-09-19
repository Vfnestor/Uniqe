import "@/components/my/my-u.css";
import "@/components/my/my-u-core.css";

import MyUCoreLayout from "@/components/my/MyUCoreLayout";
import MyUFavorites from "@/components/my/MyUFavorites";

import {
  getMyUFavorites,
} from "@/lib/my-u/core-data";

export default function MyFavoritesPage() {
  const favorites =
    getMyUFavorites();

  return (
    <MyUCoreLayout
      eyebrow="MY U / FAVORITES"
      title="علاقه‌مندی‌های من"
      description="پروژه‌ها، خدمات و سایر موارد مورد علاقه شما در این بخش نگهداری می‌شوند."
      active="favorites"
    >
      <MyUFavorites
        favorites={favorites}
      />
    </MyUCoreLayout>
  );
}