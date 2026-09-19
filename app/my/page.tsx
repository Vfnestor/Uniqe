import "@/components/my/my-u.css";

import MyU from "@/components/my/MyU";

import {
  myUProducts,
} from "@/lib/my-u/products";

export default function MyUPage() {
  return (
    <MyU
      products={myUProducts}
    />
  );
}