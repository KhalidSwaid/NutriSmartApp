import GuestPage from "../Frontend/GuestPage";
import NSChatBot from "../Frontend/NSChatBot";

function GuestPageController() {
  return (
    <div className="h-screen flex flex-col overflow-auto mb-2">
      <GuestPage />
      <NSChatBot />
    </div>
  );
}

export default GuestPageController;
