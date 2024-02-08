import Image from "next/image";
import ShoppingList from "@/components/shopping-list";
import Compare from "@/components/compare";

export default function Home() {
  return (
    <>
      <ShoppingList />
      <Compare />
    </>
  );
}
