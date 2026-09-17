import type {
  EcosystemLayer,
} from "@/lib/data";

export type NavigationItem = {
  id: string;

  label: string;

  href: string;

  layer?: EcosystemLayer;

  icon?: string;

  description?: string;

  external?: boolean;

  visible?: boolean;

  order: number;
};

export type NavigationGroup = {
  id: string;

  label: string;

  items: NavigationItem[];

  order: number;
};

export type NavigationMenu = {
  id: string;

  name: string;

  groups: NavigationGroup[];
};