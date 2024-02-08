import Image from "next/image";
import ShoppingList from "@/components/shopping-list";
import Compare from "@/components/compare";


export default function Home() {
  return (
    <div className="container py-5">
      <ShoppingList />
      <Compare />
    </div>
  );
}
