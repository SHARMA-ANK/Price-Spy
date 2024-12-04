import { connectToDB } from "@/app/lib/actions/mongoose";
import { scrapeAmazonProduct } from "@/app/lib/actions/scraper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/app/lib/actions/utils";
import Product from "@/app/lib/models/product.model";
import { generateEmailBody, sendEmail } from "@/app/lib/nodemailer";
import { get } from "http";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        connectToDB();
        const products=await Product.find();
        if(!products) throw new Error("No products found");

        const updatedProducts=await Promise.all(products.map(async(currentProduct)=>{
            const scrapedProduct=await scrapeAmazonProduct(currentProduct.url);
            if(!scrapedProduct) throw new Error("No Product Found");

            const updatedPriceHistory:any=[
                ...currentProduct.priceHistory,{price:scrapedProduct.currentPrice}
            ];
            const product={
                ...scrapedProduct,priceHistory:updatedPriceHistory,
                lowestPrice:getLowestPrice(updatedPriceHistory),
                highestPrice:getHighestPrice(updatedPriceHistory),
                averagePrice:getAveragePrice(updatedPriceHistory)
            }
        
        const updatedProduct=await Product.findOneAndUpdate({
                url:scrapedProduct.url
            },
            product,
            {upsert:true,new:true}
        );
        
        const emailNotifType=getEmailNotifType(scrapedProduct,currentProduct);
        if(emailNotifType && updatedProduct.users.length>0){
           const productInfo={
                title:updatedProduct.title,
                url:updatedProduct.url
           }
           const emailContent=await generateEmailBody(productInfo,emailNotifType);
           const userEmails=updatedProduct.users.map((user:any)=>user.email);
           await sendEmail(emailContent,userEmails);
        }
        return updatedProduct;
    }))
    return NextResponse.json({
        message:"Ok",data:updatedProducts
    });
    }catch(e){
        console.log(e);
    }
}