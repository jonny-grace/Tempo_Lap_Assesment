'use client';
import { use, useEffect, useState } from "react"
import axios from "axios";

export const ListOfNews = ()=>{
// initialize state

const [stories,setStories] = useState([])
let isActive=true;
const [ data, setData] =useState([]);
const fetchStories = async() =>{
    const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
    const storyIds= await res.json();
    setData(storyIds); 
}
const fetchtitles=async ()=>{
data.map( async (d)=>{
    const res= await fetch(`https://hacker-news.firebaseio.com/v0/item/${d}.json`)
    const storyData= await res.json()
     if(isActive){setStories((prevStoires)=>[...prevStoires,storyData])}  
})
}
useEffect( ()=>{
    console.log("fetching titles")
    console.log(data)
    fetchtitles()
},[data])
useEffect(()=>{
 fetchStories();

 return (()=>{
    isActive= false;
 })
},[])



return (
    <div>
        <h2 className=" mt-4">List of stories</h2>
        <ul className=" grid justify-center gap-3">{stories.map((st)=>(
            
          <li className=" w-full bg-white text-black  px-4 text-left text-sm mx-5 rounded " key={st.id}>{st.title}</li>

        ))}</ul>
    </div>
)

}