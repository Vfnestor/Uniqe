export type MyUProductArea =
  | "uweb"
  | "ushop"
  | "uservice"
  | "uschool"
  | "uapps";

export type MyUProductStatus =
  | "active"
  | "coming_soon";

export type MyUProduct = {
  id: MyUProductArea;
  name: string;
  title: string;
  description: string;
  status: MyUProductStatus;
  href: string;
  icon: string;
};

export type MyUNavigationItem = {
  id: string;
  title: string;
  href: string;
  icon: string;
  area?: MyUProductArea;
};