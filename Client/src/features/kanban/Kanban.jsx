import React from 'react'

const Kanban = () => {
  return (
        <div className="bg-background p-4 h-full rounded-l-3xl flex items-center justify-center border-l border-t border-b border-border shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <h1 className="text-primary font-bold text-7xl md:text-9xl text-center z-10 glow-text tracking-tighter">
                Kanban
            </h1>
        </div>
    );
}

export default Kanban