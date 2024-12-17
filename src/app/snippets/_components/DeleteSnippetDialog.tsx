import { useMutation } from "convex/react";
import React, {Dispatch, SetStateAction} from "react";
import { api } from "../../../../convex/_generated/api";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import {Id} from "../../../../convex/_generated/dataModel";

function DeleteSnippetDialog({ onClose, id, setIsDeleting }: { onClose: () => void, id: Id<"snippets"> | undefined, setIsDeleting: Dispatch<SetStateAction<boolean>> }) {
    const deleteSnippet = useMutation(api.snippets.deleteSnippet);

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDeleting(true);

        try {
            await deleteSnippet({ snippetId: id! });
            toast.success("Successfully deleted snippet");
        } catch (error) {
            console.log("Error deleting snippet:", error);
            toast.error("Error deleting snippet");
        } finally {
            setIsDeleting(false);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1e1e2e] rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Delete Snippet {id}</h2>
                    <button
                        onClick={()=>{
                            onClose()
                            setIsDeleting(false);
                        }}
                        className="text-gray-400 hover:text-gray-300"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleDelete}>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={()=>{
                                onClose()
                                setIsDeleting(false);
                            }}
                            className="px-4 py-2 text-gray-400 hover:text-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            {"Delete"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default DeleteSnippetDialog;