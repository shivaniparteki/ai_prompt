import { connectToDatabase } from "@/utils/database";
import Prompt from "@/models/prompt";

export default async function PromptGet(req, res) {
  const { id } = req.query;
  try {
    // await connectToDatabase();

    const prompts = await Prompt.find({
      creator: id
    }).populate('creator')
    // console.log("prompts");
    // console.log(prompts);

    return res.status(200).send(prompts);

  } catch (error) {
    console.log("error");
    console.log(error);
    res.status(500).send("Failed to fetch all prompts");
  }
}