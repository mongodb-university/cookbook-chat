# Gilded Age Gourmet

_Cooking chatbot inspired by the Boston Cooking School Cookbook_

This project contains the source code for the Gilded Age Gourmet, a full-stack retrieval augmented generation (RAG) chatbot that you can use to search for recipes and learn about the fundamentals of cooking.

The chatbot uses the [Boston Cooking School Cookbook](https://www.gutenberg.org/cache/epub/65061/pg65061-images.html) by Fannie Farmer as it's source of recipes and cooking knowledge. The cookbook, first published in 1896, was the best-selling cookbook of the turn of the 20th century. Conveniently, for our chatbot's purposes, the cookbook is also in the public domain.

The chatbot responds in the style of the cookbook, using the same language and tone as the original text. The chatbot is able to answer questions about cooking and recipes, and can also generate new recipes based on user input.

## Get Started

The chatbot is build using the MongoDB Chatbot Framework, following the structure of the [Quick Start](https://mongodb.github.io/chatbot/quick-start) guide.

Follow the instructions in the Quick Start to set up the chatbot.

The only difference between this chatbot and the Quick Start is in:

1. The data ingested (in this case the cookbook)
2. The system prompt used to call the large language model
3. The UI text

Happy cooking!
