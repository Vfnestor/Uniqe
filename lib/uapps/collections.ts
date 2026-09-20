import type {
  UApp,
} from "@/lib/uapps/types";

export type UAppCollection = {
  id: string;
  title: string;
  description: string;
  icon: string;
  apps: UApp[];
};

export function createCollection(
  id: string,
  title: string,
  description: string,
  icon: string,
  apps: UApp[],
): UAppCollection {
  return {
    id,
    title,
    description,
    icon,
    apps,
  };
}