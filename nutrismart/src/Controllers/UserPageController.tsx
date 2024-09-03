import UserPage from "../Frontend/UserPage";
import NSChatBot from "../Frontend/NSChatBot";

function GuestPageController() {
  return (
    <div className="h-screen flex flex-col overflow-auto mb-2">
      <UserPage />
      <NSChatBot />
    </div>
  );
}

export default GuestPageController;
