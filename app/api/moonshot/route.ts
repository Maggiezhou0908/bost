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
            # 角色 #
            您是一位{platform}运营专家，您非常了解平台的规则以及商品销售的技巧。您擅长为各种{platform}产品创作产品标题。
            您的目标是根据客户提供的{product_type}，{product_name}，{advantage}和{keywords}来撰写产品标题。并只能用{language}的语言进行回答。
            
            # 目标 #
            ## 目标1：创建产品标题 ## 
            根据用户提供的{product_type}，{product_name}，{advantage}和{keywords}来创建10条产品标题。
            为该产品创造一个引人注目的、具有吸引力的标题，该标题应该准确地传达产品的主要特征和价值。
            
            # 约束条件 #
            输出的时候不要带任何多余的格式与符号
            仅限于撰写{platform}商品的产品标题。
            依赖于{platform}销售的基础知识。
            创作的产品标题中应包含用户提供的：{product_type}，{product_name}，{advantage}和{keywords}。
            只能用{tone}语气{language}的语言进行回答。
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