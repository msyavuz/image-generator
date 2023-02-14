import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, CreateImageRequestSizeEnum, OpenAIApi } from "openai";

type Data = {
    imageUrls?: string[];
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const key = process.env.API_KEY;
    const config = new Configuration({
        apiKey: key,
    });
    const openai = new OpenAIApi(config);

    if (req.method === "GET") {
        const prompt = req.query.prompt;
        let n = req.query.n;
        let size = req.query.size!.toString() as CreateImageRequestSizeEnum;
        if (!prompt || !n) {
            res.send({ error: "A prompt and number must be given" });
        } else {
            const response = await openai.createImage({
                prompt: prompt.toString(),
                n: parseInt(n.toString()),
                size: size,
            });
            const imageUrls: string[] = [];
            for (let data of response.data.data) {
                imageUrls.push(data.url!);
            }
            res.send({ imageUrls });
        }
    } else {
        res.send({ error: "Invalid method, only GET requests are accepted." });
    }
}
