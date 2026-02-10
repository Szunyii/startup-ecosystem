import { Button } from "./ui/button";

function CategoryCard({ type }: { type: string }) {
  return (
    <Button className="rounded-2xl border px-2 bg-transparent border-primary">
      <p className="text-xs text-white">{type}</p>
    </Button>
  );
}

export default CategoryCard;
