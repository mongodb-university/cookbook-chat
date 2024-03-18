import { QueryPreprocessorFunc } from "mongodb-chatbot-server";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { LLM } from "@langchain/core/language_models/llms";
import { ChatOpenAI } from "@langchain/openai";

export const makeLangchainOpenAiLlm = (
  modelName: string,
  openAIApiKey: string
) =>
  new ChatOpenAI({
    modelName,
    openAIApiKey,
    temperature: 0, // generally best practice to have temperature at 0 for RAG
  });

/**
  Generate a step-back search query for a given user query
  in the context of the conversation.

  Built with Langchain based on the [Step Back Prompting guide](https://js.langchain.com/docs/use_cases/query_analysis/techniques/step_back).
 */
export function makeStepBackPromptingPreprocessor(
  llm: LLM
): QueryPreprocessorFunc {
  const system = `You are an expert at taking a specific question and extracting a more generic question that gets at \
the underlying principles needed to answer the specific question.

You will be asked about recipes, cooking, and nutritional info from the Fannie Farmer Cookbook. \

Given a user message and previous messages in the conversation, write a more generic question that needs to be answered in order to answer the specific question. \
But make sure to keep any key details such as ingredients, cooking methods, or nutritional information from the original user query. \
If you don't recognize a word or acronym to not try to rewrite it.

Write concise questions.`;
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", system],
    ["human", "{question}"],
  ]);

  const stepBack = prompt.pipe(llm).pipe(new StringOutputParser());
  return async ({ query, messages }) => {
    const context = messages
      .slice(-3) // get last 3 messages for context
      .map((m) => `${m.role.toUpperCase()}:\n${m.content}`)
      .join("\n");
    const question = `Previous Messages:
${context}
Current user message:
${query}`;
    const result = await stepBack.invoke({ question });
    return {
      query: result,
    };
  };
}
