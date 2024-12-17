import {create} from "zustand";
import {CodeEditorState} from "@/types";
import {Monaco} from "@monaco-editor/react";
import {LANGUAGE_CONFIG} from "@/app/editor/_constants";

function getInitialState() {
    // server side
    if (typeof window === "undefined") {
       return {
           language: "javascript",
           fontSize: 16,
           theme: "vs-dark",
       }
    }

    const savedLanguage = localStorage.getItem("editor-language") || "javascript";
    const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
    const savedFontSize = localStorage.getItem("editor-font-size") || "16";

    return {
        language: savedLanguage,
        fontSize: Number(savedFontSize),
        theme: savedTheme,
    }
}

export const useCodeEditorStore = create<CodeEditorState>((set, get)=> {
    const initialState = getInitialState()

    return {
        ...initialState,
        output: "",
        isRunning: false,
        error: null,
        editor: null,
        executionResult: null,

        getCode: () =>get().editor?.getValue() || "",
        setEditor: (editor: Monaco) => {
            const savedCode = localStorage.getItem(`editor-code-${get().language}`);
            if (savedCode) editor.setValue(savedCode);

            set({editor});
        },
        setTheme: (theme: string) => {
            localStorage.setItem("editor-theme", theme);
            set({theme});
        },
        setFontSize: (fontSize: number) => {
            localStorage.setItem("editor-font-size", fontSize.toString());
            set({fontSize});
        },
        setLanguage: (language: string) => {
            const currentCode = get().editor?.getValue();

            if(currentCode) {
                localStorage.setItem(`editor-code-${get().language}`, currentCode);
            }
            localStorage.setItem("editor-language", language);

            set({
                language,
                output: "",
                error: null
            });
        },
        runCode: async () => {
            const {language, getCode} = get();
            const code = getCode();

            if(!code){
                set({error: "Please enter some code"});
                return;
            }

            set({isRunning: true});

            try {
                const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
                const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        language: runtime.language,
                        version: runtime.version,
                        files: [{content: code}]
                    })
                })

                const data = await response.json();

                console.log({data});

                if(data.message) {
                    set({error: data.message, executionResult: {code, output: "", error: data.message}});
                    return;
                }

                // compilation errors
                if(data.compile && data.compile.code !== 0) {
                    const error = data.compile.stderr || data.compile.output;
                    set({error: error, executionResult: {code, output: "", error}});
                    return;
                }

                // runtime errors
                if(data.run && data.run.code !== 0) {
                    const error = data.run.stderr || data.run.output;
                    set({error: error, executionResult: {code, output: "", error}});
                    return;
                }

                // successfully executed code
                const output = data.run.output;
                set({output: output.trim(), error: null, executionResult: {code, output: output.trim(), error: null}});
            } catch (error) {
                console.error(error);
                set({error: "Error Running Code", executionResult: {code, output: "", error:"Error Running code"}});
            } finally {
                set({isRunning: false});
            }
        },
    };
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;