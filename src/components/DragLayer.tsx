import { DragOverlay } from "@dnd-kit/core";

interface Props {
  activeNote: { text: string; category: string } | null;
}

const DragLayer = ({ activeNote }: Props) => {
  return (
    <DragOverlay>
      {activeNote ? (
        <div className="p-2 bg-white shadow-lg rounded w-full max-w-sm text-gray-800">
          <p>{activeNote.text}</p>
        </div>
      ) : null}
    </DragOverlay>
  );
};

export default DragLayer;
