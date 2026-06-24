import SectionOverview from "@/components/ui/SectionOverview";

export const metadata = {
  title: "Operations on lists — loop",
  description:
    "How lists are really stored, why list_2 = list_1 shares one list, and the tools that follow: slices, negative indices, and the in operator.",
};

export default function ListOpsOverview() {
  return <SectionOverview slug="list-ops" />;
}
