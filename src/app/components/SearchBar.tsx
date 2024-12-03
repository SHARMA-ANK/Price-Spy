
"use client";

import { FormEvent, useState } from "react";
import { scrapeAndStoreProduct } from "../lib/actions";
const isValidAmazonLink=(link:string)=>{
    try{
        const parsedUrl=new URL(link);
        const hostname=parsedUrl.hostname;
        if(hostname.includes('amazon.com')||hostname.includes('amazon.in')||hostname.endsWith('amazon')){
            return true;
        }
        return false;
    }catch(e){
        return false;
    }
}
const SearchBar = () => {
    const [SearchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit=async(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const isValidLink=isValidAmazonLink(SearchPrompt);
        if(!isValidLink){
            alert('Please enter a valid Amazon link');
            return;
        }
        try{
            setIsLoading(true);
            //API call to get product details
           const product= await scrapeAndStoreProduct(SearchPrompt);

        }catch(e){
            console.error(e);
        }finally{
            setIsLoading(false);
        }
    }

  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input value={SearchPrompt} type="text" placeholder="Enter Product Links" className='searchbar-input' onChange={(e)=>{setSearchPrompt(e.target.value)}}/>
        <button className='searchbar-btn' disabled={SearchPrompt===""}>
            {isLoading?'Searching...':'Search'}
        </button>
    </form>
  )
}

export default SearchBar