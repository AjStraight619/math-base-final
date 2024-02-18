import { Skeleton } from "../ui/skeleton";

const ChatSkeleton = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col max-w-2xl">
      <ul className="list-none flex flex-col space-y-4">
        {Array.from({ length: 5 }, (_, index) => (
          <li key={index} className="flex flex-row gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col flex-1">
              <Skeleton className="h-6 w-3/4 rounded-md mb-2" />
              <Skeleton className="h-6 w-1/2 rounded-md" />
            </div>
          </li>
        ))}
      </ul>
      {/* Placeholder for bottom spacing */}
      <div className="h-[60px]"></div>
    </div>
  );
};

export default ChatSkeleton;
