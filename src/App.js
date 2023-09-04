import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloud,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from 'react-icons/io';
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
  BsSnow,
} from 'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';
import './index.css';


const APIkey = '5fd06d6d230c3ac6b15ad3c1c60970ca';

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Bhubaneswar');
  const[inputValue, setInputValue]=useState('');
  const [animate,setAnimate]=useState(false);
  const [loading,setLoading]=useState(false);
  const [errorMsg,setErrorMsg]=useState('');

  const handleInput= (e)=>{
    setInputValue(e.target.value);
  }

  const handleSubmit= (e)=>{
    if(inputValue!=''){
      setLocation(inputValue);
    }

    const input=document.querySelector('input');
    if(input.value==''){
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    input.value='';

    e.preventDefault();
  }

  useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((res) => {
        setTimeout(()=>{

        setData(res.data);
        setLoading(false);
        },1500)
      }).catch(err =>{
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(()=>{
    const timer=setTimeout(()=>{
        setErrorMsg('');
    },2000);
    return ()=>clearTimeout(timer);
  },[errorMsg]);

if(!data){
  return(
  <div className='w-full h-screen bg-gray-900 flex flex-col justify-center items-center'>
    <div>
      <ImSpinner8 className='text-5xl animate-spin text-white'/>
    </div>
  </div>
  )
}

let icon;
console.log(data.weather[0].main);

switch('Thunderstorm'){
  case 'Clouds':
    icon=<IoMdCloud />;
    break;
    case 'Haze':
    icon=<BsCloudHaze2Fill />;
    break;
    case 'Rain':
    icon=<IoMdRainy className='text-[#31cafb]'/>;
    break;
    case 'Clear':
    icon=<IoMdSunny className='text-[#ffde33]'/>;
    break;
    case 'Drizzle':
    icon=<BsCloudDrizzleFill className='text-[#31cafb]'/>;
    break;
    case 'Snow':
    icon=<BsSnow className='text-[#31cafb]'/>;
    break;
    case 'Thunderstorm':
    icon=<IoMdThunderstorm className='text-gray-500'/>;
    break;
}

const date=new Date();

  return (
  <div className='w-full h-screen bg-gray-900 flex flex-col items-center justify-center px-4 lg:px-0'>
     <h1 className='text-4xl font-semibold text-white absolute top-5 left-4 hidden sm:block'>WizCast.</h1>
   {errorMsg && <div className='w-full max-w-[90vw] lg:max-w-[450px] flex justify-center items-center text-white capitalize'>{errorMsg.response.data.message}!</div>}
   <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8 cards-outer-glow`}>
      <div className='h-full relative flex items-center justify-between p-2'>
        <input onChange={(e)=> handleInput(e)} className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 hf-full' type='text' placeholder='Search by city or country' />
        <button onClick={(e)=> handleSubmit(e)} className='bg-[#1ab8ed] hover:bg-[#487cff] hover:scale-110 w-20 h-12 rounded-full flex justify-center items-center transition'>
          <IoMdSearch className='text-2xl text-white ' /></button>
      </div>
    </form>
    {/*cards*/}
    <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6 cards-outer-glow'>
      {loading ? (<div className='w-full h-full flex justify-center items-center'><ImSpinner8 className='text-white text-5xl animate-spin' /></div>):
      (<div>
        {/*card top*/}
        <div className='flex items-center gap-x-5'>
          {/*icon*/}
          <div className='text-[87px]'>{icon}</div>
          <div>
          {/*country name*/}
          <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}
            </div>
            {/*date*/}
            <div>{date.getUTCDate()}/{date.getUTCMonth()+1}/{date.getUTCFullYear()}</div>
          </div>
        </div>
        {/*card body*/}
        <div className='my-20'>
          <div className='flex justify-center items-center'>
            {/*temp*/}
            <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
            {/*celsius*/}
            <div className='text-4xl'><TbTemperatureCelsius /></div>
          </div>
          {/*weather description*/}
          <div className='capitalize text-center'>{data.weather[0].description}</div>
        </div>
        {/*card bottom*/}
        <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-2'>
              {/*icon*/}
              <div className='text-[20px]'>
                <BsEye />
              </div>
              <div>
                Visibility <span className='ml-2'>{data.visibility / 1000} km</span>
              </div>
            </div>
            <div className='flex items-center gap-x-2'>
              {/*icon*/}
              <div className='text-[20px]'>
                <BsThermometer />
              </div>
              <div className='flex'>
                Feels like<div className='flex ml-2'>{parseInt(data.main.feels_like)}
                <TbTemperatureCelsius />
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='flex items-center gap-x-2'>
              {/*icon*/}
              <div className='text-[20px]'>
                <BsWater />
              </div>
              <div>
                Humidity<span className='ml-2'>{data.main.humidity} %</span>
              </div>
            </div>
            <div className='flex items-center gap-x-2'>
              {/*icon*/}
              <div className='text-[20px]'>
                <BsWind />
              </div>
              <div>Wind<span className='ml-2'>{data.wind.speed} m/s</span></div>
            </div>
          </div>
        </div>
      </div>)
      }
    </div>
  </div>
  )
}

export default App;
