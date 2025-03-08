import { useRouter } from "next/navigation";
import "@xyflow/react/dist/style.css";

export default function Home() {
  const router = useRouter();

  const navigateToFlow = () => {
    router.push("/custom-flow");
  };

  return (
    <div className="h-full w-full">
      <button onClick={navigateToFlow}>New</button>
    </div>
  );
}
