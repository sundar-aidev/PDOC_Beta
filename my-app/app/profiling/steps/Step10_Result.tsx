"use client";

import { useRouter } from "next/navigation";
import ProfilingLayout from "@/components/layout/profilingLayout";
import { UserProfileAnswers } from "../types";

interface Props {
  profileCode: string;
  description: string;
  onUpload?: () => void;
}

export default function Step10_Result({ profileCode, description, onUpload }: Props) {
  const router = useRouter();

  return (
    <ProfilingLayout
      questionNumber="10/10"
      title="Your Investment Profile"
      subtitle="Based on your answers, here's your recommended investment archetype:"
    >
      {/* Top Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
        <div className="border rounded-lg p-4 inline-block text-xl font-bold tracking-wide mb-4">
          {profileCode}
        </div>
        <div className="border rounded-lg p-4 bg-gray-50 max-w-xl mx-auto text-gray-700 text-sm">
          {description}
        </div>
      </div>

      {/* Lower Card */}
      <div className="bg-white rounded-lg shadow-md p-6 text-center mt-6">
        <h3 className="text-left text-lg font-semibold mb-4">Upload Your Current Portfolio</h3>
        <div className="h-48 border-dashed border-2 border-gray-400 rounded-lg flex items-center justify-center text-gray-500 text-sm mb-6">
          Insert PDF here
        </div>
      </div>

      {/* Finish Button aligned bottom right */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => router.push("/check")}
          className="btn-primary"
        >
          Finish
        </button>
      </div>
    </ProfilingLayout>
  );
}
