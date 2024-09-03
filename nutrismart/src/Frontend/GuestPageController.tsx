import GuestPage from "./GuestPage";
import NSChatBot from "./NSChatBot";

function GuestPageController() {
  return (
    <div className="h-screen flex flex-col overflow-auto mb-2">
      <GuestPage />
      <NSChatBot />
    </div>
  );
}

export default GuestPageController;
