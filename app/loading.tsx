import StateShell from "@/components/states/StateShell";

export default function Loading() {
  return (
    <StateShell
      icon="◌"
      eyebrow="Loading"
      title="Preparing Uniqe"
      description="Please wait while the next experience is being prepared."
    />
  );
}