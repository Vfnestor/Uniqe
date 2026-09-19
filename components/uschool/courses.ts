import type { USchoolClass } from "./admin-courses";
import { uschoolAdminClasses } from "./admin-courses";

export type USchoolCatalogClass = USchoolClass;

export const uschoolCatalogClasses: USchoolCatalogClass[] =
  uschoolAdminClasses.filter(
    (item) => item.status === "published",
  );

export const uschoolCategories = Array.from(
  new Set(
    uschoolCatalogClasses.map(
      (item) => item.category,
    ),
  ),
);

export function getUSchoolCatalogClass(id: string) {
  return uschoolCatalogClasses.find(
    (item) => item.id === id,
  );
}