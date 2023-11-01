import { connectToDatabase } from "@/utils/database";
import Prompt from "@/models/prompt";

export default async function PromptGet(req, res) {
  try {
    // await connectToDatabase();

    const prompts = await Prompt.find({}).populate('creator')
    console.log("prompts");
    console.log(prompts);

    return res.status(200).send(prompts);

  } catch (error) {
    res.status(500).send("Failed to fetch all prompts");

  }
}