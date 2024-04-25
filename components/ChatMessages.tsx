import ChatWelcome from "./ChatWelcome";

export default function ChatMessages() {
  return (
    <div className="flex flex-1 flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome type="channel" name="general" />

    </div>
  )
}
