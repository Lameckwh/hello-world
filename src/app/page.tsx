

import Calculator from '../components/Calculator';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
      <div className="z-10 flex flex-col items-center gap-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200 tracking-tight drop-shadow-lg">
          Premium Calculator
        </h1>
        <Calculator />
        <p className="text-indigo-200/60 text-sm font-medium tracking-wide">
          Designed with Next.js & Tailwind CSS by Lameck Mbewe
        </p>
      </div>
    </main>
  );
}
