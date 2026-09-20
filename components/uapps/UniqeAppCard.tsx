import type {
  UniqeApp,
} from "@/lib/uapps/uniqe-apps";

import UniversalAppCard from "./UniversalAppCard";

type Props = {
  app: UniqeApp;
};

export default function UniqeAppCard({
  app,
}: Props) {
  return <UniversalAppCard app={app} />;
}