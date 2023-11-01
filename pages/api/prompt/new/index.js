import { connectToDatabase } from "@/utils/database";
import Prompt from "@/models/prompt";

export default async function CreatePromptPost(req, res) {
  const reqParams = JSON.parse(req.body)
  const { userId, prompt, tag } = reqParams;

  console.log("reqParams");
  console.log(reqParams);

  try {
    // await connectToDatabase();

    const newPrompt = {
      creator: userId,
      prompt: prompt,
      tag: tag,
    };

    await Prompt.create(newPrompt);
    console.log("Hello_____________");

    res.status(201).send(newPrompt);
  } catch (error) {
    console.log("error");
    console.log(error);
    res.status(500).send("Failed to create a new prompt");
  }
}
