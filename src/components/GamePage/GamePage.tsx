import Canvas from "./Canvas/Canvas";
import { useParams } from "react-router";

const GamePage = () => {
  const { id } = useParams(); // Fetch the picture id

  return (
    <>
      <Canvas />
      <p>Game Page {id}</p>
    </>
  );
};

export default GamePage;
