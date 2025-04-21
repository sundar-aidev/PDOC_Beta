interface ProfilingLayoutProps {
  questionNumber: string;
  title: string;
  subtitle?: string;
  showWelcome?: boolean;
  children: React.ReactNode;
}

export default function ProfilingLayout({
  questionNumber,
  title,
  subtitle,
  showWelcome = false,
  children,
}: ProfilingLayoutProps) {
  return (
    <div className="p-6 bg-white rounded shadow-md space-y-6">
      {/* 👋 Avatar welcome message only if showWelcome is true */}
      {showWelcome && (
        <div className="flex items-center gap-4">
          <img
            src="/placeholder.svg"
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-medium">
              Hi Jane, welcome to the Portfolio DOC family! Glad to have you onboard. We would love to know more about you before we begin.
            </p>
          </div>
        </div>
      )}

      <div>
        <p className="text-gray-600 mb-1">Step {questionNumber}</p>
        <h2 className="text-xl font-semibold">{title}</h2>
        {subtitle && <p className="mt-2 text-m text-gray-500">{subtitle}</p>}
      </div>

      <div>{children}</div>
    </div>
  );
}
