import { Skeleton } from "../ui/skeleton";

const ChatSkeleton = () => {
  return (
    <div>
      <ul className="flex flex-col h-screen p-4 w-full overflow-auto">
        {Array.from({ length: 5 }, (_, index) => (
          <li key={index} className="flex flex-row items-center gap-4 mb-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col flex-1">
              <Skeleton className="h-4 w-3/4 rounded-md mb-2" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSkeleton;
