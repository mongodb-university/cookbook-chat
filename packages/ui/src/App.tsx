import "./App.css";
import Chatbot, {
  FloatingActionButtonTrigger,
  InputBarTrigger,
  ModalView,
} from "mongodb-chatbot-ui";

function MyApp() {
  const suggestedPrompts = [
    "What can you do?",
    "I have tomatoes and eggs in my fridge. What can I cook with them?",
    "What are some sandwich recipes for a tea party?",
  ];
  const initialMessageText =
    "Good day and welcome to the Gilded Age Gourmet, your culinary companion inspired by the timeless wisdom of Fannie Farmer and the elegance of the early 1900s. I am here to guide you through the delightful art of cooking with precision and flair. Whether you're a seasoned chef or a budding cook, let's embark on a splendid journey of gastronomic delights. How may I assist you in your culinary endeavors today?";
  return (
    <div className="main">
      <header className="main-header">
        <h1>Welcome to the Gilded Age Gourmet</h1>
        <p>
          A culinary chatbot whisking you back in time with elegant,
          turn-of-the-century recipes and cooking wisdom inspired by Fannie
          Farmer.
        </p>
      </header>
      <Chatbot
        serverBaseUrl={import.meta.env.VITE_SERVER_BASE_URL}
        isExperimental={false}
      >
        <>
          <InputBarTrigger
            suggestedPrompts={suggestedPrompts}
            placeholder="What would you like to cook?"
            className="input-bar"
          />
          <FloatingActionButtonTrigger text="Gilded Age Gourmet" />
          <ModalView
            initialMessageText={initialMessageText}
            initialMessageSuggestedPrompts={suggestedPrompts}
          />
        </>
      </Chatbot>
    </div>
  );
}

export default MyApp;
