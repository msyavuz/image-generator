import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
    imageUrl?: string;
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
        if (!prompt) {
            res.send({ error: "A prompt must be given" });
        } else {
            const response = await openai.createImage({
                prompt: prompt.toString(),
                n: 1,
                size: "512x512",
            });
            const imageUrl = response.data.data[0].url;
            res.send({ imageUrl });
        }
    } else {
        res.send({ error: "Invalid method, only GET requests are accepted." });
    }
}
