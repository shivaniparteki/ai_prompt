import { connectToDatabase } from "@/utils/database";
import Prompt from "@/models/prompt";

//GET (read)
export const PromptGet = async (req, res) => {
  const { id } = req.query;
  try {
    // await connectToDatabase();

    const prompt = await Prompt.findById(id).populate('creator')
    if (!prompt) {
      return res.status(404).send("Prompt not found");
    }

    return res.status(200).send(prompt);

  } catch (error) {
    res.status(500).send("Failed to fetch all prompts");
  }
}

//PATCH (update)
export const PromptPatch = async (req, res) => {
  const { id } = req.query;
  const { prompt, tag } = await req?.body

  try {
    const existingPrompt = await Prompt.findById(id)

    if (!existingPrompt) {
      return res.status(404).send("Prompt not found");
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save()

    return res.status(200).send(existingPrompt);

  } catch (error) {
    res.status(500).send("Failed to update prompt");
  }
}

//DELETE (delete)
export const PromptDelete = async (req, res) => {
  const { id } = req.query;
  res.status(200).send("Prompt deleted successfully");
  try {
    await Prompt.findByIdAndDelete(id)
  } catch (error) {
    res.status(500).send("Failed to delete prompt");
  }
}