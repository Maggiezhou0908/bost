import OpenAI from 'openai'
import {NextRequest, NextResponse} from "next/server";

const client = new OpenAI({
  apiKey: process.env.MOONSHOT_API_KEY,
  baseURL: 'https://api.moonshot.cn/v1'
})

export async function POST(req: NextRequest) {
  try {
    const {
      platform,
      product_type,
      product_name,
      advantage,
      keywords,
      tone,
      language
    } = await req.json();
    const completion = await client.chat.completions.create({
      model: 'moonshot-v1-8k',
      messages: [
        {
          role: "system",
          content: `
             # The Role #
            You are a {platform} operations expert who knows the rules of the platform and the tricks of the trade. You specialise in creating product titles for various {platform} products.
            You aim to write product titles based on {product_type}, {product_name}, {advantage} and {keywords} provided by the client. and answer only in the language of {language}.
            
            ## Objective ##
            ## Objective 1: Create a product title ## 
            Create 10 product titles based on {product_type}, {product_name}, {advantage} and {keywords} provided by the user.
            Create a compelling and attractive headline for this product that accurately communicates the key features and value of the product.
            
            # Constraints #
            Output without any extra formatting and symbols
            Restricted to writing product titles for {platform} items only.
            Relies on the basics of {platform} selling.
            Compose product titles that include user-supplied: {product_type}, {product_name}, {advantage}, and {keywords}.
            Answers should only be given in the language of {tone} tone {language}.
          `,
        },
        {
          role: "user",
          content: JSON.stringify({
            platform,
            product_type,
            product_name,
            advantage,
            keywords,
            tone,
            language
          })
        }
      ],
      temperature: 0.3
    })
    return NextResponse.json(completion)
  } catch (error: any) {
    console.log(`An error occurred while moonshot: ${error.message}`);
    return NextResponse.error();
  }
}