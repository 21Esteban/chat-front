import React from "react";

interface ChatBubbleProps {
  name: string;
  lastHour: string;
  message: string;
  isCurrentUser: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  name,
  lastHour,
  message,
  isCurrentUser,
}) => {
  return (
    <>
      {isCurrentUser ? (
        <div className="col-span-8 flex items-start space-x-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white font-bold">
            {name[0]}
          </div>
          <div className="bg-background border border-border shadow-sm rounded-lg p-3">
            <p className="text-sm text-foreground">{message}</p>
            <span className="block mt-1 text-xs text-muted-foreground">
              {lastHour}
            </span>
          </div>
        </div>
      ) : (
        <div className="col-span-8 flex items-start  flex-row-reverse">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white font-bold">
            {name[0]}
          </div>
          <div className="bg-accent border border-border shadow-sm rounded-lg p-3 mr-3">
            <p className="text-sm text-foreground">{message}</p>
            <span className="block mt-1 text-xs text-muted-foreground text-right">
              {lastHour}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
