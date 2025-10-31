import { ListOfNews } from "@/components/ListOfNews";

export default function Home() {
  return (
    <div className="text-4xl font-bold text-center mt-10">
      Tempo Labs Interview!
      <ListOfNews />
    </div>
  );
}
