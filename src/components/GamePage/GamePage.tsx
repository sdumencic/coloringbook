import Canvas from "./Canvas/Canvas";
import HUD from "./HUD/HUD";
import { useParams } from "react-router";

const GamePage = () => {
  const { id } = useParams(); // Fetch the picture id

  return (
    <>
      <Canvas />
      <HUD />
    </>
  );
};

export default GamePage;
