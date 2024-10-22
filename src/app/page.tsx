'use client'
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { AuthViewType, useAuth } from "@/lib/auth";
import { AuthDialog } from "@/components/auth-dialog";
import { NavBar } from "@/components/navbar";
import { Chat } from "@/components/chat";
import { ChatInput } from "@/components/chat-input";
import { useLocalStorage } from "usehooks-ts";
import { ChatPicker } from "@/components/chat-picker";
import ModelsList from "@/lib/models.json";
import templates from "@/lib/templates";
import { ChatSettings } from "@/components/chat-settings";
import { LLMModelConfig } from "@/lib/models";

export default function Home() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthViewType>("sign_in");
  const { session } = useAuth(setIsAuthDialogOpen, setAuthView);
  const [chatInput, setChatInput] = useLocalStorage("chat", "");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<"auto">("auto");
  const [languageModel, setLanguageModel] = useLocalStorage("languageModel", {
    model: "gpt-4o-mini",
  });

  const [messages, setMessages] = useState<Message>([])

  function logout() {
    supabase ? supabase.auth.signOut() : console.warn("Supabase is not initialized");
  }

  function handleLanguageModelChange(e: LLMModelConfig) {
    setLanguageModel({ ...languageModel, ...e });
  }

  return (
    <main className="flex min-h-screen max-h-screen">
      {supabase && (
        <AuthDialog
          open={isAuthDialogOpen}
          setOpen={setIsAuthDialogOpen}
          supabase={supabase}
          view={authView} />
      )}
      <div className="grid w-full md:grid-cols-2">
        <div className="">
          <NavBar
            session={session}
            showLogin={() => setIsAuthDialogOpen(true)}
            signOut={logout}
          />
          <Chat />
          <ChatInput
            input={chatInput}
            isLoading={false}
            handleInputChange={() => { }}
            handleSubmit={() => { }}
            handleFileChange={() => { }}
            files={files}
            error={undefined}
            retry={() => { }}
            isMultiModal={false}
            stop={() => { }}
          >
            <ChatPicker models={ModelsList.models} templates={templates as any} />
            <ChatSettings
              languageModel={languageModel}
              onLanguageModelChange={handleLanguageModelChange}
              apiKeyConfigurable={true}
              baseURLConfigurable={true}
            />
          </ChatInput>
        </div>
      </div>
    </main>
  );
}
