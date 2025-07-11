import { toast } from "sonner";
import { create }from "zustand";
import { Textbook } from "../type/textbookType";
import TextbookData from "@/database/textbook.json";

interface TextbookState {
    textbooks: Textbook[];
    addTextbooks: (newTextbook: Textbook) => void;
    loadInitialTextbook: () => void;
    updateTextbook: (updatedTextbook: Textbook) => void;
    removeTextbook: (targetTextbook: Textbook) => void;
}

export const useTextbook = create<TextbookState>((set) => ({
    textbooks: [],

    loadInitialTextbook: () => {
        set({
            textbooks: TextbookData.Textbook,
        });
    },

    addTextbooks: (newTextbook) => {
        set((state) => ({
            textbooks: [...state.textbooks, newTextbook],
        }));

        toast("처리 완료", {
            description: "새로운 교재가 추가되었습니다.",
        });
    },

    updateTextbook: (updatedTextbook) => {
        set((state) => {
            const filtered = state.textbooks.filter(
                (textbook) => textbook.textbookId !== updatedTextbook.textbookId
            );

            const updatedList = [...filtered, updatedTextbook];

            return{
                textbooks: updatedList,
            }
        });

        toast("처리 완료", {
            description: "교재가 수정되었습니다.",
        })
    },

    removeTextbook: (targetTextbook) => {
        set((state) =>({
            textbooks: state.textbooks.filter(
                (textbook) => textbook.textbookId !== targetTextbook.textbookId
            ),            
        }));

        toast("처리 완료", {
            description:"교재가 삭제되었습니다",
        });

    },
}));

export default useTextbook;
