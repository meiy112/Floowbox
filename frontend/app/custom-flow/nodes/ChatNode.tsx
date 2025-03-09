import { RefObject, useEffect, useRef, useState } from "react";
import "./ChatNode.css";
import { Pipeline, PipelineNode } from "@/app/class/Pipeline";
import BackendBox from "@/app/components/boxes/BackendBox";
import { useNodeConnectionContext } from "@/app/context/NodeConnectionProvider";
import { CircleUserRound, Send } from "lucide-react";

export interface Message {
  content: string;
  role: string;
}

const ChatNode = ({
  data,
  isConnectable,
  id,
}: {
  data: { isFrontend: boolean };
  isConnectable: boolean;
  id: string;
}) => {
  const { isFrontend } = data;
  const { currentPipeline, registerNode } = useNodeConnectionContext();
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesRef = useRef(messages);
  const divRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };

  async function addMessage(newMessage: string, role: string) {
    const messageToAdd = {
      content: newMessage,
      role: role,
    };
    const newMessages = [...messages, messageToAdd];

    setMessages(newMessages);

    scrollToTop();
  }

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const nodeDefinition: PipelineNode = {
    id: id,
    type: "chat",
    process: (input?: string) => {
      if (input) {
        addMessage(input, "developer");
      }
      console.log(input);

      console.log(
        "Chat Input processing. Returning value:",
        messagesRef.current
      );
      return messagesRef.current;
    },
  };

  useEffect(() => {
    registerNode(nodeDefinition);
  }, []);

  return (
    <div
      className="text-black relative flex items-center justify-center text-node w-[40em]"
      style={{ height: "550px", zIndex: 5 }}
    >
      <div className={isFrontend ? "h-full w-full" : "invisible h-full w-full"}>
        <FrontendChatBox
          messages={messages}
          divRef={divRef}
          addMessage={addMessage}
          id={id}
          currentPipeline={currentPipeline}
        />
      </div>
      <BackendChatBox
        isConnectable={isConnectable}
        hidden={isFrontend}
        id={id}
      />
    </div>
  );
};

const FrontendChatBox = ({
  messages,
  divRef,
  addMessage,
  currentPipeline,
  id,
}: {
  messages: Message[];
  divRef: RefObject<HTMLDivElement | null>;
  addMessage: (newMessage: string, role: string) => void;
  currentPipeline: Pipeline;
  id: string;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  // Auto-focus the textarea and scroll the messages container to the bottom
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages, divRef]);

  return (
    <div className="bg-white chat-box__frontend-container h-full w-full chat-box box-border">
      <div className="pt-[0.9em] flex flex-col gap-y-[0.9em] h-full w-full">
        <div className="px-[1.75em] pt-[0.45em]">
          <div className="text-[1rem] font-medium">Chat Box</div>
          <div className="text-[#CECCD7] font-normal">
            The text field is the user input, while the backend input is the
            chat recipient.
          </div>
        </div>
        <div className="h-[1px] w-full bg-[var(--border)]" />
        {/* Message container: maps over messages and displays them */}
        <div
          className="flex-1 overflow-auto flex flex-col px-[2em] relative box-border"
          ref={divRef}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 p-3 rounded-[10px] flex gap-x-[0.8em]
                  ${
                    msg.role === "user"
                      ? "p-3 bg-[#EEF1F7] self-end"
                      : "self-start"
                  }`}
            >
              {/* {msg.role === "user" && (
                <CircleUserRound
                  strokeWidth={1.5}
                  color={"rgba(0, 0, 0, 0.6)"}
                />
              )} */}
              {msg.content}
            </div>
          ))}
        </div>
        <div className="w-full mb-[0.8em] left-0 px-[0.8em] relative">
          <div className="chat-box__frontend rounded-[30em] overflow-hidden flex justify-between items-center">
            <textarea
              ref={textareaRef}
              placeholder="Start typing here..."
              rows={1}
              value={newMessage}
              onChange={handleChange}
              className="m-[1em] flex-1 h-[1.6em] resize-none focus:outline-none placeholder-[#BAB7C3] overflow-auto"
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (newMessage.trim()) {
                    addMessage(newMessage, "user");
                    await currentPipeline.execute(null, [id]);
                    setNewMessage("");
                  }
                }
              }}
            />
            <button
              onClick={async () => {
                if (newMessage.trim()) {
                  addMessage(newMessage, "user");
                  await currentPipeline.execute(null, [id]);
                  setNewMessage("");
                }
              }}
              className="absolute chat-node__button flex items-center justify-center right-[1.5em] cursor-pointer"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BackendChatBox = ({
  isConnectable,
  hidden = false,
  id,
}: {
  isConnectable: boolean;
  hidden?: boolean;
  id: string;
}) => {
  return (
    <div
      className="chat-box__backend-container absolute inset-0 h-full flex items-center justify-center w-full chat-box"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <BackendBox type="chat" isConnectable={isConnectable} id={id} />
    </div>
  );
};

export default ChatNode;
