import LeftComponent from "../../components/left"
import RightComponent from "../../components/right"
const image = "https://images.unsplash.com/photo-1494798132658-27ee988ba44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"

export default function Home() {
  return (
      <main className="bg-gray-700/70 w-full h-screen flex items-center justify-center text-white"
	    style={{"background": `url(${image})`, "background-size": "cover"}}>
      <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray-800/20"></div>
      <div className="z-[100] shadow-lg lg:w-[850px] lg:h-[500px] items-center justify-center border-none rounded flex lg:flex-row flex-col gap-0 bg-transparent shadow-lg">
        <LeftComponent  />
        <RightComponent />
      </div>
    </main>
  );
}
