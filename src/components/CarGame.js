import { useEffect, useRef, useState } from "react";

const CarGame = () => {

    const [carPosition, setCarPosition] = useState(50);
    const [obstacles, setObstacles] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const gameContainerRef = useRef(null);

    const handleKeyDown = (e) => {
        if(gameOver) return;

        if(e.key=== "ArrowLeft" && carPosition>4){
            setCarPosition(carPosition-5);
        }

        else if(e.key === "ArrowRight" && carPosition<96){
            setCarPosition(carPosition+5);
        }
    };

    //creating obstacles
    useEffect(() => {
      const interval = setInterval(()=>{
        const newObstacle = {
            left : Math.random() * 95,
            top : 0
        }
        setObstacles((prevData) => {
            return [...prevData, newObstacle]
        })
      },1000)
    
      return () => clearInterval(interval)
      
    }, []);

    //moving obstacles
    useEffect(() => {
        const interval = setInterval(() => {
            setObstacles((prev) =>
                prev.map((item) => ({
                        ...item,
                        top: item.top + 2,
                    
                })).filter((item) => item.top<100)
            
            )
        },100)

        return () => clearInterval(interval)
        

    }, [])
    
    useEffect(() => {
        if(gameOver){
            return
        }

        obstacles.forEach((item) => {
            if(item.top>90 &&
                item.top<100 &&
                carPosition >=item.left &&
                carPosition <= item.left + 5
            ){
                setGameOver(true)
                alert("Game Over")
            }
        })

        
    }, [carPosition, obstacles, gameOver])

    useEffect(() => {
        if(gameContainerRef.current){
            gameContainerRef.current.focus();
        }
    },[])

    return (
        <div className=" bg-gray-700 h-screen w-full relative overflow-hidden"
        tabIndex="0"
        onKeyDown={handleKeyDown}
        ref={gameContainerRef} 
        >
            { gameOver && (
                <div className="absolute top-1/2 left-1/2 text-white text-xl">
        Game Over!
        Please refresh the Page to start again!
    </div>
            )}
            <div className="absolute bottom-0 w-16 h-32 bg-blue-800 rounded text-center content-center text-2xl text-white"
            style={{ left: `${carPosition}%`}}
            >
                Car
            </div>

            {
                obstacles.map((item,index) => (
                    <div 
                    key={index}
                    className=" absolute w-10 h-20 bg-red-500"
                    style={{
                        left: `${item.left}%`,
                        top: `${item.top}%`,
                    }}
                    >     
                    </div>
                ))
            }
        </div>
    )
}

export default CarGame; 