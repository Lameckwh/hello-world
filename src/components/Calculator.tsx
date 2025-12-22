"use client";

import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('0');
  const [previousInput, setPreviousInput] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleNumberClick = (num: string) => {
    if (input === '0') {
      setInput(num);
    } else {
      setInput(input + num);
    }
  };

  const handleOperationClick = (op: string) => {
    setPreviousInput(input);
    setOperation(op);
    setInput('0');
  };

  const handleClear = () => {
    setInput('0');
    setPreviousInput(null);
    setOperation(null);
  };

  const handleEqual = () => {
    if (previousInput && operation) {
      const current = parseFloat(input);
      const previous = parseFloat(previousInput);
      let result = 0;

      switch (operation) {
        case '+':
          result = previous + current;
          break;
        case '-':
          result = previous - current;
          break;
        case '*':
          result = previous * current;
          break;
        case '/':
          result = previous / current;
          break;
      }

      setInput(result.toString());
      setPreviousInput(null);
      setOperation(null);
    }
  };

  const handleDecimal = () => {
    if (!input.includes('.')) {
      setInput(input + '.');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-3xl shadow-2xl w-full max-w-xs">
      <div className="mb-4 text-right">
        <div className="text-gray-400 text-sm h-6">{previousInput} {operation}</div>
        <div className="text-4xl font-bold text-white tracking-wider overflow-hidden text-ellipsis">{input}</div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <button onClick={handleClear} className="col-span-2 bg-red-500/80 hover:bg-red-500 text-white p-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-red-500/40 active:scale-95">AC</button>
        <button onClick={() => handleOperationClick('/')} className="bg-indigo-500/80 hover:bg-indigo-500 text-white p-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-indigo-500/40 active:scale-95">÷</button>
        <button onClick={() => handleOperationClick('*')} className="bg-indigo-500/80 hover:bg-indigo-500 text-white p-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-indigo-500/40 active:scale-95">×</button>

        <button onClick={() => handleNumberClick('7')} className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl font-semibold transition-all active:scale-95">7</button>
        <button onClick={() => handleNumberClick('8')} className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl font-semibold transition-all active:scale-95">8</button>
        <button onClick={() => handleNumberClick('9')} className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl font-semibold transition-all active:scale-95">9</button>
        <button onClick={() => handleOperationClick('-')} className="bg-indigo-500/80 hover:bg-indigo-500 text-white p-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-indigo-500/40 active:scale-95">-</button>

        <button onClick={() => handleNumberClick('4')} className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl font-semibold transition-all active:scale-95">4</button>
        <button onClick={() => handleNumberClick('5')} className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl font-semibold transition-all active:scale-95">5</button>
        <button onClick={() => handleNumberClick('6')} className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl font-semibold transition-all active:scale-95">6</button>
        <button onClick={() => handleOperationClick('+')} className="bg-indigo-500/80 hover:bg-indigo-500 text-white p-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-indigo-500/40 active:scale-95">+</button>

        <button onClick={() => handleNumberClick('1')} className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl font-semibold transition-all active:scale-95">1</button>
        <button onClick={() => handleNumberClick('2')} className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl font-semibold transition-all active:scale-95">2</button>
        <button onClick={() => handleNumberClick('3')} className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl font-semibold transition-all active:scale-95">3</button>
        <button onClick={handleEqual} className="row-span-2 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white p-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-indigo-500/40 active:scale-95 flex items-center justify-center">=</button>

        <button onClick={() => handleNumberClick('0')} className="col-span-2 bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl font-semibold transition-all active:scale-95">0</button>
        <button onClick={handleDecimal} className="bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl font-semibold transition-all active:scale-95">.</button>
      </div>
    </div>
  );
};

export default Calculator;
