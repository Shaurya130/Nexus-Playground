import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4wNSkiLz48L2c+PC9zdmc+')] opacity-30" />
      
      <div className="relative w-full max-w-md">
        <SignUp 
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: '#3b82f6',
              colorBackground: '#0a0a0a',
              colorInputBackground: '#18181b',
              colorInputText: '#fafafa',
              colorText: '#fafafa',
              colorTextSecondary: '#a1a1aa',
              colorDanger: '#ef4444',
              borderRadius: '0.5rem',
            },
            elements: {
              rootBox: "w-full",
              card: "bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 shadow-2xl",
              headerTitle: "text-white font-semibold",
              headerSubtitle: "text-zinc-400",
              socialButtonsBlockButton: "bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white transition-all",
              socialButtonsBlockButtonText: "text-white font-medium",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-lg shadow-blue-600/20",
              formFieldLabel: "text-zinc-300",
              formFieldInput: "bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600/50",
              footerActionLink: "text-blue-500 hover:text-blue-400 font-medium",
              dividerLine: "bg-zinc-800",
              dividerText: "text-zinc-500",
              formFieldInputShowPasswordButton: "text-zinc-400 hover:text-zinc-300",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-blue-500 hover:text-blue-400",
              formHeaderTitle: "text-white",
              formHeaderSubtitle: "text-zinc-400",
              otpCodeFieldInput: "border-zinc-800 bg-zinc-900 text-white",
              formResendCodeLink: "text-blue-500 hover:text-blue-400",
              footer: "hidden",
            }
          }}
        />
      </div>
    </div>
  )
}