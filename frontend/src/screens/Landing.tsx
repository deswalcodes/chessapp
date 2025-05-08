import { useNavigate } from "react-router-dom"
import {Button} from "../components/Button"

export const Landing = () =>{
    const navigate = useNavigate()


    return <div className="flex justify-center">
        <div className="pt-8 max-w-screen-lg">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex justify-center">
                    <img src={"/chessboard.jpeg"} className="max-w-96"/>
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white">Play Chess online on #1 Site!</h1>
                    <div className="mt-4">
                        <Button onClick={() => navigate("/game")}>Play Online</Button>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    
}