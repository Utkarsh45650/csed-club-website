import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type TypeAction = 
  | { type: 'type', text: string }
  | { type: 'delete', count: number }
  | { type: 'pause', ms: number };

const codeSequence: TypeAction[] = [
  { type: 'type', text: '#include <ros/ros.h>\n#include <geometry_msgs/Twist.h>\n\n' },
  { type: 'pause', ms: 300 },
  { type: 'type', text: 'int main(int argc, char **argv) {\n' },
  { type: 'pause', ms: 200 },
  { type: 'type', text: '  ros::init(argc, argv, "robot_core");\n' },
  { type: 'type', text: '  ros::NodeHandle nh;\n\n' },
  { type: 'pause', ms: 400 },
  { type: 'type', text: '  auto pub = nh.advertise<geometry_msgs::Twist>("/cmd_vel", 10);\n\n' },
  { type: 'pause', ms: 300 },
  { type: 'type', text: '  geometry_msgs::Twist msg;\n' },
  { type: 'type', text: '  msg.linear.x = 0.5; // Move fowrad' },
  { type: 'pause', ms: 500 },
  { type: 'delete', count: 5 },
  { type: 'pause', ms: 200 },
  { type: 'type', text: 'rward\n' },
  { type: 'pause', ms: 200 },
  { type: 'type', text: '  msg.angular.z = 0.2;\n\n' },
  { type: 'type', text: '  pub.publish(msg);\n' },
  { type: 'pause', ms: 200 },
  { type: 'type', text: '  return 0;\n}' },
  { type: 'pause', ms: 4000 },
];

const highlightCpp = (code: string) => {
  let html = code
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  html = html.replace(/(#include)/g, '§PURPLE§$1§END§');
  
  const keywords = ['int', 'char', 'auto', 'return', 'void'];
  keywords.forEach(kw => {
    html = html.replace(new RegExp(`\\b${kw}\\b`, 'g'), `§PURPLE§${kw}§END§`);
  });
  
  html = html.replace(/(".*?")/g, '§GREEN§$1§END§');
  
  // comments
  html = html.replace(/(\/\/.*)$/gm, '§GRAY§$1§END§');
  
  // ros:: classes
  html = html.replace(/\b([a-zA-Z_]+::[a-zA-Z_]+)\b/g, '§BLUE§$1§END§');

  html = html
    .replace(/§PURPLE§/g, '<span class="text-purple-400">')
    .replace(/§GREEN§/g, '<span class="text-green-300">')
    .replace(/§GRAY§/g, '<span class="text-gray-500">')
    .replace(/§BLUE§/g, '<span class="text-blue-300">')
    .replace(/§END§/g, '</span>');

  return html;
};

export default function TypingCodePanel() {
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const runSequence = async () => {
      while (isMounted) {
        setText('');
        await new Promise(r => setTimeout(r, 1000));
        
        for (const action of codeSequence) {
          if (!isMounted) return;
          if (action.type === 'pause') {
            await new Promise(r => setTimeout(r, action.ms));
          } else if (action.type === 'type') {
            for (let i = 0; i < action.text.length; i++) {
              if (!isMounted) return;
              setText(prev => prev + action.text[i]);
              if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
              }
              await new Promise(r => setTimeout(r, Math.random() * 30 + 15));
            }
          } else if (action.type === 'delete') {
            for (let i = 0; i < action.count; i++) {
              if (!isMounted) return;
              setText(prev => prev.slice(0, -1));
              if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
              }
              await new Promise(r => setTimeout(r, 30));
            }
          }
        }
      }
    };
    
    runSequence();
    
    return () => { isMounted = false; };
  }, []);

  const lines = text.split('\n');

  return (
    <div className="w-full h-full flex flex-col">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D]/90 border-b border-black/20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
          <span className="text-blue-400">⚙️</span> robot_controller.cpp
        </div>
        <div className="w-12" />
      </div>

      {/* Editor Body */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-[10px] sm:text-xs leading-relaxed text-gray-300 overflow-auto custom-scrollbar"
      >
        <div className="flex w-max min-w-full">
          <div className="text-gray-600 select-none pr-4 text-right shrink-0">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div className="relative flex-1 whitespace-pre">
            <span dangerouslySetInnerHTML={{ __html: highlightCpp(text) }} />
            {/* Blinking Cursor */}
            <motion.span 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1.5 h-3.5 bg-gray-400 align-middle ml-[1px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
