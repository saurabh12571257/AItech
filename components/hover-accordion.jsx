import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const HoverAccordion = ({ question, answer }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="border-b"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center py-4 cursor-pointer">
        <h3 className="font-medium">{question}</h3>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-800 ${
            isHovered ? 'transform rotate-180' : ''
          }`}
        />
      </div>
      <div 
        className={`overflow-hidden transition-all duration-600 ${
          isHovered ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
}; 