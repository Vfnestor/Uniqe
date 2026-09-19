import "@/components/my/my-uweb.css";

import MyUWeb from "@/components/my/MyUWeb";

import {
  getMyUWebDashboard,
} from "@/lib/my-u/my-uweb-data";

export default function MyUWebPage() {
  const data =
    getMyUWebDashboard();

  return (
    <MyUWeb
      data={data}
    />
  );
}